import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import GlassView from '../components/GlassView';
import { useGame } from '../state/GameContext';
import { getTranslation } from '../i18n';
import { CHAPTERS, TOTAL_PAGES } from '../data/chapters';
import { NPCS, getNpcDialogue } from '../data/npcs';

export default function DiaryScreen() {
  const { state, dispatch } = useGame();
  const t = getTranslation(state?.language || 'tr');
  
  const bookPages = state.bookPages || [];
  const currentChapter = CHAPTERS[state.currentChapter || 0];
  const metNpcs = state.metNpcs || [];
  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'characters'
  const [currentPageIdx, setCurrentPageIdx] = useState(Math.max(0, bookPages.length - 1));

  const currentPage = bookPages[currentPageIdx];

  const renderBook = () => {
    if (bookPages.length === 0) {
      return (
        <GlassView intensity={30} tint="dark" style={styles.emptyBook}>
          <Text style={styles.emptyIcon}>📖</Text>
          <Text style={styles.emptyTitle}>{t('diary.emptyBookTitle')}</Text>
          <Text style={styles.emptySubtitle}>{t('diary.emptyBookSubtitle')}</Text>
        </GlassView>
      );
    }

    // Sayfa görünümü — eski kağıt hissi
    const pageChapter = currentPage ? CHAPTERS[currentPage.chapter || 0] : currentChapter;

    return (
      <View>
        {/* Sayfa Navigasyonu */}
        <View style={styles.pageNav}>
          <TouchableOpacity
            style={[styles.navBtn, currentPageIdx <= 0 && styles.navBtnDisabled]}
            onPress={() => setCurrentPageIdx(Math.max(0, currentPageIdx - 1))}
            disabled={currentPageIdx <= 0}
          >
            <Text style={[styles.navBtnText, currentPageIdx <= 0 && styles.navBtnTextDisabled]}>{t('diary.prevPage')}</Text>
          </TouchableOpacity>
          
          <Text style={styles.pageNumber}>{t('diary.pageInfo').replace('{current}', currentPageIdx + 1).replace('{total}', bookPages.length)}</Text>
          
          <TouchableOpacity
            style={[styles.navBtn, currentPageIdx >= bookPages.length - 1 && styles.navBtnDisabled]}
            onPress={() => setCurrentPageIdx(Math.min(bookPages.length - 1, currentPageIdx + 1))}
            disabled={currentPageIdx >= bookPages.length - 1}
          >
            <Text style={[styles.navBtnText, currentPageIdx >= bookPages.length - 1 && styles.navBtnTextDisabled]}>{t('diary.nextPage')}</Text>
          </TouchableOpacity>
        </View>

        {/* Sayfa İçeriği */}
        <View style={styles.bookPage}>
          {/* Bölüm başlığı (bölüm değiştiğinde) */}
          {currentPage && (currentPageIdx === 0 || (bookPages[currentPageIdx - 1]?.chapter !== currentPage.chapter)) && (
            <View style={styles.chapterHeader}>
              <Text style={styles.chapterLabel}>{t('diary.chapter').replace('{num}', (currentPage.chapter || 0) + 1)}</Text>
              <Text style={styles.chapterTitle}>{state.language === 'en' ? (pageChapter?.title_en || pageChapter?.title) : pageChapter?.title}</Text>
              <View style={styles.chapterDivider} />
            </View>
          )}
          
          {currentPage && (
            <View>
              <Text style={styles.pageDate}>{t('diary.date').replace('{day}', currentPage.day).replace('{year}', currentPage.year)}</Text>
              <Text style={styles.pageContent}>{state.language === 'en' ? (currentPage.content_en || currentPage.content) : currentPage.content}</Text>
            </View>
          )}
        </View>

        {/* İlerleme */}
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>{t('diary.progressLabel')}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(100, (bookPages.length / TOTAL_PAGES) * 100)}%` }]} />
          </View>
          <Text style={styles.progressText}>{t('diary.progressText').replace('{written}', bookPages.length).replace('{total}', TOTAL_PAGES)}</Text>
        </View>
      </View>
    );
  };

  const handleInteract = (npcId) => {
    if (state.energy < 15) {
      if (Platform.OS !== 'web') {
        dispatch({ type: 'SHOW_ALERT', payload: { title: t('diary.alerts.tired'), message: t('diary.alerts.tiredDesc') } });
      } else {
        alert(`${t('diary.alerts.tired')}: ${t('diary.alerts.tiredDesc')}`);
      }
      return;
    }
    if (state.dailyActionCompleted) {
      if (Platform.OS !== 'web') {
        dispatch({ type: 'SHOW_ALERT', payload: { title: t('diary.alerts.alreadyDone'), message: t('diary.alerts.alreadyDoneDesc') } });
      } else {
        alert(t('diary.alerts.alreadyDoneDesc'));
      }
      return;
    }

    const npc = NPCS.find(n => n.id === npcId);
    const dialogue = getNpcDialogue(npc, state);

    dispatch({ type: 'INTERACT_NPC', payload: { npcId } });

    if (Platform.OS !== 'web') {
      dispatch({ type: 'SHOW_ALERT', payload: { title: `${npc.emoji} ${npc.name}`, message: dialogue } });
    } else {
      alert(`${npc.name}:\n\n${dialogue}`);
    }
  };

  const renderCharacters = () => {
    if (metNpcs.length === 0) {
      return (
        <GlassView intensity={30} tint="dark" style={styles.emptyBook}>
          <Text style={styles.emptyIcon}>👥</Text>
          <Text style={styles.emptyTitle}>{t('diary.emptyCharsTitle')}</Text>
          <Text style={styles.emptySubtitle}>{t('diary.emptyCharsSubtitle')}</Text>
        </GlassView>
      );
    }

    return (
      <View>
        {metNpcs.map(npcId => {
          const npc = NPCS.find(n => n.id === npcId);
          if (!npc) return null;
          const rel = state.npcRelationships?.[npcId] || 0;
          const relColor = rel > 60 ? '#2ecc71' : rel > 30 ? '#f39c12' : '#e74c3c';
          const relLabel = rel > 80 ? t('diary.relationships.veryClose') : rel > 60 ? t('diary.relationships.friend') : rel > 40 ? t('diary.relationships.acquaintance') : rel > 20 ? t('diary.relationships.distant') : t('diary.relationships.cold');
          
          return (
            <GlassView key={npcId} intensity={25} tint="dark" style={styles.npcCard}>
              <View style={styles.npcHeader}>
                <Text style={styles.npcEmoji}>{npc.emoji}</Text>
                <View style={styles.npcHeaderInfo}>
                  <Text style={styles.npcName}>{state.language === 'en' ? (npc.name_en || npc.name) : npc.name}</Text>
                  <Text style={styles.npcRole}>{state.language === 'en' ? (npc.role_en || npc.role) : npc.role}</Text>
                </View>
                <View style={styles.relBadge}>
                  <Text style={[styles.relBadgeText, { color: relColor }]}>{relLabel}</Text>
                </View>
              </View>
              
              <Text style={styles.npcPersonality}>{state.language === 'en' ? (npc.personality_en || npc.personality) : npc.personality}</Text>

              {/* İlişki Çubuğu */}
              <View style={styles.relBarContainer}>
                <View style={styles.relBarBg}>
                  <View style={[styles.relBarFill, { width: `${rel}%`, backgroundColor: relColor }]} />
                </View>
                <Text style={[styles.relBarValue, { color: relColor }]}>{rel}/100</Text>
              </View>

              <TouchableOpacity 
                style={[styles.interactBtn, (state.dailyActionCompleted || state.energy < 15) && styles.interactBtnDisabled]} 
                onPress={() => handleInteract(npcId)}
              >
                <Text style={styles.interactBtnText}>{t('diary.interact')}</Text>
              </TouchableOpacity>
            </GlassView>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Başlık */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📖</Text>
        <View>
          <Text style={styles.headerTitle}>{t('diary.title')}</Text>
          <Text style={styles.headerSubtitle}>{t('diary.chapter').replace('{num}', (state.currentChapter || 0) + 1)}: {state.language === 'en' ? (currentChapter?.title_en || currentChapter?.title) : currentChapter?.title}</Text>
        </View>
      </View>

      {/* Sekmeler */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'book' && styles.activeTab]}
          onPress={() => setActiveTab('book')}
        >
          <Text style={[styles.tabText, activeTab === 'book' && styles.activeTabText]}>{t('diary.tabs.pages')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'characters' && styles.activeTab]}
          onPress={() => setActiveTab('characters')}
        >
          <Text style={[styles.tabText, activeTab === 'characters' && styles.activeTabText]}>{t('diary.tabs.characters').replace('{count}', metNpcs.length)}</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'book' ? renderBook() : renderCharacters()}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },

  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  headerIcon: { fontSize: 32 },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#ffcda3' },
  headerSubtitle: { fontSize: 12, color: '#a8b0c3', fontWeight: '600' },

  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    marginBottom: 16,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: 'rgba(255, 205, 163, 0.85)' },
  tabText: { color: '#7f8c8d', fontWeight: '700', fontSize: 13 },
  activeTabText: { color: '#ffcda3' },

  // Kitap Sayfası
  pageNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  navBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, backgroundColor: 'rgba(255,205,163,0.15)', borderWidth: 1, borderColor: 'rgba(255,205,163,0.3)' },
  navBtnDisabled: { backgroundColor: 'rgba(0, 0, 0, 0.85)', borderColor: 'rgba(255,255,255,0.05)' },
  navBtnText: { color: '#ffcda3', fontWeight: '700', fontSize: 12 },
  navBtnTextDisabled: { color: '#555' },
  pageNumber: { color: '#a8b0c3', fontWeight: '800', fontSize: 14 },

  bookPage: {
    backgroundColor: 'rgba(255, 248, 235, 0.08)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 248, 235, 0.15)',
    minHeight: 250,
  },
  chapterHeader: { alignItems: 'center', marginBottom: 20 },
  chapterLabel: { fontSize: 11, color: '#7f8c8d', letterSpacing: 3, fontWeight: '700', textTransform: 'uppercase' },
  chapterTitle: { fontSize: 20, fontWeight: '900', color: '#ffcda3', marginTop: 4 },
  chapterDivider: { width: 40, height: 2, backgroundColor: 'rgba(255, 205, 163, 0.85)', marginTop: 10 },
  
  pageDate: { fontSize: 11, color: '#7f8c8d', fontWeight: '600', marginBottom: 12, fontStyle: 'italic' },
  pageContent: {
    fontSize: 15,
    color: '#ecf0f1',
    lineHeight: 26,
    fontWeight: '500',
  },

  // İlerleme
  progressSection: { marginTop: 16 },
  progressLabel: { fontSize: 12, color: '#7f8c8d', fontWeight: '700', marginBottom: 6 },
  progressBar: { height: 6, backgroundColor: 'rgba(0, 0, 0, 0.85)', borderRadius: 3, marginBottom: 6 },
  progressFill: { height: '100%', backgroundColor: '#ffcda3', borderRadius: 3 },
  progressText: { fontSize: 11, color: '#a8b0c3', fontWeight: '600', textAlign: 'right' },

  // Boş Durum
  emptyBook: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  emptyIcon: { fontSize: 48, marginBottom: 16, opacity: 0.8 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#ecf0f1', marginBottom: 8 },
  emptySubtitle: { fontSize: 12, color: '#7f8c8d', textAlign: 'center', paddingHorizontal: 20 },

  // NPC Kartları
  npcCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  npcHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  npcEmoji: { fontSize: 36 },
  npcHeaderInfo: { flex: 1 },
  npcName: { fontSize: 16, fontWeight: '900', color: '#ffcda3' },
  npcRole: { fontSize: 12, color: '#7f8c8d', fontWeight: '600' },
  relBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, backgroundColor: 'rgba(0, 0, 0, 0.85)' },
  relBadgeText: { fontSize: 11, fontWeight: '800' },
  npcPersonality: { fontSize: 12, color: '#a8b0c3', lineHeight: 18, marginBottom: 12, fontStyle: 'italic' },
  relBarContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  relBarBg: { flex: 1, height: 6, backgroundColor: 'rgba(0, 0, 0, 0.85)', borderRadius: 3 },
  relBarFill: { height: '100%', borderRadius: 3 },
  relBarValue: { fontSize: 12, fontWeight: '800', width: 40, textAlign: 'right' },
  interactBtn: {
    backgroundColor: 'rgba(52, 152, 219, 0.85)',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(52, 152, 219, 0.5)',
  },
  interactBtnDisabled: {
    opacity: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  interactBtnText: {
    color: '#3498db',
    fontWeight: '800',
    fontSize: 13,
  },
});
