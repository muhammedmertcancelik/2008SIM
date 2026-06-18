// ============================================
// İHTİYAÇ TAKİBİ BİLEŞENİ
// ============================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '../state/GameContext';
import { formatMoney } from '../utils/formatter';

export default function NeedsTracker() {
  const { state } = useGame();

  const needs = [
    { key: 'food', label: 'Yiyecek', color: '#e67e22', bgColor: '#fef3e2', ...state.needs.food },
    { key: 'transport', label: 'Ulaşım', color: '#3498db', bgColor: '#eaf2f8', ...state.needs.transport },
    { key: 'rent', label: 'Kira', color: '#9b59b6', bgColor: '#f4ecf7', ...state.needs.rent },
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
        const bgColor = isComplete ? '#eafaf1' : need.bgColor;

        return (
          <View key={need.key} style={[styles.needItem, { backgroundColor: bgColor }]}>
            <View style={styles.needHeader}>
              <Text style={styles.needLabel}>{need.label}</Text>
              <Text style={[styles.needValue, { color: barColor }]}>
                {formatMoney(need.current)} / {formatMoney(need.target)} TL
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
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  titleIcon: {
    fontSize: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2c3e50',
  },
  needItem: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  needHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  needLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2c3e50',
  },
  needValue: {
    fontSize: 14,
    fontWeight: '800',
  },
  progressBg: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 50,
  },
});
