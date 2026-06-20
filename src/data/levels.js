// ============================================
// SEVİYE VE PRESTİJ SİSTEMİ
// ============================================

export const JOB_LEVELS = [
  { level: 1, title: 'Çırak', title_en: 'Apprentice', salaryMultiplier: 1.0, requiredExp: 0 },
  { level: 5, title: 'İşçi', title_en: 'Worker', salaryMultiplier: 1.2, requiredExp: 50 },
  { level: 10, title: 'Usta', title_en: 'Master', salaryMultiplier: 1.5, requiredExp: 150 },
  { level: 20, title: 'Şef', title_en: 'Chief', salaryMultiplier: 2.0, requiredExp: 400 },
  { level: 40, title: 'Müdür', title_en: 'Manager', salaryMultiplier: 3.5, requiredExp: 1000 },
  { level: 70, title: 'Genel Müdür', title_en: 'General Manager', salaryMultiplier: 6.0, requiredExp: 2500 },
  { level: 100, title: 'Şirket Sahibi', title_en: 'Company Owner', salaryMultiplier: 12.0, requiredExp: 5000 },
];

export const FINANCE_LEVELS = [
  { level: 1, title: 'Acemi', title_en: 'Novice', perk: 'Temel banka işlemleri', perk_en: 'Basic banking operations' },
  { level: 10, title: 'Tasarrufçu', title_en: 'Saver', perk: 'Mevduat hesabı faizi artışı (%2)', perk_en: 'Deposit account interest increase (2%)' },
  { level: 25, title: 'Yatırımcı', title_en: 'Investor', perk: 'Borsa kilitleri açılır', perk_en: 'Stock market unlocks' },
  { level: 50, title: 'Uzman', title_en: 'Expert', perk: 'Emlak ve Şirket satın alma kilidi açılır', perk_en: 'Real estate and Company purchase unlocks' },
  { level: 100, title: 'Finans Dehası', title_en: 'Financial Genius', perk: 'Tüm yatırımlardan ekstra %10 getiri', perk_en: 'Extra 10% return on all investments' },
];

// Seviye tecrübe gereksinimlerini hesaplayan genel formül
// exp = (level^2) * 10
export const getRequiredExpForLevel = (level) => {
  return Math.floor(Math.pow(level, 2) * 10);
};

export const checkLevelUp = (currentLevel, currentExp) => {
  const nextLevelReq = getRequiredExpForLevel(currentLevel + 1);
  if (currentExp >= nextLevelReq && currentLevel < 100) {
    return true; // Seviye atlayabilir
  }
  return false;
};

// Tecrübe kazandırma fonksiyonu
// Kazanılan tecrübe, karakterin 'Zeka' (intelligence) ve 'Çalışkanlık' (hardwork) gibi özelliklerinden etkilenebilir
export const calculateGainedExp = (baseExp, hiddenStats) => {
  const { intelligence = 50, hardwork = 50 } = hiddenStats;
  const modifier = 1 + ((intelligence - 50) / 200) + ((hardwork - 50) / 200); // 100 stat %50 bonus verir
  return Math.max(1, Math.floor(baseExp * modifier));
};
