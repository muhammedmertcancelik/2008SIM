// ============================================
// GELİŞMİŞ OLAY (EVENT) MOTORU
// ============================================

export class EventEngine {
  /**
   * Belirtilen koşulların (conditions) karakter state'i ile eşleşip eşleşmediğini kontrol eder.
   * @param {Object} conditions - Olayın gerektirdiği koşullar
   * @param {Object} state - Mevcut oyun state'i
   * @returns {boolean}
   */
  static evaluateConditions(conditions, state) {
    if (!conditions) return true;

    // Yaş kontrolü
    if (conditions.minAge && state.profile.age < conditions.minAge) return false;
    if (conditions.maxAge && state.profile.age > conditions.maxAge) return false;

    // İş/Meslek kontrolü
    if (conditions.job && state.job !== conditions.job) return false;
    if (conditions.jobLevel && (state.hiddenStats.levels.job || 1) < conditions.jobLevel) return false;

    // Finansal kontroller
    if (conditions.minMoney && state.money < conditions.minMoney) return false;
    if (conditions.maxMoney && state.money > conditions.maxMoney) return false;
    if (conditions.hasDebt && (state.bankDebt || 0) <= 0) return false;

    // Gizli Statlar ve Hayati Değerler
    if (conditions.minHealth && state.health < conditions.minHealth) return false;
    if (conditions.maxHealth && state.health > conditions.maxHealth) return false;
    if (conditions.minHappiness && state.happiness < conditions.minHappiness) return false;

    // İlişki Durumu (Örn: Sadece bekarlara gelsin)
    if (conditions.maritalStatus && state.profile.maritalStatus !== conditions.maritalStatus) return false;

    // === Yaşayan Roman Sİstemi Kontrolleri ===
    if (conditions.chapter !== undefined && state.currentChapter !== conditions.chapter) return false;
    if (conditions.minChapter !== undefined && state.currentChapter < conditions.minChapter) return false;
    if (conditions.maxChapter !== undefined && state.currentChapter > conditions.maxChapter) return false;
    
    if (conditions.npc) {
      if (!state.metNpcs?.includes(conditions.npc.id)) return false;
      const rel = state.npcRelationships?.[conditions.npc.id] || 0;
      if (conditions.npc.minRel !== undefined && rel < conditions.npc.minRel) return false;
      if (conditions.npc.maxRel !== undefined && rel > conditions.npc.maxRel) return false;
    }

    return true;
  }

  /**
   * Rastgele bir olayı koşullara ve ağırlıklara (weights) göre seçer.
   * @param {Array} events - Tüm olaylar havuzu
   * @param {Object} state - Mevcut oyun state'i
   * @returns {Object} Seçilen olay
   */
  static selectRandomEvent(events, state) {
    // 1. Olayları filtrele
    const validEvents = events.filter(event => this.evaluateConditions(event.conditions, state));

    if (validEvents.length === 0) return null;

    // 2. Kader ve Şans faktörünü ağırlıklara ekle
    const luck = state.hiddenStats?.luck || 50;
    const fateId = state.profile?.fateId;

    let totalWeight = 0;
    const weightedEvents = validEvents.map(event => {
      let weight = event.baseWeight || 10; // Varsayılan ağırlık

      // Şanslı olaylar luck ile artar
      if (event.type === 'lucky') {
        weight += (luck - 50) * 0.5; 
        if (fateId === 'fate_lucky') weight *= 1.3;
        if (fateId === 'fate_unlucky') weight *= 0.5;
      }
      
      // Kötü olaylar
      if (event.type === 'unlucky') {
        weight -= (luck - 50) * 0.5;
        if (fateId === 'fate_unlucky') weight *= 1.5;
        if (fateId === 'fate_struggle') weight *= 1.2;
      }

      weight = Math.max(1, weight); // Ağırlık 1'in altına düşemez
      totalWeight += weight;
      return { event, weight };
    });

    // 3. Ağırlıklı rastgele seçim
    let randomNum = Math.random() * totalWeight;
    for (const item of weightedEvents) {
      if (randomNum < item.weight) {
        return item.event;
      }
      randomNum -= item.weight;
    }

    return validEvents[0]; // Fallback
  }
}
