// ============================================
// PARA & FORMATLAMA ARAÇLARI
// ============================================

export const formatMoney = (amount) => {
  return amount.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getCurrency = (language) => language === 'en' ? '$' : 'TL';

export const formatMoneyFull = (amount, language = 'tr') => {
  return `${formatMoney(amount)} ${getCurrency(language)}`;
};

export const formatPercent = (value) => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}%${value.toFixed(1)}`;
};
