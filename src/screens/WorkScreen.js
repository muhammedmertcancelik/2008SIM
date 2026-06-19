import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { useGame } from '../state/GameContext';
import { formatMoney, formatMoneyFull } from '../utils/formatter';
import { JOBS, JOB_CATEGORIES } from '../data/jobs';

export default function WorkScreen() {
  const { state, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState('MY_JOB'); // 'MY_JOB' or 'MARKET'

  const handleWork = () => {
    dispatch({ type: 'WORK' });
  };

  const handleApply = (job) => {
    if (state.job === job.title) {
      Alert.alert('Hata', 'Zaten bu işte çalışıyorsun.');
      return;
    }
    const jobLevel = state.hiddenStats?.levels?.job || 1;
    if (job.requiredLevel && jobLevel < job.requiredLevel) {
      Alert.alert('Yetersiz Seviye', `Bu iş için İş Seviyenin en az ${job.requiredLevel} olması gerekiyor.`);
      return;
    }
    if (job.requiredSkill && !(state.skills || []).includes(job.requiredSkill)) {
      Alert.alert('Eksik Eğitim', `Bu işe girmek için gerekli eğitimi/sertifikayı almadın.`);
      return;
    }

    Alert.alert(
      'İşe Gir',
      `${job.title} işine girmek istiyor musun? Eski işinden ayrılacaksın.`,
      [
        { text: 'Vazgeç', style: 'cancel' },
        { 
          text: 'Kabul Et', 
          onPress: () => {
            dispatch({ type: 'CHANGE_JOB', payload: { job } });
            Alert.alert('Hayırlı Olsun!', 'Yeni işinize başladınız.');
            setActiveTab('MY_JOB');
          }
        }
      ]
    );
  };

  const handleResign = () => {
    Alert.alert(
      'İstifa Et',
      'Gerçekten istifa etmek istiyor musun? İşsiz kalacaksın.',
      [
        { text: 'Vazgeç', style: 'cancel' },
        { 
          text: 'İstifa Et', 
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'CHANGE_JOB', payload: { job: null } });
          }
        }
      ]
    );
  };

  const renderMyJob = () => {
    let statusText, statusStyle;
    const energy = state.energy ?? 100;
    const stress = state.stress ?? 0;
    
    const currentJobData = JOBS.find(j => j.id === state.currentJobId);
    const requiredEnergy = currentJobData ? currentJobData.energyCost : 30;
    const addedStress = currentJobData ? currentJobData.stressCost : 20;

    const canWork = energy >= requiredEnergy && stress <= 80;

    if (state.job === 'İşsiz') {
      return (
        <BlurView intensity={20} tint="dark" style={styles.workCard}>
          <Text style={styles.unemployedIcon}>🤷‍♂️</Text>
          <Text style={styles.unemployedTitle}>Şu An İşsizsin</Text>
          <Text style={styles.unemployedDesc}>
            Para kazanmak için bir işe girmelisin. Yukarıdan "İş İlanları" sekmesine tıklayarak kendine uygun bir iş bulabilirsin.
          </Text>
        </BlurView>
      );
    }

    if (!state.hasWorked) {
      if (!canWork) {
        statusText = `🚫 Enerjiniz yetersiz (Gereken: ${requiredEnergy}) veya stresiniz çok yüksek!`;
        statusStyle = styles.statusError;
      } else {
        statusText = `💼 Çalışmaya hazırsınız. (-${requiredEnergy} Enerji, +${addedStress} Stres)`;
        statusStyle = styles.statusWaiting;
      }
    } else {
      statusText = '✅ Bu ayki mesainizi tamamladınız. Maaşınız ay sonunda yatar.';
      statusStyle = styles.statusDone;
    }

    return (
      <View>
        <BlurView intensity={30} tint="dark" style={styles.workCard}>
          <View style={styles.titleRow}>
            <Text style={styles.titleIcon}>{currentJobData ? currentJobData.icon : '💼'}</Text>
            <Text style={styles.titleText}>{state.job}</Text>
          </View>

          <View style={styles.jobDetailBox}>
            <View style={styles.jobDetailItem}>
              <Text style={styles.jobDetailLabel}>Aylık Maaş</Text>
              <Text style={styles.jobDetailValue}>{formatMoneyFull(state.salary)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.jobDetailItem}>
              <Text style={styles.jobDetailLabel}>Enerji Maliyeti</Text>
              <Text style={[styles.jobDetailValue, {color: '#f39c12'}]}>-{requiredEnergy}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.jobDetailItem}>
              <Text style={styles.jobDetailLabel}>Stres Yükü</Text>
              <Text style={[styles.jobDetailValue, {color: '#e74c3c'}]}>+{addedStress}</Text>
            </View>
          </View>

          <View style={[styles.statusBox, statusStyle]}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>

          <TouchableOpacity
            style={[styles.workBtn, (state.hasWorked || !canWork) && styles.btnDisabled]}
            onPress={handleWork}
            disabled={state.hasWorked || !canWork}
          >
            <Text style={styles.workBtnText}>
              {state.hasWorked ? '✅ Bu Ay Çalışıldı' : '🔨 MESAİYE BAŞLA'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resignBtn} onPress={handleResign}>
            <Text style={styles.resignBtnText}>İstifa Et</Text>
          </TouchableOpacity>

        </BlurView>

        {/* İstatistikler */}
        {state.stats.monthsPlayed > 0 && (
          <BlurView intensity={20} tint="dark" style={styles.statsCard}>
            <View style={styles.statsTitleRow}>
              <Text style={styles.statsIcon}>📋</Text>
              <Text style={styles.statsTitle}>İş İstatistikleri</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Toplam Kazanç</Text>
              <Text style={[styles.statValue, { color: '#2ecc71' }]}>{formatMoneyFull(state.stats.totalEarned)}</Text>
            </View>
          </BlurView>
        )}
      </View>
    );
  };

  const renderMarket = () => {
    return (
      <View style={{ paddingBottom: 20 }}>
        {JOBS.map(job => {
          const category = JOB_CATEGORIES[job.categoryId];
          const isCurrent = state.currentJobId === job.id;
          return (
            <BlurView intensity={25} tint="dark" style={styles.jobCard} key={job.id}>
              <View style={styles.jobHeader}>
                <View style={styles.jobIconBox}>
                  <Text style={styles.jobIcon}>{job.icon}</Text>
                </View>
                <View style={styles.jobTitleBox}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={[styles.jobCategory, { color: category.color }]}>{category.title}</Text>
                </View>
                <View style={styles.jobSalaryBox}>
                  <Text style={styles.jobSalary}>{formatMoney(job.salary)}</Text>
                  <Text style={styles.jobSalaryLabel}>TL / Ay</Text>
                </View>
              </View>
              
              <Text style={styles.jobDesc}>{job.description}</Text>
              
              <View style={styles.jobReqsRow}>
                <View style={styles.reqBadge}>
                  <Text style={styles.reqBadgeText}>⚡ -{job.energyCost} Enerji</Text>
                </View>
                <View style={[styles.reqBadge, { borderColor: 'rgba(231, 76, 60, 0.3)', backgroundColor: 'rgba(231, 76, 60, 0.1)' }]}>
                  <Text style={[styles.reqBadgeText, { color: '#e74c3c' }]}>💢 +{job.stressCost} Stres</Text>
                </View>
                {job.requiredSkill && (
                  <View style={[styles.reqBadge, { borderColor: 'rgba(241, 196, 15, 0.3)', backgroundColor: 'rgba(241, 196, 15, 0.1)' }]}>
                    <Text style={[styles.reqBadgeText, { color: '#f1c40f' }]}>🎓 Eğitim Şart</Text>
                  </View>
                )}
              </View>

              {isCurrent ? (
                <View style={[styles.applyBtn, { backgroundColor: 'rgba(46, 204, 113, 0.2)' }]}>
                  <Text style={[styles.applyBtnText, { color: '#2ecc71' }]}>Mevcut İşin</Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.applyBtn} onPress={() => handleApply(job)}>
                  <Text style={styles.applyBtnText}>BAŞVUR</Text>
                </TouchableOpacity>
              )}
            </BlurView>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Sekmeler */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'MY_JOB' && styles.activeTab]}
          onPress={() => setActiveTab('MY_JOB')}
        >
          <Text style={[styles.tabText, activeTab === 'MY_JOB' && styles.activeTabText]}>💼 Mevcut İşim</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'MARKET' && styles.activeTab]}
          onPress={() => setActiveTab('MARKET')}
        >
          <Text style={[styles.tabText, activeTab === 'MARKET' && styles.activeTabText]}>📰 İş İlanları</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'MY_JOB' ? renderMyJob() : renderMarket()}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    marginBottom: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  tabText: {
    color: '#a8b0c3',
    fontWeight: '700',
    fontSize: 14,
  },
  activeTabText: {
    color: '#ffcda3',
    fontWeight: '900',
  },

  workCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 },
  titleIcon: { fontSize: 24 },
  titleText: { fontSize: 22, fontWeight: '900', color: '#ffcda3' },
  
  jobDetailBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  jobDetailItem: { alignItems: 'center', flex: 1 },
  jobDetailLabel: { fontSize: 11, color: '#a8b0c3', fontWeight: '600', marginBottom: 4 },
  jobDetailValue: { fontSize: 16, color: '#2ecc71', fontWeight: '900' },
  divider: { width: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 8 },

  statusBox: { padding: 12, borderRadius: 12, marginBottom: 20, borderWidth: 1 },
  statusWaiting: { backgroundColor: 'rgba(241, 196, 15, 0.1)', borderColor: 'rgba(241, 196, 15, 0.3)' },
  statusDone: { backgroundColor: 'rgba(46, 204, 113, 0.1)', borderColor: 'rgba(46, 204, 113, 0.3)' },
  statusError: { backgroundColor: 'rgba(231, 76, 60, 0.1)', borderColor: 'rgba(231, 76, 60, 0.3)' },
  statusText: { color: '#ecf0f1', fontSize: 13, textAlign: 'center', fontWeight: '600' },

  workBtn: { backgroundColor: 'rgba(46, 204, 113, 0.2)', paddingVertical: 16, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#2ecc71' },
  btnDisabled: { backgroundColor: 'rgba(0, 0, 0, 0.3)', borderColor: 'transparent' },
  workBtnText: { color: 'white', fontWeight: '900', fontSize: 16 },

  resignBtn: { marginTop: 16, paddingVertical: 12, alignItems: 'center' },
  resignBtnText: { color: '#e74c3c', fontWeight: '700', fontSize: 14, textDecorationLine: 'underline' },

  unemployedIcon: { fontSize: 40, textAlign: 'center', marginBottom: 10 },
  unemployedTitle: { fontSize: 20, color: '#e74c3c', fontWeight: '900', textAlign: 'center', marginBottom: 8 },
  unemployedDesc: { fontSize: 14, color: '#a8b0c3', textAlign: 'center', lineHeight: 20 },

  statsCard: { padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', overflow: 'hidden' },
  statsTitleRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  statsIcon: { fontSize: 16 },
  statsTitle: { color: '#ffcda3', fontSize: 16, fontWeight: '800' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  statLabel: { color: '#a8b0c3', fontSize: 14, fontWeight: '600' },
  statValue: { fontSize: 16, fontWeight: '900' },

  jobCard: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  jobHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  jobIconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  jobIcon: { fontSize: 22 },
  jobTitleBox: { flex: 1 },
  jobTitle: { fontSize: 16, fontWeight: '900', color: '#ffcda3', marginBottom: 4 },
  jobCategory: { fontSize: 11, fontWeight: '800' },
  jobSalaryBox: { alignItems: 'flex-end' },
  jobSalary: { fontSize: 16, fontWeight: '900', color: '#2ecc71' },
  jobSalaryLabel: { fontSize: 10, color: '#a8b0c3', fontWeight: '700' },
  
  jobDesc: { fontSize: 13, color: '#bdc3c7', marginBottom: 16, lineHeight: 18 },
  
  jobReqsRow: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  reqBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(52, 152, 219, 0.3)', backgroundColor: 'rgba(52, 152, 219, 0.1)' },
  reqBadgeText: { fontSize: 11, fontWeight: '800', color: '#3498db' },

  applyBtn: { paddingVertical: 12, borderRadius: 16, alignItems: 'center', backgroundColor: 'rgba(255, 205, 163, 0.1)', borderWidth: 1, borderColor: 'rgba(255, 205, 163, 0.3)' },
  applyBtnText: { color: '#ffcda3', fontWeight: '800', fontSize: 14 },
});
