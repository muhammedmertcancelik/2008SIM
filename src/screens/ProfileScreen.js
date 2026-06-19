import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useGame } from '../state/GameContext';
import { formatMoneyFull } from '../utils/formatter';

const COURSES = [
  { id: 'c_english', title: 'İngilizce Kursu', cost: 1200, requirement: null, desc: 'Kurumsal iş ilanlarına başvurmanı sağlar.' },
  { id: 'c_code', title: 'Yazılım Kursu', cost: 3500, requirement: 'c_english', desc: 'Yazılımcı olarak çalışabilmeni sağlar.' },
];

const ASSETS = [
  { id: 'a_car_sahin', title: 'Tofaş Şahin', cost: 8000, type: 'Car', desc: 'Ulaşım masrafı kalmaz, sanayi derdi başlar.' },
  { id: 'a_house_1', title: '1+1 Daire', cost: 60000, type: 'House', desc: 'Kira derdi biter, vergi başlar.' },
];

export default function ProfileScreen() {
  const { state, dispatch } = useGame();

  const handleBuyCourse = (course) => {
    if (state.skills.includes(course.id)) {
      Alert.alert('Zaten Alındı', 'Bu eğitimi zaten tamamladınız.');
      return;
    }
    if (course.requirement && !state.skills.includes(course.requirement)) {
      Alert.alert('Gereksinim Eksik', 'Bu kursu alabilmek için önceki eğitimleri tamamlamalısınız.');
      return;
    }
    if (state.money < course.cost) {
      Alert.alert('Yetersiz Bakiye', 'Bu kurs için yeterli paranız yok.');
      return;
    }

    dispatch({
      type: 'MAKE_CHOICE',
      payload: {
        effects: { money: -course.cost, stress: 10, energy: -20 },
      }
    });
    
    // Geçici olarak yetenekleri eklemek için action ekleyeceğiz (veya MAKE_CHOICE'u genişleteceğiz).
    // Basitlik adına GameContext içine TAKE_COURSE ve BUY_ASSET reducer'ı ekleyeceğim.
    dispatch({ type: 'TAKE_COURSE', payload: { course } });
    Alert.alert('Eğitim Tamamlandı', `Tebrikler! Yeni mesleğiniz: ${course.newJob}`);
  };

  const handleBuyAsset = (asset) => {
    if (state.inventory.includes(asset.id)) {
      Alert.alert('Zaten Alındı', 'Buna zaten sahipsiniz.');
      return;
    }
    if (state.money < asset.cost) {
      Alert.alert('Yetersiz Bakiye', 'Bu mülkü almak için paranız yetmiyor. Bankadan kredi çekebilirsiniz.');
      return;
    }

    dispatch({ type: 'BUY_ASSET', payload: { asset } });
    Alert.alert('Hayırlı Olsun!', `${asset.title} satın aldınız.`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Kişisel Bilgiler */}
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={styles.titleIcon}>👤</Text>
          <Text style={styles.titleText}>Kişisel Bilgiler</Text>
        </View>
        <Text style={styles.statText}>İsim: {state.profile?.name} ({state.profile?.age} Yaş, {state.profile?.gender})</Text>
        <Text style={styles.statText}>Geçmiş: {state.profile?.storyId}</Text>
        <Text style={styles.statText}>Kader: {state.profile?.fateId}</Text>
      </View>

      {/* Seviyeler */}
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={styles.titleIcon}>⭐</Text>
          <Text style={styles.titleText}>Seviyeler</Text>
        </View>
        <Text style={styles.statText}>İş Seviyesi: Lv{state.hiddenStats?.levels?.job || 1}</Text>
        <Text style={styles.statText}>Finans Seviyesi: Lv{state.hiddenStats?.levels?.finance || 1}</Text>
        <Text style={styles.statText}>Sosyal Seviye: Lv{state.hiddenStats?.levels?.social || 1}</Text>
        <Text style={styles.statText}>Mahalle Prestiji: Lv{state.hiddenStats?.levels?.prestige_neighborhood || 1}</Text>
      </View>

      {/* Kariyer ve Eğitim */}
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={styles.titleIcon}>🎓</Text>
          <Text style={styles.titleText}>Kariyer & Eğitim</Text>
        </View>
        <Text style={styles.infoText}>Mevcut Meslek: {state.job}</Text>
        
        {COURSES.map(course => {
          const isOwned = state.skills.includes(course.id);
          const isLocked = course.requirement && !state.skills.includes(course.requirement);
          return (
            <View key={course.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{course.title} {isOwned && '✅'}</Text>
                <Text style={styles.itemDesc}>{course.desc}</Text>
                <Text style={styles.itemCost}>{formatMoneyFull(course.cost)}</Text>
              </View>
              <TouchableOpacity 
                style={[styles.buyBtn, (isOwned || isLocked) && styles.buyBtnDisabled]} 
                onPress={() => handleBuyCourse(course)}
                disabled={isOwned || isLocked}
              >
                <Text style={styles.buyBtnText}>
                  {isOwned ? 'Tamamlandı' : (isLocked ? 'Kilitli' : 'Satın Al')}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* Mülk ve Envanter */}
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={styles.titleIcon}>🏠</Text>
          <Text style={styles.titleText}>Mülk & Araç Yatırımı</Text>
        </View>
        <Text style={styles.infoText}>Mülk sahibi olmak aylık zorunlu giderleri (kira, yol) kalıcı olarak düşürür.</Text>

        {ASSETS.map(asset => {
          const isOwned = state.inventory.includes(asset.id);
          return (
            <View key={asset.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{asset.title} {isOwned && '✅'}</Text>
                <Text style={styles.itemDesc}>{asset.desc}</Text>
              </View>
              <TouchableOpacity 
                style={[styles.buyBtn, isOwned && styles.buyBtnDisabled]} 
                onPress={() => handleBuyAsset(asset)}
                disabled={isOwned}
              >
                <Text style={styles.buyBtnText}>
                  {isOwned ? 'Sahipsin' : `${formatMoneyFull(asset.cost)}`}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  titleIcon: { fontSize: 20 },
  titleText: { fontSize: 18, fontWeight: '900', color: '#2c3e50' },
  infoText: { fontSize: 12, color: '#7f8c8d', marginBottom: 16, fontWeight: '600' },
  statText: { fontSize: 14, color: '#34495e', marginBottom: 4, fontWeight: '700' },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  },
  itemInfo: { flex: 1, paddingRight: 10 },
  itemTitle: { fontSize: 14, fontWeight: '800', color: '#2c3e50', marginBottom: 4 },
  itemDesc: { fontSize: 11, color: '#7f8c8d' },
  buyBtn: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    minWidth: 90,
    alignItems: 'center'
  },
  buyBtnDisabled: { backgroundColor: '#bdc3c7' },
  buyBtnText: { color: 'white', fontWeight: '800', fontSize: 12 }
});
