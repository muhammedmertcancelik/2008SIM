import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import GlassView from '../components/GlassView';
import { useGame } from '../state/GameContext';
import { getTranslation } from '../i18n';
import { NPCS } from '../data/npcs';
import { formatMoneyFull } from '../utils/formatter';

export default function GameOverScreen({ onNewGame }) {
  const { state } = useGame();
  const t = getTranslation(state?.language || 'tr');
  
  const isBookComplete = state.gameOverReason === 'BOOK_COMPLETE';
  const memories = state.memories || [];
  const metNpcs = state.metNpcs || [];
  const topMemories = memories.slice(-5);

  const getEndingTitle = () => {
    if (isBookComplete) {
      if (state.money > 50000 && state.happiness > 60) return t('gameOver.titles.success');
      if (state.money > 50000 && state.happiness <= 40) return t('gameOver.titles.pyrrhic');
      if (state.money < 2000 && state.happiness > 60) return t('gameOver.titles.peace');
      if (state.money < 2000 && state.happiness <= 40) return t('gameOver.titles.bitter');
      if ((state.wantedLevel || 0) > 50) return t('gameOver.titles.dark');
      return t('gameOver.titles.lastPage');
    }
    return t('gameOver.titles.unfinished');
  };

  const getEndingEmoji = () => {
    if (isBookComplete) return '📕';
    return '📖';
  };

  const getEndingSubtitle = () => {
    if (isBookComplete) {
      return t('gameOver.subtitles.complete');
    }
    if (state.gameOverReason?.includes('tutuklal') || state.gameOverReason?.includes('polis')) {
      return t('gameOver.subtitles.arrested');
    }
    return t('gameOver.subtitles.died');
  };

  return (
    <ImageBackground source={require('../../assets/cozy_bg.png')} style={styles.background} resizeMode="cover">
      <View style={styles.darkOverlay} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Kitap Kapağı */}
        <GlassView intensity={80} tint="dark" style={styles.bookCover}>
          <Text style={styles.bookEmoji}>{getEndingEmoji()}</Text>
          <Text style={styles.bookTitle}>{getEndingTitle()}</Text>
          <Text style={styles.bookSubtitle}>{getEndingSubtitle()}</Text>
          
          <View style={styles.authorRow}>
            <Text style={styles.authorLabel}>{t('gameOver.author')}</Text>
            <Text style={styles.authorName}>{state.profile?.name || t('gameOver.anonymous')}</Text>
          </View>

          <View style={styles.pageInfo}>
            <Text style={styles.pageCount}>
              {isBookComplete ? t('gameOver.pagesWritten').replace('{count}', state.bookPages?.length || 0) : t('gameOver.pagesUnfinished').replace('{count}', state.bookPages?.length || 0)}
            </Text>
          </View>
        </GlassView>

        {/* Ölüm Sebebi (eğer erken bittiyse) */}
        {!isBookComplete && state.gameOverReason && state.gameOverReason !== 'BOOK_COMPLETE' && (
          <GlassView intensity={40} tint="dark" style={styles.deathCard}>
            <Text style={styles.deathTitle}>{t('gameOver.deathTitle')}</Text>
            <Text style={styles.deathText}>{state.gameOverReason}</Text>
          </GlassView>
        )}

        {/* Hayat İstatistikleri */}
        <GlassView intensity={40} tint="dark" style={styles.statsCard}>
          <Text style={styles.sectionTitle}>{t('gameOver.statsTitle')}</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatMoneyFull(state.money, state?.language)}</Text>
              <Text style={styles.statLabel}>{t('gameOver.finalBalance')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatMoneyFull(state.stats?.totalEarned || 0, state?.language)}</Text>
              <Text style={styles.statLabel}>{t('gameOver.totalEarned')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatMoneyFull(state.stats?.totalSpent || 0, state?.language)}</Text>
              <Text style={styles.statLabel}>{t('gameOver.totalSpent')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{state.stats?.monthsPlayed || 0} {t('gameOver.months')}</Text>
              <Text style={styles.statLabel}>{t('gameOver.timeLived')}</Text>
            </View>
          </View>
        </GlassView>

        {/* Tanınan Karakterler */}
        {metNpcs.length > 0 && (
          <GlassView intensity={40} tint="dark" style={styles.statsCard}>
            <Text style={styles.sectionTitle}>{t('gameOver.peopleMet')}</Text>
            {metNpcs.map(npcId => {
              const npc = NPCS.find(n => n.id === npcId);
              if (!npc) return null;
              const rel = state.npcRelationships?.[npcId] || 0;
              return (
                <View key={npcId} style={styles.npcRow}>
                  <Text style={styles.npcEmoji}>{npc.emoji}</Text>
                  <View style={styles.npcInfo}>
                    <Text style={styles.npcName}>{state.language === 'en' ? (npc.name_en || npc.name) : npc.name}</Text>
                    <Text style={styles.npcRole}>{state.language === 'en' ? (npc.role_en || npc.role) : npc.role}</Text>
                  </View>
                  <View style={styles.relBar}>
                    <View style={[styles.relFill, { width: `${rel}%`, backgroundColor: rel > 60 ? '#2ecc71' : rel > 30 ? '#f39c12' : '#e74c3c' }]} />
                  </View>
                  <Text style={styles.relText}>{rel}</Text>
                </View>
              );
            })}
          </GlassView>
        )}

        {/* Önemli Anılar */}
        {topMemories.length > 0 && (
          <GlassView intensity={40} tint="dark" style={styles.statsCard}>
            <Text style={styles.sectionTitle}>{t('gameOver.lastMemories')}</Text>
            {topMemories.map((memory, idx) => (
              <Text key={idx} style={styles.memoryText}>• {memory}</Text>
            ))}
          </GlassView>
        )}

        {/* Yeniden Başla */}
        <TouchableOpacity style={styles.restartBtn} onPress={onNewGame} activeOpacity={0.7}>
          <Text style={styles.restartBtnText}>{t('gameOver.newGame')}</Text>
        </TouchableOpacity>

        <View style={{ height: 60 }} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10, 5, 20, 0.95)' },
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 60 },

  bookCover: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 205, 163, 0.4)',
    overflow: 'hidden',
    marginBottom: 20,
  },
  bookEmoji: { fontSize: 64, marginBottom: 16 },
  bookTitle: { fontSize: 32, fontWeight: '900', color: '#ffcda3', textAlign: 'center', marginBottom: 8 },
  bookSubtitle: { fontSize: 14, color: '#a8b0c3', fontStyle: 'italic', textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  authorRow: { alignItems: 'center', marginBottom: 16 },
  authorLabel: { fontSize: 12, color: '#7f8c8d', fontWeight: '600' },
  authorName: { fontSize: 22, fontWeight: '900', color: '#fff', marginTop: 4 },
  pageInfo: { marginTop: 8 },
  pageCount: { fontSize: 13, color: '#a8b0c3', fontWeight: '600' },

  deathCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(231, 76, 60, 0.4)',
    overflow: 'hidden',
    marginBottom: 16,
  },
  deathTitle: { fontSize: 18, fontWeight: '900', color: '#e74c3c', marginBottom: 8 },
  deathText: { fontSize: 14, color: '#ecf0f1', lineHeight: 22 },

  statsCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#ffcda3', marginBottom: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statItem: {
    width: '47%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: { fontSize: 18, fontWeight: '900', color: '#2ecc71', marginBottom: 4 },
  statLabel: { fontSize: 11, fontWeight: '600', color: '#a8b0c3' },

  npcRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  npcEmoji: { fontSize: 28 },
  npcInfo: { flex: 1 },
  npcName: { fontSize: 14, fontWeight: '800', color: '#ecf0f1' },
  npcRole: { fontSize: 11, color: '#7f8c8d' },
  relBar: { width: 60, height: 6, backgroundColor: 'rgba(0, 0, 0, 0.85)', borderRadius: 3 },
  relFill: { height: '100%', borderRadius: 3 },
  relText: { fontSize: 12, fontWeight: '800', color: '#a8b0c3', width: 24, textAlign: 'right' },

  memoryText: { fontSize: 13, color: '#ecf0f1', marginBottom: 8, lineHeight: 20, fontWeight: '600' },

  restartBtn: {
    backgroundColor: 'rgba(46, 204, 113, 0.95)',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2ecc71',
    marginTop: 10,
  },
  restartBtnText: { color: '#fff', fontSize: 18, fontWeight: '900' },
});
