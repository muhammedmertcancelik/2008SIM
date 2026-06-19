// ============================================
// ANA UYGULAMA — App.js
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { GameProvider, useGame } from './src/state/GameContext';
import { SoundManager } from './src/utils/SoundManager';
import Header from './src/components/Header';
import NeedsTracker from './src/components/NeedsTracker';
import ShoppingScreen from './src/screens/ShoppingScreen';
import WorkScreen from './src/screens/WorkScreen';
import InvestmentScreen from './src/screens/InvestmentScreen';
import BankScreen from './src/screens/BankScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProfileCard from './src/components/ProfileCard';
import CityScreen from './src/screens/CityScreen';
import QuestScreen from './src/screens/QuestScreen';

import CharacterCreationScreen from './src/screens/CharacterCreationScreen';
import DiaryScreen from './src/screens/DiaryScreen';

const TABS = [
  { id: 'shopping', label: 'Alışveriş', icon: '🛒' },
  { id: 'work', label: 'İş', icon: '💼' },
  { id: 'city', label: 'Şehir', icon: '🌆' },
  { id: 'bank', label: 'Banka', icon: '🏦' },
  { id: 'life', label: 'Hayat', icon: '🏠' },
  { id: 'investment', label: 'Borsa', icon: '📈' },
  { id: 'quests', label: 'Görevler', icon: '🎯' },
  { id: 'diary', label: 'Günlük', icon: '📖' },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState('shopping');
  const [confirmDialog, setConfirmDialog] = useState(null);
  const { state, dispatch, allNeedsMet, getMonthName, advanceTimeAsync } = useGame();

  React.useEffect(() => {
    SoundManager.init();
  }, []);

  if (!state.loaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ecc71" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  if (state.isGeneratingEvent) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9b59b6" />
        <Text style={styles.loadingText}>Yapay Zeka Kaderini Yazıyor...</Text>
        <Text style={{color: '#7f8c8d', marginTop: 10, fontSize: 12}}>Lütfen bekleyin</Text>
      </View>
    );
  }

  if (!state.isCharacterCreated) {
    return (
      <CharacterCreationScreen 
        onComplete={(profileData) => {
          dispatch({ type: 'NEW_GAME', payload: profileData });
        }}
      />
    );
  }

  const handleAdvanceTime = (days) => {
    SoundManager.playClick();
    if (state.day + days > 30 && !allNeedsMet) {
      if (Platform.OS !== 'web') {
        Alert.alert('Eksik İhtiyaçlar', 'Aya geçmeden önce tüm ihtiyaçlarınızı (Yiyecek, Kira, Ulaşım) karşılamalısınız.');
      } else {
        alert('Eksik İhtiyaçlar: Aya geçmeden önce tüm ihtiyaçlarınızı (Yiyecek, Kira, Ulaşım) karşılamalısınız.');
      }
      return;
    }

    const label = days === 1 ? '1 Gün' : '7 Gün';
    setConfirmDialog({
      title: 'Zaman İlerlemesi',
      message: `${label} ilerlemek istiyor musunuz?`,
      onConfirm: () => {
        advanceTimeAsync(days);
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleNewGame = () => {
    SoundManager.playClick();
    setConfirmDialog({
      title: '🔄 Yeni Oyun',
      message: 'Mevcut oyununuz silinecek ve yeni bir oyun başlatılacak. Emin misiniz?',
      onConfirm: () => {
        dispatch({ type: 'NEW_GAME' });
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const getRemainingNeeds = () => {
    const remaining = [];
    if (state.needs.food.current < state.needs.food.target) remaining.push('Yiyecek');
    if (state.needs.transport.current < state.needs.transport.target) remaining.push('Ulaşım');
    if (state.needs.rent.current < state.needs.rent.target) remaining.push('Kira');
    return remaining;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'shopping': return <ShoppingScreen />;
      case 'work': return <WorkScreen />;
      case 'city': return <CityScreen />;
      case 'bank': return <BankScreen />;
      case 'life': return <ProfileScreen />;
      case 'investment': return <InvestmentScreen />;
      case 'quests': return <QuestScreen />;
      case 'expenses': return <NeedsTracker />;
      case 'diary': return <DiaryScreen />;
      default: return null;
    }
  };

  const getThemeOverlay = () => {
    if (state.bankDebt > state.money && state.money < 0) {
      return { backgroundColor: 'rgba(231, 76, 60, 0.25)' }; // Kırmızımsı (Borçlu)
    } else if (state.money > 50000) {
      return { backgroundColor: 'rgba(241, 196, 15, 0.15)' }; // Altın (Zengin)
    } else if (state.money > 5000) {
      return { backgroundColor: 'rgba(52, 152, 219, 0.15)' }; // Mavi (Orta)
    } else {
      return { backgroundColor: 'rgba(127, 140, 141, 0.15)' }; // Gri (Fakir)
    }
  };
  const handleChoice = (choice) => {
    dispatch({ type: 'MAKE_CHOICE', payload: choice });
  };

  const getBackgroundImage = () => {
    switch(activeTab) {
      case 'shopping': return require('./assets/bg_shopping.png');
      case 'work': return require('./assets/bg_work.png');
      case 'city': return require('./assets/bg_city.png');
      case 'bank': return require('./assets/bg_bank.png');
      case 'investment': return require('./assets/bg_investment.png');
      case 'quests': return require('./assets/bg_quests.png');
      case 'diary': return require('./assets/bg_diary.png');
      case 'life':
      default: return require('./assets/cozy_bg.png');
    }
  };

  return (
    <ImageBackground source={getBackgroundImage()} style={styles.background} resizeMode="cover">
      <View style={styles.darkOverlay} />
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

        {/* ÜST BÖLÜM (Sabit) - GLASSMORPHISM */}
        <BlurView intensity={50} tint="dark" style={styles.topSection}>
          <Header />
          <ProfileCard />
          
          {/* Zaman Geçiş Butonları */}
          <View style={styles.advanceSection}>
            <View style={styles.timeButtonsRow}>
              <TouchableOpacity
                style={[styles.advanceBtn, (state.day + 1 <= 30 || allNeedsMet) ? styles.advanceBtnActive : styles.advanceBtnDisabled]}
                onPress={() => handleAdvanceTime(1)}
                disabled={state.day + 1 > 30 && !allNeedsMet}
                activeOpacity={0.7}
              >
                <Text style={styles.advanceBtnText}>+1 Gün</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.advanceBtn, (state.day + 7 <= 30 || allNeedsMet) ? styles.advanceBtnActive : styles.advanceBtnDisabled]}
                onPress={() => handleAdvanceTime(7)}
                disabled={state.day + 7 > 30 && !allNeedsMet}
                activeOpacity={0.7}
              >
                <Text style={styles.advanceBtnText}>+7 Gün</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.newGameBtn} onPress={handleNewGame} activeOpacity={0.7}>
                <Text style={styles.newGameBtnText}>🔄</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.advanceStatus}>
              {state.day <= 30 && !allNeedsMet
                ? `Maaş gününe ${30 - state.day} gün kaldı.` 
                : (allNeedsMet ? '✅ Tüm ihtiyaçlar karşılandı.' : `⏳ Eksik: ${getRemainingNeeds().join(', ')}`)}
            </Text>
          </View>
        </BlurView>

        {/* ORTA BÖLÜM (Kaydırılabilir İçerik) */}
        <ScrollView
          style={styles.contentArea}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {renderTabContent()}
          <View style={{ height: 90 }} />
        </ScrollView>

        {/* ALT BÖLÜM (Sabit Tab Bar) - GLASSMORPHISM */}
        <View style={styles.tabContainer}>
          <BlurView intensity={70} tint="dark" style={styles.bottomTabBar}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  style={[styles.bottomTab, isActive && styles.bottomTabActive]}
                  onPress={() => {
                    SoundManager.playClick();
                    setActiveTab(tab.id);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.bottomTabIcon, isActive && styles.bottomTabIconActive]}>{tab.icon}</Text>
                  <Text style={[styles.bottomTabLabel, isActive && styles.bottomTabLabelActive]}>
                    {tab.label}
                  </Text>
                  {isActive && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
              );
            })}
          </BlurView>
        </View>

        {/* Olay (Event) Modal */}
        {state.currentEvent && (
          <View style={styles.modalOverlay}>
            <BlurView intensity={80} tint="dark" style={styles.modalContent}>
              <Text style={styles.modalTitle}>{state.currentEvent.title}</Text>
              <Text style={styles.modalText}>{state.currentEvent.text}</Text>
              <View style={styles.modalChoices}>
                {state.currentEvent.choices.map((choice, idx) => (
                  <TouchableOpacity 
                    key={idx} 
                    style={styles.modalChoiceBtn} 
                    onPress={() => handleChoice(choice)}
                  >
                    <Text style={styles.modalChoiceText}>{choice.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </BlurView>
          </View>
        )}

        {/* Confirm Modal */}
        {confirmDialog && !state.currentEvent && (
          <View style={styles.modalOverlay}>
            <BlurView intensity={80} tint="dark" style={styles.modalContent}>
              <Text style={styles.modalTitle}>{confirmDialog.title}</Text>
              <Text style={styles.modalText}>{confirmDialog.message}</Text>
              <View style={{flexDirection: 'row', gap: 12}}>
                <TouchableOpacity 
                  style={[styles.modalChoiceBtn, {flex: 1, backgroundColor: '#7f8c8d'}]} 
                  onPress={confirmDialog.onCancel}
                >
                  <Text style={styles.modalChoiceText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalChoiceBtn, {flex: 1, backgroundColor: '#2ecc71'}]} 
                  onPress={confirmDialog.onConfirm}
                >
                  <Text style={styles.modalChoiceText}>Onayla</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1b1b1b', // Fallback
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 15, 30, 0.3)', // Hafif sıcak gece mavisi filtresi
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 25 : 40,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  contentArea: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b132b',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#00e5ff', // Cyan
  },
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomTabBar: {
    flexDirection: 'row',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomWidth: 0,
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  bottomTabActive: {},
  bottomTabIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  bottomTabIconActive: {
    opacity: 1,
    fontSize: 22,
  },
  bottomTabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#a8b0c3', // Soft pastel blue/grey
    marginTop: 4,
  },
  bottomTabLabelActive: {
    color: '#ffcda3', // Soft warm peach/brown
    fontWeight: '800',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffcda3', // Soft warm peach
    shadowColor: '#ffcda3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  advanceSection: {
    paddingHorizontal: 12,
    marginTop: 4,
  },
  timeButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  advanceBtn: {
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  advanceBtnActive: {
    backgroundColor: 'rgba(255, 205, 163, 0.2)', // Soft peach transparent
    borderColor: 'rgba(255, 205, 163, 0.4)',
  },
  advanceBtnDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  advanceBtnText: {
    color: '#ffcda3', // Soft peach
    fontWeight: '800',
    fontSize: 13,
  },
  advanceStatus: {
    textAlign: 'center',
    fontSize: 11,
    color: '#a8b0c3',
    fontWeight: '500',
    marginTop: 4,
  },
  newGameBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newGameBtnText: {
    fontSize: 16,
  },
  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(10, 15, 25, 0.6)',
    justifyContent: 'center', alignItems: 'center', zIndex: 999,
  },
  modalContent: {
    width: '85%', borderRadius: 30, padding: 24,
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
  },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#ffcda3', marginBottom: 12, textAlign: 'center' },
  modalText: { fontSize: 15, color: '#f5f7f2', lineHeight: 24, marginBottom: 20, textAlign: 'center' },
  modalChoices: { gap: 12 },
  modalChoiceBtn: {
    backgroundColor: 'rgba(255, 205, 163, 0.2)', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 20, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255, 205, 163, 0.5)',
  },
  modalChoiceText: { color: '#ffcda3', fontWeight: '800', fontSize: 15, textAlign: 'center' },
});


