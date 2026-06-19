import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGame } from '../state/GameContext';

export default function DiaryScreen() {
  const { state } = useGame();
  
  const memories = state.memories || [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📖</Text>
        <Text style={styles.headerTitle}>Hayat Günlüğüm</Text>
      </View>
      
      <Text style={styles.subtitle}>Geçmişte yaşadığın önemli anılar ve aldığın kararlar burada toplanır.</Text>

      {memories.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>🕰️</Text>
          <Text style={styles.emptyStateText}>Henüz kayda değer bir şey yaşamadın...</Text>
          <Text style={styles.emptyStateSubtext}>Zaman geçtikçe ve önemli seçimler yaptıkça günlüğün dolacak.</Text>
        </View>
      ) : (
        <View style={styles.timeline}>
          {memories.map((memory, index) => (
            <View key={index} style={styles.memoryCard}>
              <View style={styles.bulletPoint} />
              <Text style={styles.memoryText}>{memory}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  headerIcon: {
    fontSize: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 24,
    lineHeight: 18,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.8,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  timeline: {
    borderLeftWidth: 2,
    borderLeftColor: '#bdc3c7',
    marginLeft: 10,
    paddingLeft: 20,
    paddingBottom: 40,
  },
  memoryCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  bulletPoint: {
    position: 'absolute',
    left: -27,
    top: 20,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3498db',
    borderWidth: 2,
    borderColor: '#ecf0f1',
  },
  memoryText: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
    lineHeight: 20,
  }
});
