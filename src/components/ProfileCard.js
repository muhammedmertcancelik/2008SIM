// ============================================
// PROFİL KARTI — Enerji ve Stres
// ============================================

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlassView from './GlassView';
import { useGame } from '../state/GameContext';

export default function ProfileCard() {
  const { state } = useGame();
  const [expanded, setExpanded] = useState(false);

  const energy = state.energy ?? 100;
  const stress = state.stress ?? 0;
  const relationship = state.relationship ?? 50;
  const health = state.health ?? 100;
  const happiness = state.happiness ?? 50;
  const hunger = state.hunger || 0;
  const wantedLevel = state.wantedLevel || 0;

  const stats = [
    { label: '⚡ Enerji', value: energy, color: energy < 30 ? '#e74c3c' : '#f1c40f', inverse: false },
    { label: '❤️ Sağlık', value: health, color: health < 30 ? '#e74c3c' : '#2ecc71', inverse: false },
    { label: '🍔 Açlık', value: hunger, color: hunger > 70 ? '#e74c3c' : '#f39c12', inverse: true },
    { label: '💢 Stres', value: stress, color: stress > 70 ? '#e74c3c' : '#9b59b6', inverse: true },
    { label: '😊 Mutluluk', value: happiness, color: happiness < 30 ? '#e74c3c' : '#3498db', inverse: false },
    { label: '💖 İlişki', value: relationship, color: relationship < 30 ? '#e74c3c' : '#fd79a8', inverse: false },
  ];

  if (wantedLevel > 0) {
    stats.push({ label: '🚨 Aranma', value: wantedLevel, color: '#c0392b', inverse: true });
  }

  return (
    <GlassView intensity={20} tint="light" style={styles.container}>
      <TouchableOpacity 
        style={styles.headerRow} 
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.titleRow}>
          <Text style={styles.titleIcon}>👤</Text>
          <Text style={styles.titleText}>Durum: %{Math.round(health)} ❤️</Text>
        </View>
        <Text style={styles.expandIcon}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.barsGrid}>
          {stats.map((stat, idx) => (
            <View key={idx} style={styles.barWrapper}>
              <View style={styles.barLabelRow}>
                <Text style={styles.barLabel}>{stat.label}</Text>
                <Text style={styles.barValue}>{Math.round(stat.value)}/100</Text>
              </View>
              <View style={styles.barBg}>
                <View 
                  style={[
                    styles.barFill, 
                    { width: `${stat.value}%`, backgroundColor: stat.color }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      )}
    </GlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginBottom: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 205, 163, 0.1)', 
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  titleIcon: {
    fontSize: 16,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffcda3',
  },
  expandIcon: {
    fontSize: 10,
    color: '#ffcda3',
    fontWeight: '900',
  },
  barsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
    justifyContent: 'space-between',
  },
  barWrapper: {
    width: '48%',
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ecf0f1',
  },
  barValue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#95a5a6',
  },
  barBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
});
