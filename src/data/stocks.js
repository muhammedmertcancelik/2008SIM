// ============================================
// YATIRIM VERİLERİ — Şubat 2008
// ============================================

export const STOCKS = [
  {
    id: 'altin',
    name: 'Altın (gram)',
    emoji: '🥇',
    type: 'Emtia',
    basePrice: 45.00,
    currentPrice: 47.25,
    monthlyChangePercent: 5.0,
    ownedAmount: 0,
  },
  {
    id: 'thy',
    name: 'THY Hisse',
    emoji: '✈️',
    type: 'Borsa İstanbul',
    basePrice: 4.50,
    currentPrice: 4.73,
    monthlyChangePercent: 5.1,
    ownedAmount: 0,
  },
  {
    id: 'bim',
    name: 'BİM Hisse',
    emoji: '🏪',
    type: 'Borsa İstanbul',
    basePrice: 28.00,
    currentPrice: 28.84,
    monthlyChangePercent: 3.0,
    ownedAmount: 0,
  },
  {
    id: 'aselsan',
    name: 'ASELSAN Hisse',
    emoji: '🛡️',
    type: 'Borsa İstanbul',
    basePrice: 3.20,
    currentPrice: 3.34,
    monthlyChangePercent: 4.5,
    ownedAmount: 0,
  },
];

export const STOCK_VOLATILITY = {
  altin: { minChange: -3, maxChange: 8, trend: 0.5 },
  thy: { minChange: -10, maxChange: 15, trend: 0.3 },
  bim: { minChange: -8, maxChange: 12, trend: 0.4 },
  aselsan: { minChange: -8, maxChange: 14, trend: 0.35 },
};
