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
import { GameProvider, useGame } from './src/state/GameContext';
import Header from './src/components/Header';
import NeedsTracker from './src/components/NeedsTracker';
import ShoppingScreen from './src/screens/ShoppingScreen';
import WorkScreen from './src/screens/WorkScreen';
import InvestmentScreen from './src/screens/InvestmentScreen';
import BankScreen from './src/screens/BankScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProfileCard from './src/components/ProfileCard';

const TABS = [
  { id: 'shopping', label: 'Alışveriş', icon: '🛒' },
  { id: 'work', label: 'İş', icon: '💼' },
  { id: 'bank', label: 'Banka', icon: '🏦' },
  { id: 'life', label: 'Hayat', icon: '🏠' },
  { id: 'investment', label: 'Borsa', icon: '📈' },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState('shopping');
  const [confirmDialog, setConfirmDialog] = useState(null);
  const { state, dispatch, allNeedsMet, getMonthName } = useGame();

  if (!state.loaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ecc71" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  const handleAdvanceTime = (days) => {
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
        dispatch({ type: 'ADVANCE_TIME', payload: { days } });
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleNewGame = () => {
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
      case 'bank': return <BankScreen />;
      case 'life': return <ProfileScreen />;
      case 'investment': return <InvestmentScreen />;
      case 'expenses': return <NeedsTracker />;
      default: return null;
    }
  };

  const handleChoice = (choice) => {
    dispatch({ type: 'MAKE_CHOICE', payload: choice });
  };

  return (
    <ImageBackground
      source={require('./assets/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <ScrollView
          style={styles.contentView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Header />

          {/* Profil Kartı (Enerji & Stres) */}
          <ProfileCard />

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tabBtn, activeTab === tab.id && styles.tabBtnActive]}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>


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
            </View>
            <Text style={styles.advanceStatus}>
              {state.day <= 30 && !allNeedsMet
                ? `Maaş gününe ${30 - state.day} gün kaldı.` 
                : (allNeedsMet ? '✅ Tüm ihtiyaçlar karşılandı, ay bitebilir.' : `⏳ Eksik İhtiyaçlar: ${getRemainingNeeds().join(', ')}`)}
            </Text>
          </View>

          {/* Tab İçeriği */}
          {renderTabContent()}

          {/* Yeni Oyun */}
          <View style={styles.newGameSection}>
            <TouchableOpacity style={styles.newGameBtn} onPress={handleNewGame} activeOpacity={0.7}>
              <Text style={styles.newGameBtnText}>🔄 Yeni Oyun</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Olay (Event) Modal */}
        {state.currentEvent && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
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
            </View>
          </View>
        )}

        {/* Custom Confirm Modal */}
        {confirmDialog && !state.currentEvent && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{confirmDialog.title}</Text>
              <Text style={styles.modalText}>{confirmDialog.message}</Text>
              <View style={{flexDirection: 'row', gap: 12}}>
                <TouchableOpacity 
                  style={[styles.modalChoiceBtn, {flex: 1, backgroundColor: '#bdc3c7'}]} 
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
            </View>
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
  },
  safeArea: {
    flex: 1,
  },
  contentView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f0',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#7f8c8d',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 50,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 50,
  },
  tabBtnActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  tabIcon: {
    fontSize: 14,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7f8c8d',
  },
  tabLabelActive: {
    color: '#2c3e50',
  },
  advanceSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  timeButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  advanceBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
  },
  advanceBtnActive: {
    backgroundColor: '#2ecc71',
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  advanceBtnDisabled: {
    backgroundColor: '#bdc3c7',
  },
  advanceBtnText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 14,
  },
  advanceStatus: {
    textAlign: 'center',
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '600',
    marginTop: 6,
  },
  newGameSection: {
    padding: 12,
    alignItems: 'center',
  },
  newGameBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(231,76,60,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(231,76,60,0.2)',
  },
  newGameBtnText: {
    color: '#e74c3c',
    fontWeight: '700',
    fontSize: 12,
  },
  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', alignItems: 'center', zIndex: 999,
  },
  modalContent: {
    backgroundColor: 'white', width: '90%', borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: '900', color: '#2c3e50', marginBottom: 8, textAlign: 'center' },
  modalText: { fontSize: 14, color: '#34495e', lineHeight: 20, marginBottom: 16, textAlign: 'center' },
  modalChoices: { gap: 8 },
  modalChoiceBtn: {
    backgroundColor: '#3498db', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, alignItems: 'center',
  },
  modalChoiceText: { color: 'white', fontWeight: '700', fontSize: 13, textAlign: 'center' },
});
