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

const TABS = [
  { id: 'shopping', label: 'Alışveriş', icon: '🛒' },
  { id: 'work', label: 'İş', icon: '💼' },
  { id: 'investment', label: 'Yatırım', icon: '📈' },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState('shopping');
  const { state, dispatch, allNeedsMet, getMonthName } = useGame();

  if (!state.loaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ecc71" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  const handleAdvanceMonth = () => {
    if (!allNeedsMet) return;
    if (Platform.OS === 'web') {
      if (window.confirm(`${getMonthName()} ${state.year} ayını tamamlayıp sonraki aya geçmek istiyor musunuz?\n\nFiyatlar ve yatırım değerleri değişecek.`)) {
        dispatch({ type: 'ADVANCE_MONTH' });
      }
    } else {
      Alert.alert(
        '📅 Ay Geçişi',
        `${getMonthName()} ${state.year} ayını tamamlayıp sonraki aya geçmek istiyor musunuz?\n\nFiyatlar ve yatırım değerleri değişecek.`,
        [
          { text: 'İptal', style: 'cancel' },
          { text: 'Onayla', onPress: () => dispatch({ type: 'ADVANCE_MONTH' }) },
        ]
      );
    }
  };

  const handleNewGame = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Mevcut oyununuz silinecek ve yeni bir oyun başlatılacak. Emin misiniz?')) {
        dispatch({ type: 'NEW_GAME' });
      }
    } else {
      Alert.alert(
        '🔄 Yeni Oyun',
        'Mevcut oyununuz silinecek ve yeni bir oyun başlatılacak. Emin misiniz?',
        [
          { text: 'İptal', style: 'cancel' },
          { text: 'Yeni Oyun', style: 'destructive', onPress: () => dispatch({ type: 'NEW_GAME' }) },
        ]
      );
    }
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
      case 'investment': return <InvestmentScreen />;
      default: return null;
    }
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

          {/* İhtiyaç Takibi */}
          <NeedsTracker />

          {/* Ay Geçiş Butonu */}
          <View style={styles.advanceSection}>
            <TouchableOpacity
              style={[styles.advanceBtn, allNeedsMet ? styles.advanceBtnActive : styles.advanceBtnDisabled]}
              onPress={handleAdvanceMonth}
              disabled={!allNeedsMet}
              activeOpacity={0.7}
            >
              <Text style={styles.advanceBtnText}>📅 Sonraki Aya Geç</Text>
            </TouchableOpacity>
            <Text style={styles.advanceStatus}>
              {allNeedsMet
                ? '✅ Tüm ihtiyaçlar karşılandı!'
                : `⏳ Eksik: ${getRemainingNeeds().join(', ')}`}
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
    gap: 6,
    paddingVertical: 10,
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
    fontSize: 13,
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
  advanceBtn: {
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
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
    fontSize: 16,
  },
  advanceStatus: {
    textAlign: 'center',
    fontSize: 13,
    color: '#7f8c8d',
    fontWeight: '600',
    marginTop: 6,
  },
  newGameSection: {
    padding: 16,
    alignItems: 'center',
  },
  newGameBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 50,
    backgroundColor: 'rgba(231,76,60,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(231,76,60,0.2)',
  },
  newGameBtnText: {
    color: '#e74c3c',
    fontWeight: '700',
    fontSize: 14,
  },
});
