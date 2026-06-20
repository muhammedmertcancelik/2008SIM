// ============================================
// İHTİYAÇ TAKİBİ BİLEŞENİ
// ============================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '../state/GameContext';
import {  formatMoney , getCurrency } from '../utils/formatter';

export default function NeedsTracker() {
  const { state } = useGame();

  const needs = [
    { key: 'food', label: 'Yiyecek', color: '#e67e22', bgColor: 'rgba(230,126,34,0.1)', ...state.needs.food },
    { key: 'transport', label: 'Ulaşım', color: '#3498db', bgColor: 'rgba(52,152,219,0.1)', ...state.needs.transport },
    { key: 'rent', label: 'Kira', color: '#9b59b6', bgColor: 'rgba(155,89,182,0.1)', ...state.needs.rent },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.titleIcon}>📊</Text>
        <Text style={styles.titleText}>Aylık Harcama Takibi</Text>
      </View>

      {needs.map(need => {
        const percent = Math.min((need.current / need.target) * 100, 100);
        const isComplete = need.current >= need.target;
        const barColor = isComplete ? '#2ecc71' : need.color;
        const bgColor = isComplete ? 'rgba(46,204,113,0.1)' : need.bgColor;

        return (
          <View key={need.key} style={[styles.needItem, { backgroundColor: bgColor }]}>
            <View style={styles.needHeader}>
              <Text style={styles.needLabel}>{need.label}</Text>
              <Text style={[styles.needValue, { color: barColor }]}>
                {formatMoney(need.current)} / {formatMoney(need.target)} {getCurrency(state?.language)}
              </Text>
            </View>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${percent}%`, backgroundColor: barColor }]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2c3e50',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#34495e',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  titleIcon: {
    fontSize: 16,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ecf0f1',
  },
  needItem: {
    padding: 8,
    borderRadius: 10,
    marginBottom: 6,
  },
  needHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  needLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ecf0f1',
  },
  needValue: {
    fontSize: 12,
    fontWeight: '800',
  },
  progressBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 50,
  },
});
