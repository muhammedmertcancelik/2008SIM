// ============================================
// İŞ EKRANI
// ============================================

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useGame } from '../state/GameContext';
import { formatMoney, formatMoneyFull } from '../utils/formatter';

export default function WorkScreen() {
  const { state, dispatch } = useGame();

  const handleWork = () => {
    dispatch({ type: 'WORK' });
  };

  let statusText, statusStyle;
  const energy = state.energy ?? 100;
  const stress = state.stress ?? 0;
  const canWork = energy >= 20 && stress <= 80;

  if (!state.hasWorked) {
    if (!canWork) {
      statusText = '🚫 Enerjiniz çok düşük veya stresiniz çok yüksek! Marketten yiyecek/eğlence alarak kendinize gelin.';
      statusStyle = styles.statusError;
    } else {
      statusText = '💼 Çalışmaya hazırsınız. Bu ayki mesainizi tamamlamak için butona tıklayın!';
      statusStyle = styles.statusWaiting;
    }
  } else {
    statusText = '✅ Bu ayki mesainizi tamamladınız. Maaşınız ay sonunda yatar.';
    statusStyle = styles.statusDone;
  }

  return (
    <View style={styles.container}>
      {/* Çalış & Kazan Kartı */}
      <View style={styles.workCard}>
        <View style={styles.titleRow}>
          <Text style={styles.titleIcon}>💼</Text>
          <Text style={styles.titleText}>Çalış & Kazan</Text>
        </View>

        {/* İş bilgisi */}
        <View style={styles.jobInfoRow}>
          <View style={styles.jobInfoItem}>
            <Text style={styles.jobInfoLabel}>Meslek</Text>
            <Text style={styles.jobInfoValue}>{state.job}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.jobInfoItem}>
            <Text style={styles.jobInfoLabel}>Aylık Maaş</Text>
            <Text style={styles.jobInfoValue}>{formatMoneyFull(state.salary)}</Text>
          </View>
        </View>

        {/* Durum mesajı */}
        <View style={[styles.statusBox, statusStyle]}>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>

        {/* Rastgele Olay Mesajı */}
        {state.lastEvent && (
          <View style={styles.eventBox}>
            <Text style={styles.eventText}>{state.lastEvent}</Text>
          </View>
        )}

        {/* Çalış butonu */}
        <TouchableOpacity
          style={[styles.workBtn, (state.hasWorked || !canWork) && styles.btnDisabled]}
          onPress={handleWork}
          disabled={state.hasWorked || !canWork}
          activeOpacity={0.7}
        >
          <Text style={styles.workBtnText}>
            {state.hasWorked ? '✅ Bu Ay Çalışıldı' : '🔨 Bu Ay Çalış'}
          </Text>
        </TouchableOpacity>

        {/* Bilgi Mesajı */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>💡 Maaşınız ay sonu (30. Gün bitiminde) otomatik olarak bakiyenize eklenir. Maaşı almak için ay içinde bir kez mesai yapmanız yeterlidir.</Text>
        </View>
      </View>

      {/* İstatistikler */}
      {state.stats.monthsPlayed > 0 && (
        <View style={styles.statsCard}>
          <View style={styles.statsTitleRow}>
            <Text style={styles.statsIcon}>📋</Text>
            <Text style={styles.statsTitle}>İş İstatistikleri</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Toplam Kazanç</Text>
            <Text style={[styles.statValue, { color: '#2ecc71' }]}>{formatMoneyFull(state.stats.totalEarned)}</Text>
          </View>
          <View style={[styles.statRow, styles.statRowBorder]}>
            <Text style={styles.statLabel}>Toplam Harcama</Text>
            <Text style={[styles.statValue, { color: '#e74c3c' }]}>{formatMoneyFull(state.stats.totalSpent)}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Oynanan Ay</Text>
            <Text style={[styles.statValue, { color: '#3498db' }]}>{state.stats.monthsPlayed}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  workCard: {
    backgroundColor: '#eafaf1',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(46,204,113,0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
  },
  titleIcon: { fontSize: 18 },
  titleText: { fontSize: 18, fontWeight: '900', color: '#2c3e50' },
  jobInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  jobInfoItem: { alignItems: 'center' },
  jobInfoLabel: { fontSize: 10, fontWeight: '600', color: '#7f8c8d' },
  jobInfoValue: { fontSize: 14, fontWeight: '800', color: '#2c3e50' },
  divider: { width: 1, height: 24, backgroundColor: 'rgba(0,0,0,0.1)' },
  statusBox: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  statusWaiting: { backgroundColor: 'rgba(243,156,18,0.1)' },
  statusReady: { backgroundColor: 'rgba(46,204,113,0.1)' },
  statusDone: { backgroundColor: 'rgba(0,0,0,0.05)' },
  statusError: { backgroundColor: 'rgba(231,76,60,0.1)' },
  statusText: { fontSize: 13, fontWeight: '700', color: '#2c3e50', textAlign: 'center', lineHeight: 18 },
  eventBox: {
    backgroundColor: '#fff3cd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107'
  },
  eventText: { fontSize: 12, fontWeight: '600', color: '#856404' },
  infoBox: {
    padding: 10, backgroundColor: 'rgba(52, 152, 219, 0.1)', borderRadius: 8, marginTop: 4,
  },
  infoText: {
    fontSize: 11, color: '#2980b9', fontWeight: '600', lineHeight: 16,
  },
  workBtn: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  workBtnText: { color: 'white', fontWeight: '800', fontSize: 14 },
  btnDisabled: { backgroundColor: '#bdc3c7', shadowOpacity: 0, elevation: 0 },
  statsCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statsTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  statsIcon: { fontSize: 14 },
  statsTitle: { fontSize: 14, fontWeight: '800', color: '#2c3e50' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  statRowBorder: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.06)' },
  statLabel: { fontSize: 12, fontWeight: '600', color: '#7f8c8d' },
  statValue: { fontSize: 12, fontWeight: '800' },
});
