// ============================================
// HEADER BİLEŞENİ
// ============================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '../state/GameContext';
import { formatMoney } from '../utils/formatter';

export default function Header() {
  const { state, getMonthName } = useGame();

  return (
    <View style={styles.container}>
      {/* Sol: Yıl & Ülke */}
      <View style={styles.countryBlock}>
        <Text style={styles.yearText}>{state.year}</Text>
        <Text style={styles.countryText}>Türkiye</Text>
      </View>

      {/* Orta: Tarih */}
      <View style={styles.dateBadge}>
        <Text style={styles.dateIcon}>📅</Text>
        <View style={styles.dateTextBlock}>
          <Text style={styles.monthText}>{getMonthName()} ({state.day}. Gün)</Text>
          <Text style={styles.dateYearText}>{state.year}</Text>
        </View>
      </View>

      {/* Sağ: Bakiye */}
      <View style={styles.balanceBadge}>
        <Text style={styles.balanceIcon}>💰</Text>
        <View style={styles.balanceTextBlock}>
          <Text style={styles.balanceAmount}>{formatMoney(state.money)}</Text>
          <Text style={styles.balanceCurrency}>TL</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 6,
    gap: 4,
  },
  countryBlock: {
    flexDirection: 'column',
  },
  yearText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffcda3', 
    lineHeight: 24,
  },
  countryText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#a8b0c3',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateIcon: {
    fontSize: 12,
  },
  dateTextBlock: {
    alignItems: 'center',
  },
  monthText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#f5f7f2',
    textTransform: 'uppercase',
  },
  dateYearText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#a8b0c3',
  },
  balanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 205, 163, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 205, 163, 0.2)',
  },
  balanceIcon: {
    fontSize: 12,
  },
  balanceTextBlock: {
    alignItems: 'flex-start',
  },
  balanceAmount: {
    fontSize: 12,
    fontWeight: '900',
    color: '#ffcda3',
  },
  balanceCurrency: {
    fontSize: 9,
    fontWeight: '700',
    color: '#a8b0c3',
  },
});
