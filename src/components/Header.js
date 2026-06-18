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
          <Text style={styles.monthText}>{getMonthName()}</Text>
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 8,
  },
  countryBlock: {
    flexDirection: 'column',
  },
  yearText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#27ae60',
    lineHeight: 30,
  },
  countryText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#27ae60',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  dateIcon: {
    fontSize: 16,
  },
  dateTextBlock: {
    alignItems: 'center',
  },
  monthText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2c3e50',
  },
  dateYearText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  balanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#2ecc71',
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  balanceIcon: {
    fontSize: 16,
  },
  balanceTextBlock: {
    alignItems: 'flex-end',
  },
  balanceAmount: {
    fontSize: 17,
    fontWeight: '900',
    color: 'white',
    lineHeight: 19,
  },
  balanceCurrency: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
  },
});
