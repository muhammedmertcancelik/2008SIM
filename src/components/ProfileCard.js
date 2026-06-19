// ============================================
// PROFİL KARTI — Enerji ve Stres
// ============================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '../state/GameContext';

export default function ProfileCard() {
  const { state } = useGame();
  const energy = state.energy ?? 100;
  const stress = state.stress ?? 0;
  const relationship = state.relationship ?? 50;
  const health = state.health ?? 100;
  const happiness = state.happiness ?? 50;

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.titleIcon}>👤</Text>
        <Text style={styles.titleText}>Profil & Durum</Text>
      </View>

      <View style={styles.barsContainer}>
        {/* Enerji */}
        <View style={styles.barWrapper}>
          <View style={styles.barLabelRow}>
            <Text style={styles.barLabel}>⚡ Enerji</Text>
            <Text style={styles.barValue}>{Math.round(energy)}/100</Text>
          </View>
          <View style={styles.barBg}>
            <View 
              style={[
                styles.barFill, 
                { width: `${energy}%`, backgroundColor: energy < 30 ? '#e74c3c' : '#f1c40f' }
              ]} 
            />
          </View>
        </View>

        {/* Stres */}
        <View style={styles.barWrapper}>
          <View style={styles.barLabelRow}>
            <Text style={styles.barLabel}>💢 Stres</Text>
            <Text style={styles.barValue}>{Math.round(stress)}/100</Text>
          </View>
          <View style={styles.barBg}>
            <View 
              style={[
                styles.barFill, 
                { width: `${stress}%`, backgroundColor: stress > 70 ? '#e74c3c' : '#9b59b6' }
              ]} 
            />
          </View>
        </View>

        {/* İlişki Durumu */}
        <View style={styles.barWrapper}>
          <View style={styles.barLabelRow}>
            <Text style={styles.barLabel}>💖 İlişki</Text>
            <Text style={styles.barValue}>{Math.round(relationship)}/100</Text>
          </View>
          <View style={styles.barBg}>
            <View 
              style={[
                styles.barFill, 
                { width: `${relationship}%`, backgroundColor: relationship < 30 ? '#e74c3c' : '#fd79a8' }
              ]} 
            />
          </View>
        </View>

        {/* Sağlık */}
        <View style={styles.barWrapper}>
          <View style={styles.barLabelRow}>
            <Text style={styles.barLabel}>❤️ Sağlık</Text>
            <Text style={styles.barValue}>{Math.round(health)}/100</Text>
          </View>
          <View style={styles.barBg}>
            <View 
              style={[
                styles.barFill, 
                { width: `${health}%`, backgroundColor: health < 30 ? '#e74c3c' : '#2ecc71' }
              ]} 
            />
          </View>
        </View>

        {/* Mutluluk */}
        <View style={styles.barWrapper}>
          <View style={styles.barLabelRow}>
            <Text style={styles.barLabel}>😊 Mutluluk</Text>
            <Text style={styles.barValue}>{Math.round(happiness)}/100</Text>
          </View>
          <View style={styles.barBg}>
            <View 
              style={[
                styles.barFill, 
                { width: `${happiness}%`, backgroundColor: happiness < 30 ? '#e74c3c' : '#3498db' }
              ]} 
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  titleIcon: {
    fontSize: 16,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2c3e50',
  },
  barsContainer: {
    gap: 6,
  },
  barWrapper: {},
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#34495e',
  },
  barValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  barBg: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
});
