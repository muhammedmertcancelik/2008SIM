// ============================================
// EKONOMİ PARAMETRELERİ — 2008 Türkiye
// ============================================

export const ECONOMY = {
  country: 'Türkiye',
  startYear: 2008,
  startMonth: 0, // 0-indexed: 0=Ocak, 1=Şubat
  currency: 'TL',

  inflation: {
    baseMonthlyRate: 0.8,
    minMonthlyRate: 0.2,
    maxMonthlyRate: 2.5,
    volatility: 0.5,
  },

  salary: {
    baseSalary: 550,
    annualRaisePercent: 8,
    raiseMonth: 0,
  },

  needs: {
    food: { target: 250, label: 'Yiyecek' },
    transport: { target: 50, label: 'Ulaşım' },
    rent: { target: 550, label: 'Kira' },
  },
};

export const MONTHS_TR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];
