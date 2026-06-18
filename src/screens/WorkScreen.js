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

  const handleCollectSalary = () => {
    dispatch({ type: 'COLLECT_SALARY' });
  };

  let statusText, statusStyle;
  if (!state.hasWorked) {
    statusText = '💼 Çalışmaya hazırsınız. Çalış butonuna basın!';
    statusStyle = styles.statusWaiting;
  } else if (!state.hasPaid) {
    statusText = '🎉 Harika! Çalışmanız tamamlandı. Maaşınızı alabilirsiniz!';
    statusStyle = styles.statusReady;
  } else {
    statusText = '✅ Bu ay çalıştınız ve maaşınızı aldınız. İyi harcamalar!';
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

        {/* Çalış butonu */}
        <TouchableOpacity
          style={[styles.workBtn, state.hasWorked && styles.btnDisabled]}
          onPress={handleWork}
          disabled={state.hasWorked}
          activeOpacity={0.7}
        >
          <Text style={styles.workBtnText}>
            {state.hasWorked ? '✅ Çalışma Tamamlandı' : '🔨 Çalış'}
          </Text>
        </TouchableOpacity>

        {/* Maaş al butonu */}
        <TouchableOpacity
          style={[
            styles.salaryBtn,
            (!state.hasWorked || state.hasPaid) ? styles.btnDisabled : styles.salaryBtnActive,
          ]}
          onPress={handleCollectSalary}
          disabled={!state.hasWorked || state.hasPaid}
          activeOpacity={0.7}
        >
          <Text style={styles.salaryBtnText}>
            {state.hasPaid
              ? `✅ Maaş Alındı (${formatMoney(state.salary)} TL)`
              : `💰 Maaşı Al (${formatMoney(state.salary)} TL)`}
          </Text>
        </TouchableOpacity>
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
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
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
    gap: 8,
    marginBottom: 20,
  },
  titleIcon: { fontSize: 22 },
  titleText: { fontSize: 22, fontWeight: '900', color: '#2c3e50' },
  jobInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  jobInfoItem: { alignItems: 'center' },
  jobInfoLabel: { fontSize: 11, fontWeight: '600', color: '#7f8c8d' },
  jobInfoValue: { fontSize: 15, fontWeight: '800', color: '#2c3e50' },
  divider: { width: 1, height: 30, backgroundColor: 'rgba(0,0,0,0.1)' },
  statusBox: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusWaiting: { backgroundColor: 'rgba(243,156,18,0.1)' },
  statusReady: { backgroundColor: 'rgba(46,204,113,0.1)' },
  statusDone: { backgroundColor: 'rgba(0,0,0,0.05)' },
  statusText: { fontSize: 14, fontWeight: '700', color: '#2c3e50', textAlign: 'center', lineHeight: 20 },
  workBtn: {
    backgroundColor: '#2ecc71',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  workBtnText: { color: 'white', fontWeight: '800', fontSize: 16 },
  salaryBtn: {
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  salaryBtnActive: {
    backgroundColor: '#3498db',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  salaryBtnText: { color: 'white', fontWeight: '800', fontSize: 17 },
  btnDisabled: { backgroundColor: '#bdc3c7', shadowOpacity: 0, elevation: 0 },
  statsCard: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statsTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  statsIcon: { fontSize: 16 },
  statsTitle: { fontSize: 15, fontWeight: '800', color: '#2c3e50' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  statRowBorder: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.06)' },
  statLabel: { fontSize: 13, fontWeight: '600', color: '#7f8c8d' },
  statValue: { fontSize: 13, fontWeight: '800' },
});
