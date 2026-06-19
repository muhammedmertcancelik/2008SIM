import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useGame } from '../state/GameContext';
import { formatMoneyFull } from '../utils/formatter';

export default function BankScreen() {
  const { state, dispatch } = useGame();
  
  const handleTakeLoan = (amount) => {
    if (state.creditScore < 800) {
      Alert.alert('Kredi Reddedildi', 'Kredi notunuz çok düşük. Banka size kredi vermiyor.');
      return;
    }
    dispatch({ type: 'TAKE_LOAN', payload: { amount } });
    Alert.alert('Kredi Onaylandı', `${formatMoneyFull(amount)} hesabınıza yattı.`);
  };

  const handlePayDebt = (amount) => {
    if (state.money < amount) {
      Alert.alert('Yetersiz Bakiye', 'Bu ödemeyi yapmak için yeterli paranız yok.');
      return;
    }
    if (state.bankDebt <= 0) {
      Alert.alert('Hata', 'Borcunuz bulunmuyor.');
      return;
    }
    dispatch({ type: 'PAY_DEBT', payload: { amount } });
  };

  return (
    <View style={styles.container}>
      {/* Kredi Notu ve Borç Durumu */}
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={styles.titleIcon}>🏦</Text>
          <Text style={styles.titleText}>Banka Şubesi</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Kredi Notu (Findeks)</Text>
            <Text style={[styles.statValue, { color: state.creditScore < 1000 ? '#e74c3c' : '#2ecc71' }]}>
              {state.creditScore}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Toplam Borç</Text>
            <Text style={[styles.statValue, { color: '#e74c3c' }]}>
              {formatMoneyFull(state.bankDebt || 0)}
            </Text>
          </View>
        </View>
        <Text style={styles.infoText}>💡 Ay sonlarında borcunuza %5 faiz biner. Borç ödedikçe kredi notunuz artar.</Text>
      </View>

      {/* Kredi Çekme */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💳 İhtiyaç Kredisi Çek</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleTakeLoan(1000)}>
            <Text style={styles.actionBtnText}>1.000 TL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleTakeLoan(5000)}>
            <Text style={styles.actionBtnText}>5.000 TL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleTakeLoan(10000)}>
            <Text style={styles.actionBtnText}>10.000 TL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleTakeLoan(50000)}>
            <Text style={styles.actionBtnText}>50.000 TL</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Borç Ödeme */}
      {state.bankDebt > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💰 Borç Öde</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionBtn, styles.payBtn]} onPress={() => handlePayDebt(Math.min(500, state.bankDebt))}>
              <Text style={styles.actionBtnText}>Asgari (500 TL)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.payBtn]} onPress={() => handlePayDebt(state.bankDebt)}>
              <Text style={styles.actionBtnText}>Tamamını Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  card: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(52, 152, 219, 0.25)',
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  titleIcon: { fontSize: 20 },
  titleText: { fontSize: 18, fontWeight: '900', color: '#ecf0f1' },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 },
  statItem: { alignItems: 'center' },
  statLabel: { fontSize: 11, fontWeight: '600', color: '#95a5a6', marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '800' },
  divider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.15)' },
  infoText: { fontSize: 11, color: '#95a5a6', textAlign: 'center', marginTop: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#ecf0f1', marginBottom: 10 },
  buttonRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  actionBtn: {
    flex: 1, backgroundColor: '#3498db', paddingVertical: 12, borderRadius: 10, alignItems: 'center',
  },
  payBtn: { backgroundColor: '#2ecc71' },
  actionBtnText: { color: 'white', fontWeight: '800', fontSize: 13 },
});
