// ============================================
// OYUN DURUMU — React Context
// ============================================

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRODUCTS, NEED_TARGETS } from '../data/products.js';
import { STOCKS, STOCK_VOLATILITY } from '../data/stocks.js';
import { ECONOMY, MONTHS_TR } from '../data/economy.js';

const STORAGE_KEY = 'life-sim-save';

// İlk durum
const getInitialState = () => ({
  // Oyuncu
  money: ECONOMY.salary.baseSalary,
  salary: ECONOMY.salary.baseSalary,
  job: 'İşçi',
  hasWorked: false,
  hasPaid: false,

  // İhtiyaçlar
  needs: {
    food: { current: 0, target: NEED_TARGETS['Yiyecek'] },
    transport: { current: 0, target: NEED_TARGETS['Ulaşım'] },
    rent: { current: 0, target: NEED_TARGETS['Kira'] },
  },

  // Portföy
  portfolio: { altin: 0, thy: 0, bim: 0, aselsan: 0 },

  // Tarih
  year: ECONOMY.startYear,
  month: ECONOMY.startMonth,
  monthCount: 0,

  // Ürün fiyatları (kopyalar)
  currentProducts: PRODUCTS.map(p => ({ ...p })),
  currentStocks: STOCKS.map(s => ({ ...s })),

  // İşlem geçmişi
  transactions: [],

  // İstatistikler
  stats: { totalEarned: 0, totalSpent: 0, monthsPlayed: 0 },

  // UI durumu
  loaded: false,
});

// Reducer
function gameReducer(state, action) {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...state, ...action.payload, loaded: true };

    case 'SET_LOADED':
      return { ...state, loaded: true };

    case 'BUY_PRODUCT': {
      const product = action.payload;
      if (product.price > state.money) return state;

      const needMap = { Yiyecek: 'food', 'Ulaşım': 'transport', Kira: 'rent' };
      const needKey = needMap[product.category];
      const newNeeds = { ...state.needs };

      if (needKey && newNeeds[needKey]) {
        newNeeds[needKey] = {
          ...newNeeds[needKey],
          current: Math.min(
            newNeeds[needKey].current + product.price,
            newNeeds[needKey].target
          ),
        };
      }

      return {
        ...state,
        money: state.money - product.price,
        needs: newNeeds,
        stats: {
          ...state.stats,
          totalSpent: state.stats.totalSpent + product.price,
        },
      };
    }

    case 'WORK':
      return { ...state, hasWorked: true };

    case 'COLLECT_SALARY':
      if (!state.hasWorked || state.hasPaid) return state;
      return {
        ...state,
        money: state.money + state.salary,
        hasPaid: true,
        stats: {
          ...state.stats,
          totalEarned: state.stats.totalEarned + state.salary,
        },
      };

    case 'BUY_STOCK': {
      const { stockId, amount, pricePerUnit } = action.payload;
      const totalCost = amount * pricePerUnit;
      if (totalCost > state.money) return state;

      return {
        ...state,
        money: state.money - totalCost,
        portfolio: {
          ...state.portfolio,
          [stockId]: (state.portfolio[stockId] || 0) + amount,
        },
        transactions: [
          ...state.transactions.slice(-49),
          { type: 'buy', stockId, amount, pricePerUnit, totalCost, timestamp: Date.now() },
        ],
        stats: { ...state.stats, totalSpent: state.stats.totalSpent + totalCost },
      };
    }

    case 'SELL_STOCK': {
      const { stockId, amount, pricePerUnit } = action.payload;
      if ((state.portfolio[stockId] || 0) < amount) return state;
      const totalRevenue = amount * pricePerUnit;

      return {
        ...state,
        money: state.money + totalRevenue,
        portfolio: {
          ...state.portfolio,
          [stockId]: state.portfolio[stockId] - amount,
        },
        transactions: [
          ...state.transactions.slice(-49),
          { type: 'sell', stockId, amount, pricePerUnit, totalCost: totalRevenue, timestamp: Date.now() },
        ],
        stats: { ...state.stats, totalEarned: state.stats.totalEarned + totalRevenue },
      };
    }

    case 'ADVANCE_MONTH': {
      let newMonth = state.month + 1;
      let newYear = state.year;
      let newSalary = state.salary;

      if (newMonth >= 12) {
        newMonth = 0;
        newYear++;
        // Yıllık maaş artışı
        newSalary = Math.round(state.salary * (1 + ECONOMY.salary.annualRaisePercent / 100));
      }

      // Enflasyon uygula
      const newProducts = state.currentProducts.map(p => {
        const randomFactor = (Math.random() - 0.5) * 2 * ECONOMY.inflation.volatility;
        let monthlyRate = ECONOMY.inflation.baseMonthlyRate + randomFactor;
        monthlyRate = Math.max(ECONOMY.inflation.minMonthlyRate, Math.min(ECONOMY.inflation.maxMonthlyRate, monthlyRate));

        let catMultiplier = 1;
        if (p.category === 'Yiyecek') catMultiplier = 1.1;
        if (p.category === 'Kira') catMultiplier = 0.8;
        if (p.category === 'Ulaşım') catMultiplier = 1.2;

        const newPrice = Math.max(0.10, Math.round(p.price * (1 + (monthlyRate * catMultiplier / 100)) * 100) / 100);
        return { ...p, price: newPrice };
      });

      // Yatırım fiyatlarını güncelle
      const newStocks = state.currentStocks.map(s => {
        const vol = STOCK_VOLATILITY[s.id];
        if (!vol) return s;

        const random = Math.random();
        let changePercent;
        if (random < vol.trend) {
          changePercent = Math.random() * vol.maxChange;
        } else {
          changePercent = -Math.random() * Math.abs(vol.minChange);
        }

        const newPrice = Math.max(0.01, Math.round(s.currentPrice * (1 + changePercent / 100) * 100) / 100);
        return {
          ...s,
          currentPrice: newPrice,
          monthlyChangePercent: Math.round(changePercent * 10) / 10,
        };
      });

      return {
        ...state,
        month: newMonth,
        year: newYear,
        monthCount: state.monthCount + 1,
        salary: newSalary,
        hasWorked: false,
        hasPaid: false,
        needs: {
          food: { current: 0, target: state.needs.food.target },
          transport: { current: 0, target: state.needs.transport.target },
          rent: { current: 0, target: state.needs.rent.target },
        },
        currentProducts: newProducts,
        currentStocks: newStocks,
        stats: { ...state.stats, monthsPlayed: state.stats.monthsPlayed + 1 },
      };
    }

    case 'NEW_GAME':
      return { ...getInitialState(), loaded: true };

    default:
      return state;
  }
}

// Context
const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, getInitialState);

  // Kaydet
  const saveGame = useCallback(async (gameState) => {
    try {
      const saveData = {
        money: gameState.money,
        salary: gameState.salary,
        job: gameState.job,
        hasWorked: gameState.hasWorked,
        hasPaid: gameState.hasPaid,
        needs: gameState.needs,
        portfolio: gameState.portfolio,
        year: gameState.year,
        month: gameState.month,
        monthCount: gameState.monthCount,
        currentProducts: gameState.currentProducts.map(p => ({ id: p.id, price: p.price })),
        currentStocks: gameState.currentStocks.map(s => ({
          id: s.id, currentPrice: s.currentPrice, monthlyChangePercent: s.monthlyChangePercent,
        })),
        transactions: gameState.transactions.slice(-50),
        stats: gameState.stats,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
    } catch (e) {
      console.log('Kaydetme hatası:', e);
    }
  }, []);

  // Yükle
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const data = JSON.parse(raw);
          // Ürün fiyatlarını geri yükle
          const products = PRODUCTS.map(p => {
            const saved = data.currentProducts?.find(sp => sp.id === p.id);
            return saved ? { ...p, price: saved.price } : { ...p };
          });
          // Yatırım fiyatlarını geri yükle
          const stocks = STOCKS.map(s => {
            const saved = data.currentStocks?.find(ss => ss.id === s.id);
            return saved ? { ...s, currentPrice: saved.currentPrice, monthlyChangePercent: saved.monthlyChangePercent } : { ...s };
          });

          dispatch({
            type: 'LOAD_STATE',
            payload: {
              ...data,
              currentProducts: products,
              currentStocks: stocks,
            },
          });
        } else {
          dispatch({ type: 'SET_LOADED' });
        }
      } catch (e) {
        console.log('Yükleme hatası:', e);
        dispatch({ type: 'SET_LOADED' });
      }
    })();
  }, []);

  // Her değişiklikte otomatik kaydet
  useEffect(() => {
    if (state.loaded) {
      saveGame(state);
    }
  }, [state, saveGame]);

  // Helper fonksiyonlar
  const allNeedsMet = state.needs.food.current >= state.needs.food.target
    && state.needs.transport.current >= state.needs.transport.target
    && state.needs.rent.current >= state.needs.rent.target;

  const getMonthName = () => MONTHS_TR[state.month];

  const getPortfolioValue = () => {
    let total = 0;
    state.currentStocks.forEach(s => {
      total += (state.portfolio[s.id] || 0) * s.currentPrice;
    });
    return total;
  };

  const value = {
    state,
    dispatch,
    allNeedsMet,
    getMonthName,
    getPortfolioValue,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
