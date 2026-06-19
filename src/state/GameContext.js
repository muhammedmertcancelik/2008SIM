// ============================================
// OYUN DURUMU — React Context
// ============================================

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRandomEvent } from '../data/events.js';
import { EVENTS_2008 } from '../data/events_2008.js';
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
  energy: 100,
  stress: 0,
  relationship: 50,
  health: 100,
  happiness: 50,
  reputation: 50,
  inventory: [],
  skills: [],
  bankDebt: 0,
  creditScore: 1200,
  isGameOver: false,
  gameOverReason: '',
  delayedEvents: [],
  lastEvent: null,

  // Zaman Sistemi
  day: 1,
  hasWorked: false,
  currentEvent: null,

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

  // Ürün fiyatları (kopyalar ve yıl kısıtlaması)
  currentProducts: PRODUCTS.filter(p => {
    if (p.minYear && ECONOMY.startYear < p.minYear) return false;
    if (p.maxYear && ECONOMY.startYear > p.maxYear) return false;
    return true;
  }).map(p => ({ ...p })),
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
      const { product, amount = 1 } = action.payload;
      const totalCost = product.price * amount;
      
      if (totalCost > state.money) return state;

      const needMap = { Yiyecek: 'food', 'Ulaşım': 'transport', Kira: 'rent' };
      const needKey = needMap[product.category];
      const newNeeds = { ...state.needs };

      if (needKey && newNeeds[needKey]) {
        let addedValue = totalCost;
        // Kira veya özel Ulaşım ise hedefi %100 doldurur
        if (product.category === 'Kira' || product.id === 'akbil' || product.id === 'servis') {
          addedValue = newNeeds[needKey].target;
        }

        newNeeds[needKey] = {
          ...newNeeds[needKey],
          current: Math.min(
            newNeeds[needKey].current + addedValue,
            newNeeds[needKey].target
          ),
        };
      }

      let newEnergy = state.energy || 100;
      let newStress = state.stress || 0;
      
      if (product.category === 'Yiyecek') {
        newEnergy = Math.min(100, newEnergy + (product.needContribution * amount));
      } else if (product.category === 'Eğlence') {
        newStress = Math.max(0, newStress - (totalCost * 1.2));
      }

      return {
        ...state,
        money: state.money - totalCost,
        needs: newNeeds,
        energy: newEnergy,
        stress: newStress,
        stats: {
          ...state.stats,
          totalSpent: state.stats.totalSpent + totalCost,
        },
      };
    }

    case 'TAKE_LOAN': {
      const { amount } = action.payload;
      return {
        ...state,
        money: state.money + amount,
        bankDebt: (state.bankDebt || 0) + amount,
        creditScore: Math.max(0, (state.creditScore || 1200) - 50)
      };
    }

    case 'PAY_DEBT': {
      const { amount } = action.payload;
      return {
        ...state,
        money: state.money - amount,
        bankDebt: Math.max(0, (state.bankDebt || 0) - amount),
        creditScore: Math.min(1900, (state.creditScore || 1200) + 20)
      };
    }

    case 'TAKE_COURSE': {
      const { course } = action.payload;
      return {
        ...state,
        money: state.money - course.cost,
        skills: [...(state.skills || []), course.id],
        job: course.newJob,
        salary: state.salary + course.salaryIncrease,
        happiness: Math.min(100, (state.happiness || 50) + 20)
      };
    }

    case 'BUY_ASSET': {
      const { asset } = action.payload;
      return {
        ...state,
        money: state.money - asset.cost,
        inventory: [...(state.inventory || []), asset.id],
        happiness: Math.min(100, (state.happiness || 50) + 30)
      };
    }

    case 'WORK': {
      if (state.hasWorked || state.job === 'İşsiz') return state;
      const currentEnergy = state.energy ?? 100;
      const currentStress = state.stress ?? 0;
      const currentHealth = state.health ?? 100;
      
      if (currentEnergy < 20) return state;

      // İşten Kovulma Riski
      if (currentStress > 90 || currentHealth < 30) {
        if (Math.random() < 0.3) {
          // %30 ihtimalle kovuldu
          return {
            ...state,
            job: 'İşsiz',
            salary: 0,
            stress: 100,
            happiness: 0,
            currentEvent: {
              id: 'e_fired',
              title: 'KOVULDUN!',
              text: 'Aşırı stresli ve bitkin halin yüzünden patronla tartıştın. Eşyalarını topla, artık işsizsin.',
              choices: [{ text: 'Kahretsin!', effects: { happiness: -20, reputation: -20 } }]
            }
          };
        }
      }

      let newEnergy = Math.max(0, currentEnergy - 30);
      let newStress = Math.min(100, currentStress + 20);

      return { 
        ...state, 
        hasWorked: true, 
        energy: newEnergy, 
        stress: newStress
      };
    }

    case 'MAKE_CHOICE': {
      const choice = action.payload;
      const effects = choice.effects || {};
      
      const newMoney = Math.max(0, state.money + (effects.money || 0));
      const newEnergy = Math.max(0, Math.min(100, state.energy + (effects.energy || 0)));
      const newStress = Math.max(0, Math.min(100, state.stress + (effects.stress || 0)));
      const newRelationship = Math.max(0, Math.min(100, (state.relationship ?? 50) + (effects.relationship || 0)));
      const newHealth = Math.max(0, Math.min(100, (state.health ?? 100) + (effects.health || 0)));
      const newHappiness = Math.max(0, Math.min(100, (state.happiness ?? 50) + (effects.happiness || 0)));
      const newReputation = Math.max(0, Math.min(100, (state.reputation ?? 50) + (effects.reputation || 0)));

      // Gecikmeli Olay Kontrolü
      let updatedDelayedEvents = [...(state.delayedEvents || [])];
      if (action.payload.delayedEffect) {
        updatedDelayedEvents.push({
          daysLeft: action.payload.delayedEffect.daysDelay,
          eventId: action.payload.delayedEffect.triggerEventId
        });
      }

      return {
        ...state,
        money: newMoney,
        energy: newEnergy,
        stress: newStress,
        relationship: newRelationship,
        health: newHealth,
        happiness: newHappiness,
        reputation: newReputation,
        delayedEvents: updatedDelayedEvents,
        currentEvent: null // Olay bitti
      };
    }


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

    case 'ADVANCE_TIME': {
      if (state.isGameOver) return state;
      
      const daysToAdvance = action.payload.days || 1;
      let newDay = state.day + daysToAdvance;

      let currentHealth = state.health ?? 100;
      let currentHappiness = state.happiness ?? 50;
      let currentStress = state.stress ?? 0;

      // Hastalık Mekaniği (Sağlık 30'un altındaysa her gün erir)
      if (currentHealth < 30) {
        currentHealth -= (2 * daysToAdvance);
      }

      // Ölüm Kontrolü
      if (currentHealth <= 0) {
        return {
          ...state,
          health: 0,
          isGameOver: true,
          gameOverReason: 'Sağlığını tamamen ihmal ettin ve ağır bir hastalık geçirerek hayatını kaybettin.'
        };
      }

      // Gecikmeli olayları düşür
      let currentDelayedEvents = [...(state.delayedEvents || [])];
      let triggeredEventId = null;
      currentDelayedEvents = currentDelayedEvents.map(e => ({ ...e, daysLeft: e.daysLeft - daysToAdvance }));
      
      const triggered = currentDelayedEvents.filter(e => e.daysLeft <= 0);
      if (triggered.length > 0) {
        triggeredEventId = triggered[0].eventId;
        currentDelayedEvents = currentDelayedEvents.filter(e => e.daysLeft > 0);
      }

      let nextEvent = null;

      // Cinnet Geçirme Mekaniği
      if (currentStress >= 100 && currentHappiness <= 0 && Math.random() < 0.2) {
         nextEvent = {
            id: 'e_cinnet',
            title: 'CİNNET GETİRDİN!',
            text: 'Aylardır süren stres, borçlar ve mutsuzluk en sonunda patlamana neden oldu. Kontrolünü kaybettin ve elindeki paranın bir kısmını öfkeyle saçtın!',
            choices: [{ text: 'Kendime Gelmeliyim...', effects: { money: -(state.money * 0.5), stress: -50, happiness: 10 } }]
         };
         currentDelayedEvents = currentDelayedEvents.map(e => ({ ...e, daysLeft: e.daysLeft + daysToAdvance })); // Gecikmeleri dondur
      } 
      else if (triggeredEventId) {
        nextEvent = EVENTS_2008.find(e => e.id === triggeredEventId) || {
          id: 'error_event', title: 'Hata', text: 'Olay bulunamadı.', choices: [{text:'Geç', effects:{}}]
        };
      } else {
        const rootEvents = EVENTS_2008.filter(e => !['e_askerlik_gbt', 'e_ilk_bulusma', 'e_nokia_patlama', 'e_akraba_trip'].includes(e.id));
        nextEvent = rootEvents[Math.floor(Math.random() * rootEvents.length)];
      }

      let newState = { ...state, health: currentHealth, currentEvent: nextEvent, delayedEvents: currentDelayedEvents };
      
      if (newDay <= 30) {
        // Ay bitmedi
        newState.day = newDay;
        return newState;
      }

      // Ay sonu işlemleri (newDay > 30)
      let newMonth = state.month + 1;
      let newYear = state.year;
      let newSalary = state.salary;

      if (newMonth >= 12) {
        newMonth = 0;
        newYear++;
        newSalary = Math.round(state.salary * (1 + ECONOMY.salary.annualRaisePercent / 100));
      }

      // Enflasyon uygula ve zamana bağlı ürünleri filtrele
      const newProducts = PRODUCTS.filter(p => {
        if (p.minYear && newYear < p.minYear) return false;
        if (p.maxYear && newYear > p.maxYear) return false;
        return true;
      }).map(p => {
        const existing = state.currentProducts.find(ep => ep.id === p.id);
        const basePrice = existing ? existing.price : p.price;

        const randomFactor = (Math.random() - 0.5) * 2 * ECONOMY.inflation.volatility;
        let monthlyRate = ECONOMY.inflation.baseMonthlyRate + randomFactor;
        monthlyRate = Math.max(ECONOMY.inflation.minMonthlyRate, Math.min(ECONOMY.inflation.maxMonthlyRate, monthlyRate));

        let catMultiplier = 1;
        if (p.category === 'Yiyecek') catMultiplier = 1.1;
        if (p.category === 'Kira') catMultiplier = 0.8;
        if (p.category === 'Ulaşım') catMultiplier = 1.2;

        const newPrice = Math.max(0.10, Math.round(basePrice * (1 + (monthlyRate * catMultiplier / 100)) * 100) / 100);
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

      // Maaş ödemesi (Bu ay çalışıldıysa tam maaş)
      const earnedSalary = state.hasWorked ? newSalary : 0;

      // Banka Faiz İşlemi (Aylık %5)
      let newBankDebt = state.bankDebt || 0;
      if (newBankDebt > 0) {
        newBankDebt = Math.round(newBankDebt * 1.05);
      }

      return {
        ...newState,
        day: newDay - 30, // Artan günleri sonraki aya sarkıt
        month: newMonth,
        year: newYear,
        monthCount: state.monthCount + 1,
        salary: newSalary,
        money: state.money + earnedSalary,
        bankDebt: newBankDebt,
        hasWorked: false,
        needs: {
          food: { current: 0, target: state.needs.food.target },
          transport: { current: 0, target: (state.inventory || []).includes('a_car_sahin') ? 0 : state.needs.transport.target },
          rent: { current: 0, target: (state.inventory || []).includes('a_house_1') ? 0 : state.needs.rent.target },
        },
        currentProducts: newProducts,
        currentStocks: newStocks,
        stats: { 
          ...state.stats, 
          monthsPlayed: state.stats.monthsPlayed + 1,
          totalEarned: state.stats.totalEarned + earnedSalary
        },
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
        day: gameState.day,
        currentEvent: gameState.currentEvent,
        energy: gameState.energy,
        stress: gameState.stress,
        relationship: gameState.relationship ?? 50,
        health: gameState.health ?? 100,
        happiness: gameState.happiness ?? 50,
        reputation: gameState.reputation ?? 50,
        inventory: gameState.inventory || [],
        skills: gameState.skills || [],
        bankDebt: gameState.bankDebt || 0,
        creditScore: gameState.creditScore || 1200,
        isGameOver: gameState.isGameOver || false,
        gameOverReason: gameState.gameOverReason || '',
        delayedEvents: gameState.delayedEvents || [],
        lastEvent: gameState.lastEvent,
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
