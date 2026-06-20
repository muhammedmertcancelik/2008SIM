import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import GlassView from '../components/GlassView';
import { useGame } from '../state/GameContext';
import { getTranslation } from '../i18n';
import {  formatMoneyFull , getCurrency } from '../utils/formatter';

export default function BankScreen() {
  const { state, dispatch } = useGame();
  const t = getTranslation(state?.language || 'tr');
  
  const handleTakeLoan = (amount) => {
    if (state.creditScore < 800) {
      dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.loanRejected'), message: t('bank.alerts.loanRejectedDesc') } });
      return;
    }
    dispatch({ type: 'TAKE_LOAN', payload: { amount } });
    dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.loanApproved'), message: t('bank.alerts.loanApprovedDesc').replace('{amount}', formatMoneyFull(amount, state?.language)) } });
  };

  const handlePayDebt = (amount) => {
    if (state.money < amount) {
      dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.noMoney'), message: t('bank.alerts.noMoneyDebt') } });
      return;
    }
    if (state.bankDebt <= 0) {
      dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.noDebt'), message: t('bank.alerts.noDebtDesc') } });
      return;
    }
    dispatch({ type: 'PAY_DEBT', payload: { amount } });
  };

  const handleDeposit = (amount) => {
    if (state.money < amount) {
      dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.noMoney'), message: t('bank.alerts.noMoneyDeposit') } });
      return;
    }
    dispatch({ type: 'DEPOSIT_MONEY', payload: amount });
  };

  const handleWithdraw = (amount) => {
    if ((state.bankSavings || 0) < amount) {
      dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.noMoney'), message: t('bank.alerts.noMoneyWithdraw') } });
      return;
    }
    dispatch({ type: 'WITHDRAW_MONEY', payload: amount });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Kredi Notu ve Borç Durumu */}
      <GlassView intensity={30} tint="dark" style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={styles.titleIcon}>🏦</Text>
          <Text style={styles.titleText}>{t('bank.title')}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{t('bank.creditScore')}</Text>
            <Text style={[styles.statValue, { color: state.creditScore < 1000 ? '#e74c3c' : '#2ecc71' }]}>
              {state.creditScore}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{t('bank.totalDebt')}</Text>
            <Text style={[styles.statValue, { color: '#e74c3c' }]}>
              {formatMoneyFull(state.bankDebt || 0, state?.language)}
            </Text>
          </View>
        </View>
        <Text style={styles.infoText}>{t('bank.debtInfo')}</Text>
      </GlassView>

      {/* Vadeli Mevduat */}
      <GlassView intensity={30} tint="dark" style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={styles.titleIcon}>💼</Text>
          <Text style={styles.titleText}>{t('bank.savingsTitle')}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>{t('bank.savingsAmount')}</Text>
          <Text style={[styles.statValue, { color: '#f1c40f', fontSize: 24, marginBottom: 12 }]}>
            {formatMoneyFull(state.bankSavings || 0, state?.language)}
          </Text>
        </View>
        <Text style={styles.infoText}>{t('bank.savingsInfo')}</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.saveBtn]} onPress={() => handleDeposit(1000)}>
            <Text style={styles.actionBtnText}>{t('bank.deposit').replace('{amount}', '1.000')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.saveBtn]} onPress={() => handleDeposit(5000)}>
            <Text style={styles.actionBtnText}>{t('bank.deposit').replace('{amount}', '5.000')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.withdrawBtn]} onPress={() => handleWithdraw(1000)}>
            <Text style={styles.actionBtnText}>{t('bank.withdraw').replace('{amount}', '1.000')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.withdrawBtn]} onPress={() => handleWithdraw(5000)}>
            <Text style={styles.actionBtnText}>{t('bank.withdraw').replace('{amount}', '5.000')}</Text>
          </TouchableOpacity>
        </View>
      </GlassView>

      {/* Kredi Çekme */}
      <GlassView intensity={30} tint="dark" style={styles.card}>
        <Text style={styles.sectionTitle}>💳 İhtiyaç Kredisi Çek</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleTakeLoan(1000)}>
            <Text style={styles.actionBtnText}>1.000 ${getCurrency(state?.language)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleTakeLoan(5000)}>
            <Text style={styles.actionBtnText}>5.000 ${getCurrency(state?.language)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleTakeLoan(10000)}>
            <Text style={styles.actionBtnText}>10.000 ${getCurrency(state?.language)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleTakeLoan(50000)}>
            <Text style={styles.actionBtnText}>50.000 ${getCurrency(state?.language)}</Text>
          </TouchableOpacity>
        </View>
      </GlassView>

      {/* Borç Ödeme */}
      {state.bankDebt > 0 && (
        <GlassView intensity={30} tint="dark" style={styles.card}>
          <Text style={styles.sectionTitle}>💰 Borç Öde</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionBtn, styles.payBtn]} onPress={() => handlePayDebt(Math.min(500, state.bankDebt))}>
              <Text style={styles.actionBtnText}>Asgari (500 ${getCurrency(state?.language)})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.payBtn]} onPress={() => handlePayDebt(state.bankDebt)}>
              <Text style={styles.actionBtnText}>Tamamını Kapat</Text>
            </TouchableOpacity>
          </View>
        </GlassView>
      )}
      <View style={{height: 100}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  card: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
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
    flex: 1, backgroundColor: 'rgba(52, 152, 219, 0.15)', paddingVertical: 14, borderRadius: 16, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(52, 152, 219, 0.3)'
  },
  payBtn: { backgroundColor: 'rgba(46, 204, 113, 0.15)', borderColor: 'rgba(46, 204, 113, 0.3)' },
  saveBtn: { backgroundColor: 'rgba(241, 196, 15, 0.15)', borderColor: 'rgba(241, 196, 15, 0.3)' },
  withdrawBtn: { backgroundColor: 'rgba(127, 140, 141, 0.15)', borderColor: 'rgba(127, 140, 141, 0.3)' },
  actionBtnText: { color: '#ecf0f1', fontWeight: '800', fontSize: 14 },
});
