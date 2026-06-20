// ============================================
// OYUN DURUMU — React Context
// ============================================

import React, { createContext, useContext, useReducer, useCallback, useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRandomEvent } from '../data/events.js';
import { EVENTS_2008 } from '../data/events_2008.js';
import { PRODUCTS, NEED_TARGETS } from '../data/products.js';
import { STOCKS, STOCK_VOLATILITY } from '../data/stocks.js';
import { ECONOMY, MONTHS_TR } from '../data/economy.js';
import { QUESTS_DATA } from '../data/quests.js';
import { generateCharacterProfile } from '../data/characterModels.js';
import { calculateGainedExp, checkLevelUp } from '../data/levels.js';
import { EventEngine } from '../utils/EventEngine.js';
import { AIStoryteller } from '../utils/AIStoryteller.js';
import { NPCS, getInitialNpcRelationships, getInitialMetNpcs, checkNpcIntroCondition } from '../data/npcs.js';
import { CHAPTERS, getCurrentChapterIndex, TOTAL_PAGES, FINAL_MONTH } from '../data/chapters.js';

const STORAGE_KEY = 'life-sim-save';

// İlk durum
const getInitialState = (customProfile = null) => {
  const isDefault = !customProfile;
  const charData = customProfile || generateCharacterProfile('story_middle', 'Oyuncu', 'Erkek', 'Türkiye');
  
  return {
    runId: Date.now().toString(),
    isCharacterCreated: !isDefault,
    isGeneratingEvent: false, // AI olay oluşturma bekleme durumu
    // -- YENİ KARAKTER SİSTEMİ --
    profile: charData.profile,
    hiddenStats: charData.stats, // luck, discipline, vb. ve level yapıları
    memories: [], // Karakterin anıları
    encounteredEvents: [], // Daha önce yaşanmış olaylar (tekrarı önlemek için)
    experience: {
      job: 0,
      finance: 0,
      education: 0,
      health: 0,
      social: 0,
      happiness: 0,
      prestige_neighborhood: 0,
      prestige_city: 0,
      prestige_country: 0
    },
    // ---------------------------

    // Oyuncu temel verilerini charData'dan alıyoruz
    money: charData.stats.money,
    salary: charData.stats.salary,
    job: charData.stats.job,
    bankDebt: charData.stats.bankDebt,
    
    // Hayati Değerler
    energy: charData.vitals.energy,
    stress: charData.vitals.stress,
    relationship: charData.vitals.relationship,
    health: charData.vitals.health,
    happiness: charData.vitals.happiness,
    hunger: charData.vitals.hunger,
    social: charData.vitals.social,
    hasWorked: false,
    hasPaid: false,
    reputation: 50,
    inventory: [],
    skills: [],
    isGameOver: false,
    gameOverReason: '',
    wantedLevel: 0, // Aranma seviyesi (0-100)
    delayedEvents: [],
    lastEvent: null,

    // Zaman Sistemi
    day: 1,
    hasWorked: false,
    currentEvent: null,

    // Görevler Modu
    quests: {
      active: [],
      completed: [],
      failed: [],
      lastAssignedDay: 0
    },

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

    // === YAŞAYAN ROMAN SİSTEMİ ===
    bookPages: [],             // [{pageNum, content, chapter, monthCount, day}]
    currentChapter: 0,         // 0-4 (5 bölüm index)
    chaptersSeenIntro: [],     // Hangi bölüm intro'ları görüldü
    pendingChapterIntro: null,  // Gösterilecek bölüm geçişi

    // === NPC SİSTEMİ ===
    npcRelationships: getInitialNpcRelationships(),
    metNpcs: getInitialMetNpcs(),

    // === GÜNLÜK EFOR SİSTEMİ ===
    dailyActionCompleted: false,

    // === BANKA MEVDUAT ===
    bankSavings: 0,
    // ==========================

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

    // Onboarding
    hasSeenTutorial: false,
    appAlert: null,
    confirmDialog: null,

    // UI durumu
    loaded: false,
  };
};

// Görev ilerlemesini kontrol eden yardımcı fonksiyon
function updateQuestProgress(state, conditionType, amount = 1) {
  if (!state.quests || !state.quests.active) return state;

  let newMoney = state.money;
  let newReputation = state.reputation || 50;
  let newWanted = state.wantedLevel || 0;
  let newInventory = [...(state.inventory || [])];

  const stillActive = [];
  const newlyCompleted = [];

  state.quests.active.forEach(quest => {
    if (quest.conditionType === conditionType) {
      const updatedAmount = (quest.currentAmount || 0) + amount;
      if (updatedAmount >= quest.targetAmount) {
        newlyCompleted.push({ ...quest, currentAmount: quest.targetAmount });
        // Ödülleri ver
        if (quest.rewards.money) newMoney += quest.rewards.money;
        if (quest.rewards.reputation) newReputation += quest.rewards.reputation;
        if (quest.rewards.wantedLevelChange) newWanted = Math.max(0, newWanted + quest.rewards.wantedLevelChange);
        if (quest.rewards.item) newInventory.push(quest.rewards.item.id);
      } else {
        stillActive.push({ ...quest, currentAmount: updatedAmount });
      }
    } else {
      stillActive.push(quest);
    }
  });

  return {
    ...state,
    money: newMoney,
    reputation: newReputation,
    wantedLevel: newWanted,
    inventory: newInventory,
    quests: {
      ...state.quests,
      active: stillActive,
      completed: [...(state.quests.completed || []), ...newlyCompleted]
    }
  };
}

// Reducer
function gameReducer(state, action) {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...state, ...action.payload, loaded: true, isGeneratingEvent: false };

    case 'SET_LOADED':
      return { ...state, loaded: true, isGeneratingEvent: false };

    case 'START_GENERATING_EVENT':
      return { ...state, isGeneratingEvent: true };

    case 'FINISH_GENERATING_EVENT':
      return { ...state, isGeneratingEvent: false, currentEvent: action.payload };

    case 'SHOW_CONFIRM':
      return { ...state, confirmDialog: action.payload };
    case 'HIDE_CONFIRM':
      return { ...state, confirmDialog: null };
    case 'SHOW_ALERT':
      return { ...state, appAlert: action.payload };
    case 'HIDE_ALERT':
      return { ...state, appAlert: null };

    case 'COMPLETE_TUTORIAL':
      return { ...state, hasSeenTutorial: true };

    case 'ACCEPT_QUEST': {
      const { quest } = action.payload;
      if (state.quests.active.find(q => q.id === quest.id)) return state;
      return {
        ...state,
        quests: {
          ...state.quests,
          active: [...state.quests.active, { ...quest, currentAmount: 0 }]
        }
      };
    }

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

      const baseState = {
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
      return product.category === 'Yiyecek' ? updateQuestProgress(baseState, 'buy_food', 1) : baseState;
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

    case 'DELIVERY_MINIGAME_RESULT': {
      const { success, reward, energyCost } = action.payload;
      
      let baseState = {
        ...state,
        energy: Math.max(0, state.energy - energyCost),
        hunger: Math.min(100, (state.hunger || 0) + 10),
        stress: Math.min(100, state.stress + (success ? 2 : 10)),
        dailyActionCompleted: true, // Efor harcandı
      };
      return updateQuestProgress(baseState, 'minigame_delivery', 1);
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
        happiness: Math.min(100, (state.happiness || 50) + 20)
      };
    }

    case 'CHANGE_JOB': {
      const { job } = action.payload;
      if (!job) {
        // İstifa etme durumu
        return {
          ...state,
          job: 'İşsiz',
          salary: 0,
          currentJobId: null,
          stress: Math.max(0, (state.stress || 0) - 20), // İstifa edince rahatlar
          happiness: Math.max(0, (state.happiness || 50) - 10) // Ama parasızlık korkutur
        };
      }
      return {
        ...state,
        job: job.title,
        salary: job.salary,
        currentJobId: job.id,
        stress: Math.min(100, (state.stress || 0) + 10) // Yeni işe girmenin gerginliği
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

    case 'WORK_ACTION': {
      if (state.energy < 20) return state;
      
      const wage = Math.round(state.salary / 30);
      const newExp = (state.experience?.job || 0) + calculateGainedExp('job', state.hiddenStats?.levels?.job || 1);
      
      let baseState = {
        ...state,
        money: state.money + wage,
        energy: Math.max(0, state.energy - 20),
        stress: Math.min(100, state.stress + 5),
        hunger: Math.min(100, (state.hunger || 0) + 15),
        hasWorked: true,
        dailyActionCompleted: true, // Efor harcandı
        experience: { ...state.experience, job: newExp },
        stats: {
          ...state.stats,
          totalEarned: (state.stats?.totalEarned || 0) + wage
        }
      };
      return updateQuestProgress(baseState, 'work', 1);
    }

    case 'VISIT_LOCATION': {
      const location = action.payload; // { cost: 50, energyCost: 20, health: 10, stress: -30, moneyChange: 100 vb. }
      const currentEnergy = state.energy ?? 100;
      const currentMoney = state.money ?? 0;
      
      const energyCost = location.energyCost || 0;
      const cost = location.cost || 0;

      if (currentEnergy < energyCost) return state; // Enerji yetersiz
      if (currentMoney < cost) return state; // Para yetersiz

      let newEnergy = Math.max(0, Math.min(100, currentEnergy - energyCost + (location.energy || 0)));
      let newMoney = currentMoney - cost + (location.moneyChange || 0);
      let newStress = Math.max(0, Math.min(100, (state.stress || 0) + (location.stress || 0)));
      let newHealth = Math.max(0, Math.min(100, (state.health || 100) + (location.health || 0)));
      let newHappiness = Math.max(0, Math.min(100, (state.happiness || 50) + (location.happiness || 0)));
      let newWantedLevel = Math.max(0, Math.min(100, (state.wantedLevel || 0) + (location.wantedLevel || 0)));
      let newHunger = Math.max(0, Math.min(100, (state.hunger || 0) + (location.hunger || 0)));

      return {
        ...state,
        energy: newEnergy,
        money: newMoney,
        stress: newStress,
        health: newHealth,
        happiness: newHappiness,
        wantedLevel: newWantedLevel,
        hunger: newHunger,
        stats: {
          ...state.stats,
          totalSpent: state.stats.totalSpent + cost,
        }
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
      const newWantedLevel = Math.max(0, Math.min(100, (state.wantedLevel || 0) + (effects.wantedLevel || 0)));

      let isGameOver = state.isGameOver;
      let gameOverReason = state.gameOverReason;

      if (effects.isGameOver) {
        isGameOver = true;
        gameOverReason = effects.gameOverReason || "Bir seçiminin sonucunda hayatın tamamen mahvoldu.";
      }

      // Gecikmeli Olay Kontrolü
      let updatedDelayedEvents = [...(state.delayedEvents || [])];
      if (action.payload.delayedEffect) {
        updatedDelayedEvents.push({
          daysLeft: action.payload.delayedEffect.daysDelay,
          eventId: action.payload.delayedEffect.triggerEventId
        });
      }

      // Hafıza Sistemi
      let updatedMemories = [...(state.memories || [])];
      if (action.payload.newMemoryToSave) {
        updatedMemories.push(action.payload.newMemoryToSave);
      }

      // Karşılaşılan Olaylar Listesi (Tekrarı Önleme)
      let updatedEncountered = [...(state.encounteredEvents || [])];
      if (state.currentEvent && state.currentEvent.id && !state.currentEvent.isAiEvent && !state.currentEvent.isRepeatable) {
        updatedEncountered.push(state.currentEvent.id);
      }

      // Son Karşılaşılan Olaylar (Tekrarı Önleme - Son 7 Olay)
      let updatedRecent = [...(state.recentEvents || [])];
      if (state.currentEvent && state.currentEvent.id && !state.currentEvent.isAiEvent) {
        updatedRecent.push(state.currentEvent.id);
        if (updatedRecent.length > 7) updatedRecent.shift();
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
        wantedLevel: newWantedLevel,
        delayedEvents: updatedDelayedEvents,
        memories: updatedMemories,
        encounteredEvents: updatedEncountered,
        recentEvents: updatedRecent,
        currentEvent: null, // Olay bitti
        isGameOver,
        gameOverReason
      };
    }

    case 'GAIN_EXP': {
      const { category, amount } = action.payload; // category örn: 'job', 'finance'
      const actualExp = calculateGainedExp(amount, state.hiddenStats || {});
      const newExpAmount = (state.experience[category] || 0) + actualExp;
      
      const currentLevel = state.hiddenStats.levels[category] || 1;
      
      let newLevel = currentLevel;
      // Level up check
      if (checkLevelUp(currentLevel, newExpAmount)) {
        newLevel += 1;
        // İsteğe bağlı olarak burada alert veya event tetiklenebilir
      }

      return {
        ...state,
        experience: {
          ...state.experience,
          [category]: newExpAmount
        },
        hiddenStats: {
          ...state.hiddenStats,
          levels: {
            ...state.hiddenStats.levels,
            [category]: newLevel
          }
        }
      };
    }

    case 'BUY_STOCK': {
      const { stockId, amount, pricePerUnit } = action.payload;
      const totalCost = amount * pricePerUnit;
      if (totalCost > state.money) return state;

      const baseState = {
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
      return updateQuestProgress(baseState, 'buy_stock', amount);
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

    case 'MINIGAME_COMPLETE': {
      const { rewardMoney, rewardReputation, rewardWantedLevel } = action.payload;
      const baseState = {
        ...state,
        money: state.money + (rewardMoney || 0),
        reputation: (state.reputation || 50) + (rewardReputation || 0),
        wantedLevel: Math.max(0, (state.wantedLevel || 0) + (rewardWantedLevel || 0)),
        dailyActionCompleted: true // Efor harcandı
      };
      return updateQuestProgress(baseState, 'minigame_delivery', 1);
    }

    case 'ADVANCE_TIME': {
      if (state.isGameOver) return state;
      
      const daysToAdvance = action.payload.days || 1;
      let newDay = state.day + daysToAdvance;

      let currentHealth = state.health ?? 100;
      let currentHunger = state.hunger || 0;
      let currentStress = state.stress ?? 0;
      let isGameOver = state.isGameOver;
      let gameOverReason = state.gameOverReason;

      // Açlık ve Sağlık Güncellemesi
      currentHunger = Math.min(100, currentHunger + (daysToAdvance * 10));
      if (currentHunger >= 80) {
        currentHealth = Math.max(0, currentHealth - (daysToAdvance * 10));
      }

      // Ölüm Kontrolü
      if (currentHealth <= 0) {
        isGameOver = true;
        gameOverReason = 'Açlık ve bakımsızlık yüzünden vücudun iflas etti ve hayatını kaybettin.';
      }
      
      // Polis Yakalanma İhtimali
      const currentWantedLevel = state.wantedLevel || 0;
      if (currentWantedLevel > 0 && !isGameOver) {
        const arrestChancePerDay = (currentWantedLevel / 10) * 0.02;
        const totalArrestChance = arrestChancePerDay * daysToAdvance;
        if (Math.random() < totalArrestChance) {
          isGameOver = true;
          gameOverReason = "Yasadışı faaliyetlerin polisin dikkatinden kaçmadı. Şafak operasyonuyla tutuklandın.";
        }
      }
      
      // Eğer dışarıdan hazır bir olay verilmişse (örneğin AI event), doğrudan onu kullan ve geri kalan ay sonu işlemlerini yap
      let nextEvent = action.payload.injectedEvent || null;
      let currentDelayedEvents = [...(state.delayedEvents || [])];
      
      if (!nextEvent) {
        // Gecikmeli olayları düşür
        let triggeredEventId = null;
        currentDelayedEvents = currentDelayedEvents.map(e => ({ ...e, daysLeft: e.daysLeft - daysToAdvance }));
        
        const triggered = currentDelayedEvents.filter(e => e.daysLeft <= 0);
        if (triggered.length > 0) {
          triggeredEventId = triggered[0].eventId;
          currentDelayedEvents = currentDelayedEvents.filter(e => e.daysLeft > 0);
        }

        // Cinnet Geçirme Mekaniği
        if (currentStress >= 100 && (state.happiness || 50) <= 0 && Math.random() < 0.2) {
           nextEvent = {
              id: 'e_cinnet',
              title: 'CİNNET GETİRDİN!',
              text: 'Aylardır süren stres, borçlar ve mutsuzluk en sonunda patlamana neden oldu.',
              choices: [{ text: 'Kendime Gelmeliyim...', effects: { money: -(state.money * 0.5), stress: -50, happiness: 10 } }]
           };
           currentDelayedEvents = currentDelayedEvents.map(e => ({ ...e, daysLeft: e.daysLeft + daysToAdvance })); // Gecikmeleri dondur
        } 
        else if (triggeredEventId) {
          nextEvent = EVENTS_2008.find(e => e.id === triggeredEventId) || {
            id: 'error_event', title: 'Hata', text: 'Olay bulunamadı.', choices: [{text:'Geç', effects:{}}]
          };
        } else {
          // Normal Olay Çıkma İhtimali (%45)
          const shouldTriggerEvent = Math.random() < 0.45;
          
          if (shouldTriggerEvent) {
            const encountered = state.encounteredEvents || [];
            const recent = state.recentEvents || [];
            const rootEvents = EVENTS_2008.filter(e => 
              !['e_askerlik_gbt', 'e_ilk_bulusma', 'e_nokia_patlama', 'e_akraba_trip', 'e_karanlik_is_sonuc', 'e_paket_acildi', 'e_otobus_kaza', 'e_canta_acildi'].includes(e.id) &&
              !encountered.includes(e.id) &&
              !recent.includes(e.id)
            );
            nextEvent = EventEngine.selectRandomEvent(rootEvents, state);
          }
        }
      }

      let newState = { ...state, health: currentHealth, hunger: currentHunger, currentEvent: nextEvent, delayedEvents: currentDelayedEvents, isGameOver, gameOverReason, dailyActionCompleted: false };
      
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

      // Haciz Sistemi
      let newInventory = [...(state.inventory || [])];
      let newReputation = state.reputation || 50;
      if (state.bankDebt > 5000 && state.money < 0) {
          newInventory = []; 
          newReputation = 0; 
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

      // Zorunlu Aylık Faturalar (Elektrik, Su, Doğalgaz, Telefon)
      const monthlyBills = Math.round(150 + Math.random() * 100); // 150-250 TL arasi

      // Karşılanmamış İhtiyaç Cezası
      let unmetPenalty = 0;
      if (state.needs.food.current < state.needs.food.target) unmetPenalty += 50; // Yemek borcun
      if (state.needs.rent.current < state.needs.rent.target) unmetPenalty += 200; // Kira gecikme cezası
      if (state.needs.transport.current < state.needs.transport.target) unmetPenalty += 20;

      // Banka Faiz İşlemi (Aylık %8 - tefeci faizi)
      let newBankDebt = state.bankDebt || 0;
      if (newBankDebt > 0) {
        newBankDebt = Math.round(newBankDebt * 1.08);
      }

      // === VADELİ MEVDUAT FAİZİ (Aylık %4) ===
      let newBankSavings = state.bankSavings || 0;
      if (newBankSavings > 0) {
        newBankSavings = Math.round(newBankSavings * 1.04);
      }

      // === BÖLÜM GEÇİŞ KONTROLÜ ===
      const newMonthCount = state.monthCount + 1;
      const newChapterIdx = getCurrentChapterIndex(newMonthCount);
      const oldChapterIdx = state.currentChapter || 0;
      let pendingChapterIntro = state.pendingChapterIntro;
      let newChaptersSeenIntro = [...(state.chaptersSeenIntro || [])];

      if (newChapterIdx > oldChapterIdx && !newChaptersSeenIntro.includes(newChapterIdx)) {
        pendingChapterIntro = newChapterIdx;
      }

      // === NPC TANIŞMA KONTROLÜ ===
      let newMetNpcs = [...(state.metNpcs || [])];
      let newNpcRelationships = { ...(state.npcRelationships || {}) };
      const tempState = { ...state, monthCount: newMonthCount };
      NPCS.forEach(npc => {
        if (!newMetNpcs.includes(npc.id) && npc.introChapter <= newChapterIdx) {
          if (checkNpcIntroCondition(npc, tempState)) {
            newMetNpcs.push(npc.id);
            newNpcRelationships[npc.id] = 40;
          }
        }
      });

      // === KİTAP SONU KONTROLÜ ===
      let bookComplete = false;
      if (newMonthCount > FINAL_MONTH && !isGameOver) {
        isGameOver = true;
        gameOverReason = 'BOOK_COMPLETE';
        bookComplete = true;
      }

      return {
        ...newState,
        day: newDay - 30,
        month: newMonth,
        year: newYear,
        monthCount: newMonthCount,
        salary: newSalary,
        money: state.money + earnedSalary - monthlyBills - unmetPenalty,
        bankDebt: newBankDebt,
        bankSavings: newBankSavings,
        hasWorked: false,
        reputation: newReputation,
        inventory: newInventory,
        currentChapter: newChapterIdx,
        pendingChapterIntro,
        chaptersSeenIntro: newChaptersSeenIntro,
        metNpcs: newMetNpcs,
        npcRelationships: newNpcRelationships,
        isGameOver,
        gameOverReason,
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

    // === YAŞAYAN ROMAN REDUCER'LARI ===
    case 'ADD_BOOK_PAGE': {
      const { content, chapter } = action.payload;
      const pageNum = (state.bookPages?.length || 0) + 1;
      const newPage = {
        pageNum,
        content,
        chapter,
        monthCount: state.monthCount,
        day: state.day,
        year: state.year,
        month: state.month
      };
      return {
        ...state,
        bookPages: [...(state.bookPages || []), newPage]
      };
    }

    case 'MARK_CHAPTER_SEEN': {
      const chapterIdx = action.payload;
      return {
        ...state,
        chaptersSeenIntro: [...(state.chaptersSeenIntro || []), chapterIdx],
        pendingChapterIntro: null
      };
    }

    case 'MEET_NPC': {
      const npcId = action.payload;
      if ((state.metNpcs || []).includes(npcId)) return state;
      return {
        ...state,
        metNpcs: [...(state.metNpcs || []), npcId],
        npcRelationships: {
          ...state.npcRelationships,
          [npcId]: 40 // İlk tanışmada 40'dan başlar
        }
      };
    }

    case 'UPDATE_NPC_RELATIONSHIP': {
      const { npcId, change } = action.payload;
      const currentRel = state.npcRelationships?.[npcId] || 0;
      return {
        ...state,
        npcRelationships: {
          ...state.npcRelationships,
          [npcId]: Math.max(0, Math.min(100, currentRel + change))
        }
      };
    }

    case 'INTERACT_NPC': {
      const { npcId } = action.payload;
      const energyCost = 15;
      
      if (state.energy < energyCost || state.dailyActionCompleted) return state;

      const currentRel = state.npcRelationships?.[npcId] || 0;
      return {
        ...state,
        energy: state.energy - energyCost,
        dailyActionCompleted: true, // Efor harcandı
        npcRelationships: {
          ...state.npcRelationships,
          [npcId]: Math.max(0, Math.min(100, currentRel + 2))
        }
      };
    }

    case 'DEPOSIT_MONEY': {
      const amount = action.payload;
      if (amount > state.money) return state;
      return {
        ...state,
        money: state.money - amount,
        bankSavings: (state.bankSavings || 0) + amount
      };
    }

    case 'WITHDRAW_MONEY': {
      const amount = action.payload;
      if (amount > (state.bankSavings || 0)) return state;
      return {
        ...state,
        money: state.money + amount,
        bankSavings: (state.bankSavings || 0) - amount
      };
    }

    case 'NEW_GAME': {
      const customProfileData = action.payload; // { storyId, name, gender, country }
      let newCharData = null;
      if (customProfileData) {
        newCharData = generateCharacterProfile(
          customProfileData.storyId,
          customProfileData.name,
          customProfileData.gender,
          customProfileData.country
        );
      }
      return { ...getInitialState(newCharData), hasSeenTutorial: state.hasSeenTutorial, loaded: true };
    }

    default:
      return state;
  }
}

// Context
const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, getInitialState);
  const [cachedAiEvent, setCachedAiEvent] = useState(null);
  const [cachedRunId, setCachedRunId] = useState(null);
  const [isFetchingAi, setIsFetchingAi] = useState(false);
  const [isGeneratingPage, setIsGeneratingPage] = useState(false);
  const prevDayRef = useRef(null);

  // Arka planda Kitap Sayfası (Günlük Paragraf) Oluşturma
  useEffect(() => {
    if (!state?.loaded || !state.isCharacterCreated || state.isGameOver) return;
    
    // Eğer gün değiştiyse yeni sayfa yazdır
    if (prevDayRef.current !== null && prevDayRef.current !== state.day && !isGeneratingPage) {
      const pageNeedsGen = state.bookPages?.length < (state.monthCount * 30 + state.day);
      if (pageNeedsGen) {
        setIsGeneratingPage(true);
        // O gün yaşanan bir olay varsa bul (şu an basitçe null geçiyoruz, event geldiğinde bookPage'e eklenebilir)
        const dailyEvent = state.lastEvent?.day === state.day ? state.lastEvent : null;
        
        AIStoryteller.generateBookPage(state, dailyEvent).then(content => {
          if (content) {
            dispatch({ type: 'ADD_BOOK_PAGE', payload: { content, chapter: state.currentChapter } });
          }
          setIsGeneratingPage(false);
        }).catch(err => {
          console.log('Book page gen error:', err);
          setIsGeneratingPage(false);
        });
      }
    }
    prevDayRef.current = state.day;
  }, [state?.day, state?.loaded, state?.isCharacterCreated, state?.isGameOver]);

  // Arka planda AI Senaryosu Hazırlama (Prefetching)
  useEffect(() => {
    // Yeni oyuna geçilmişse eski önbelleği temizle
    if (state?.runId && cachedRunId !== state.runId) {
      setCachedAiEvent(null);
      setCachedRunId(state.runId);
      return;
    }

    if (state?.loaded && state.isCharacterCreated && !cachedAiEvent && !isFetchingAi && !state.isGameOver) {
      setIsFetchingAi(true);
      AIStoryteller.generateDynamicEvent(state).then(ev => {
        if (ev && ev.id !== 'ai_fallback') {
          setCachedAiEvent(ev);
        }
        setIsFetchingAi(false);
      }).catch(err => {
        console.log('AI Prefetch error:', err);
        setIsFetchingAi(false);
      });
    }
  }, [state?.monthCount, state?.loaded, state?.isCharacterCreated, cachedAiEvent, isFetchingAi, state?.isGameOver]);

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
        hunger: gameState.hunger || 0,
        wantedLevel: gameState.wantedLevel || 0,
        reputation: gameState.reputation ?? 50,
        inventory: gameState.inventory || [],
        skills: gameState.skills || [],
        bankDebt: gameState.bankDebt || 0,
        creditScore: gameState.creditScore || 1200,
        isGameOver: gameState.isGameOver || false,
        gameOverReason: gameState.gameOverReason || '',
        delayedEvents: gameState.delayedEvents || [],
        encounteredEvents: gameState.encounteredEvents || [],
        recentEvents: gameState.recentEvents || [],
        memories: gameState.memories || [],
        lastEvent: gameState.lastEvent,
        runId: gameState.runId,
        needs: gameState.needs,
        portfolio: gameState.portfolio,
        year: gameState.year,
        month: gameState.month,
        monthCount: gameState.monthCount,
        isCharacterCreated: gameState.isCharacterCreated,
        profile: gameState.profile,
        hiddenStats: gameState.hiddenStats,
        experience: gameState.experience || { job: 0, finance: 0, education: 0, health: 0, social: 0, happiness: 0, prestige_neighborhood: 0, prestige_city: 0, prestige_country: 0 },
        hunger: gameState.hunger,
        social: gameState.social,
        currentProducts: gameState.currentProducts.map(p => ({ id: p.id, price: p.price })),
        currentStocks: gameState.currentStocks.map(s => ({
          id: s.id, currentPrice: s.currentPrice, monthlyChangePercent: s.monthlyChangePercent,
        })),
        transactions: gameState.transactions.slice(-50),
        stats: gameState.stats,
        // === Yaşayan Roman ===
        bookPages: gameState.bookPages || [],
        currentChapter: gameState.currentChapter || 0,
        chaptersSeenIntro: gameState.chaptersSeenIntro || [],
        pendingChapterIntro: gameState.pendingChapterIntro,
        npcRelationships: gameState.npcRelationships || {},
        metNpcs: gameState.metNpcs || [],
        bankSavings: gameState.bankSavings || 0,
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
              isCharacterCreated: true, // Yüklendiyse karakter vardır
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

  // Asenkron zaman ilerletme (AI Olayı entegrasyonu için)
  const advanceTimeAsync = useCallback(async (days) => {
    // Önce yeni ay/yıl durumuna bak
    const willCrossYear = (state.day + days > 30) && (state.month + 1 >= 12);
    
    // Rastgele AI olayı çıkma ihtimali (Aylık/Haftalık atlamalarda %25 ihtimal)
    const randomAiChance = !willCrossYear && Math.random() < 0.25;
    
    if (willCrossYear || randomAiChance) {
      if (cachedAiEvent) {
        // Hazırda bekleyen AI olayı varsa ANINDA ekrana ver, bekletme!
        dispatch({ type: 'ADVANCE_TIME', payload: { days, injectedEvent: cachedAiEvent } });
        setCachedAiEvent(null); // Yenisini arka planda hazırlamaya başla
      } else {
        // Henüz hazır değilse, oyuncuyu bekletmemek için normal devam et
        dispatch({ type: 'ADVANCE_TIME', payload: { days } });
      }
    } else {
      // Normal ilerleme
      dispatch({ type: 'ADVANCE_TIME', payload: { days } });
    }
  }, [state, dispatch, cachedAiEvent]);

  const value = {
    state,
    dispatch,
    allNeedsMet,
    getMonthName,
    getPortfolioValue,
    advanceTimeAsync,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
