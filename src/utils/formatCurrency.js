// Currency configurations with their respective locales
const currencyConfig = {
  USD: { locale: 'en-US', symbol: '$', name: 'US Dollar' },
  EUR: { locale: 'en-GB', symbol: '€', name: 'Euro' },
  GBP: { locale: 'en-GB', symbol: '£', name: 'British Pound' },
  INR: { locale: 'en-IN', symbol: '₹', name: 'Indian Rupee' },
  CAD: { locale: 'en-CA', symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { locale: 'en-AU', symbol: 'A$', name: 'Australian Dollar' },
  JPY: { locale: 'ja-JP', symbol: '¥', name: 'Japanese Yen' },
  CNY: { locale: 'zh-CN', symbol: '¥', name: 'Chinese Yuan' },
  CHF: { locale: 'de-CH', symbol: 'CHF', name: 'Swiss Franc' },
  SEK: { locale: 'sv-SE', symbol: 'kr', name: 'Swedish Krona' },
};

export const formatCurrency = (amount, currencyCode = 'INR', minimumFractionDigits = 2) => {
  const config = currencyConfig[currencyCode] || currencyConfig.INR;
  return new Intl.NumberFormat(config.locale, { 
    style: 'currency', 
    currency: currencyCode, 
    minimumFractionDigits 
  }).format(amount);
};

export const getSupportedCurrencies = () => {
  return Object.entries(currencyConfig).map(([code, config]) => ({
    code,
    symbol: config.symbol,
    name: config.name,
    displayName: `${config.name} (${config.symbol})`
  }));
};

export const getCurrencySymbol = (currencyCode) => {
  return formatCurrency(0, currencyCode).replace(/[\d.,\s]/g, '');
};
