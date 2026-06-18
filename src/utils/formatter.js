// ============================================
// PARA & FORMATLAMA ARAÇLARI
// ============================================

export const formatMoney = (amount) => {
  return amount.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatMoneyFull = (amount) => {
  return `${formatMoney(amount)} TL`;
};

export const formatPercent = (value) => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}%${value.toFixed(1)}`;
};
