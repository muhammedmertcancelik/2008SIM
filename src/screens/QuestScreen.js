import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useGame } from '../state/GameContext';
import { QUESTS_DATA } from '../data/quests';
import { getTranslation } from '../i18n';
import {  formatMoney , getCurrency } from '../utils/formatter';

export default function QuestScreen() {
  const { state, dispatch } = useGame();
  const t = getTranslation(state?.language || 'tr');

  const handleAcceptQuest = (quest) => {
    dispatch({ type: 'ACCEPT_QUEST', payload: { quest } });
  };

  const getRewardText = (rewards) => {
    let parts = [];
    if (rewards.money) parts.push(`+${formatMoney(rewards.money)} ${getCurrency(state?.language)}`);
    if (rewards.reputation) parts.push(`+${rewards.reputation} ${t('quests.reputation')}`);
    if (rewards.wantedLevelChange) parts.push(`${rewards.wantedLevelChange} ${t('quests.wanted')}`);
    if (rewards.item) parts.push(`${t('quests.item')}: ${state.language === 'en' ? (rewards.item.name_en || rewards.item.name) : rewards.item.name}`);
    return parts.join(' | ');
  };

  const activeQuests = state.quests?.active || [];
  const completedQuests = state.quests?.completed || [];
  
  const availableQuests = QUESTS_DATA.filter(q => 
    !activeQuests.find(aq => aq.id === q.id) &&
    !completedQuests.find(cq => cq.id === q.id)
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Aktif Görevler */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>🔥</Text>
        <Text style={styles.sectionTitle}>{t('quests.activeQuests')}</Text>
      </View>
      
      {activeQuests.length === 0 ? (
        <Text style={styles.emptyText}>{t('quests.noActiveQuests')}</Text>
      ) : (
        activeQuests.map(quest => {
          const percent = Math.min(100, Math.round(((quest.currentAmount || 0) / quest.targetAmount) * 100));
          return (
            <View key={quest.id} style={styles.activeCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.questTitle}>{state.language === 'en' ? (quest.title_en || quest.title) : quest.title}</Text>
                <Text style={styles.questTypeBadge}>{quest.type.toUpperCase()}</Text>
              </View>
              <Text style={styles.questDesc}>{state.language === 'en' ? (quest.description_en || quest.description) : quest.description}</Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressLabelRow}>
                  <Text style={styles.progressLabel}>{t('quests.progress')}: {quest.currentAmount || 0} / {quest.targetAmount}</Text>
                  <Text style={styles.progressPercent}>%{percent}</Text>
                </View>
                <View style={styles.progressBg}>
                  <View style={[styles.progressFill, { width: `${percent}%` }]} />
                </View>
              </View>

              <View style={styles.rewardBox}>
                <Text style={styles.rewardTitle}>{t('quests.reward')}:</Text>
                <Text style={styles.rewardText}>{getRewardText(quest.rewards)}</Text>
              </View>
            </View>
          );
        })
      )}

      {/* Alınabilir Görevler */}
      <View style={[styles.sectionHeader, { marginTop: 20 }]}>
        <Text style={styles.sectionIcon}>📋</Text>
        <Text style={styles.sectionTitle}>{t('quests.availableQuests')}</Text>
      </View>

      {availableQuests.length === 0 ? (
        <Text style={styles.emptyText}>{t('quests.noAvailableQuests')}</Text>
      ) : (
        availableQuests.map(quest => (
          <View key={quest.id} style={styles.availableCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.questTitle}>{state.language === 'en' ? (quest.title_en || quest.title) : quest.title}</Text>
              <Text style={styles.questTypeBadge}>{quest.type.toUpperCase()}</Text>
            </View>
            <Text style={styles.questDesc}>{state.language === 'en' ? (quest.description_en || quest.description) : quest.description}</Text>
            
            <View style={styles.rewardBox}>
              <Text style={styles.rewardTitle}>{t('quests.reward')}:</Text>
              <Text style={styles.rewardText}>{getRewardText(quest.rewards)}</Text>
            </View>

            <TouchableOpacity 
              style={styles.acceptBtn} 
              onPress={() => handleAcceptQuest(quest)}
              activeOpacity={0.7}
            >
              <Text style={styles.acceptBtnText}>{t('quests.acceptQuest')}</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      {/* Tamamlanmış Görevler */}
      {completedQuests.length > 0 && (
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionIcon}>✅</Text>
          <Text style={styles.sectionTitle}>Tamamlanmış Görevler</Text>
        </View>
      )}
      
      {completedQuests.map(quest => (
        <View key={quest.id} style={styles.completedCard}>
          <Text style={styles.questTitle}>{state.language === 'en' ? (quest.title_en || quest.title) : quest.title}</Text>
          <Text style={styles.questDesc}>{state.language === 'en' ? (quest.description_en || quest.description) : quest.description}</Text>
          <Text style={styles.completedBadge}>TAMAMLANDI</Text>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1abc9c',
  },
  emptyText: {
    color: '#7f8c8d',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  activeCard: {
    backgroundColor: 'rgba(26, 188, 156, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(26, 188, 156, 0.4)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  availableCard: {
    backgroundColor: '#16213e',
    borderWidth: 1,
    borderColor: '#34495e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  completedCard: {
    backgroundColor: 'rgba(46, 204, 113, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#ecf0f1',
    flex: 1,
  },
  questTypeBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1abc9c',
    backgroundColor: 'rgba(26, 188, 156, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  questDesc: {
    fontSize: 13,
    color: '#bdc3c7',
    marginBottom: 12,
    lineHeight: 18,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ecf0f1',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1abc9c',
  },
  progressBg: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1abc9c',
    borderRadius: 4,
  },
  rewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: 8,
    borderRadius: 8,
    gap: 8,
  },
  rewardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#f1c40f',
  },
  rewardText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ecf0f1',
    flex: 1,
  },
  acceptBtn: {
    backgroundColor: '#1abc9c',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  acceptBtnText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 14,
  },
  completedBadge: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '800',
    color: '#2ecc71',
    letterSpacing: 1,
  },
});
