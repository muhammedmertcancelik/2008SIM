// ============================================
// SEVİYE VE PRESTİJ SİSTEMİ
// ============================================

export const JOB_LEVELS = [
  { level: 1, title: 'Çırak', salaryMultiplier: 1.0, requiredExp: 0 },
  { level: 5, title: 'İşçi', salaryMultiplier: 1.2, requiredExp: 50 },
  { level: 10, title: 'Usta', salaryMultiplier: 1.5, requiredExp: 150 },
  { level: 20, title: 'Şef', salaryMultiplier: 2.0, requiredExp: 400 },
  { level: 40, title: 'Müdür', salaryMultiplier: 3.5, requiredExp: 1000 },
  { level: 70, title: 'Genel Müdür', salaryMultiplier: 6.0, requiredExp: 2500 },
  { level: 100, title: 'Şirket Sahibi', salaryMultiplier: 12.0, requiredExp: 5000 },
];

export const FINANCE_LEVELS = [
  { level: 1, title: 'Acemi', perk: 'Temel banka işlemleri' },
  { level: 10, title: 'Tasarrufçu', perk: 'Mevduat hesabı faizi artışı (%2)' },
  { level: 25, title: 'Yatırımcı', perk: 'Borsa kilitleri açılır' },
  { level: 50, title: 'Uzman', perk: 'Emlak ve Şirket satın alma kilidi açılır' },
  { level: 100, title: 'Finans Dehası', perk: 'Tüm yatırımlardan ekstra %10 getiri' },
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
