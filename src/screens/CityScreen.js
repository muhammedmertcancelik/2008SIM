import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { useGame } from '../state/GameContext';
import ReflexMinigame from '../components/ReflexMinigame';
import HackingMinigame from '../components/HackingMinigame';
import DeliveryMinigame from '../components/DeliveryMinigame';

export default function CityScreen() {
  const { state, dispatch } = useGame();
  const [diceResult, setDiceResult] = useState(null);
  const [playingDelivery, setPlayingDelivery] = useState(false);

  const handleVisit = (name, locationData) => {
    if (state.energy < locationData.energyCost) {
      if (Platform.OS !== 'web') {
        Alert.alert('Yetersiz Enerji', `${name} için en az ${locationData.energyCost} enerjin olmalı.`);
      } else {
        alert(`Yetersiz Enerji: ${name} için en az ${locationData.energyCost} enerjin olmalı.`);
      }
      return;
    }

    if (state.money < locationData.cost) {
      if (Platform.OS !== 'web') {
        Alert.alert('Yetersiz Para', `${name} için en az ${locationData.cost} TL paran olmalı.`);
      } else {
        alert(`Yetersiz Para: ${name} için en az ${locationData.cost} TL paran olmalı.`);
      }
      return;
    }

    dispatch({ type: 'VISIT_LOCATION', payload: locationData });
    
    if (Platform.OS !== 'web') {
      Alert.alert('Mekan Ziyareti', `${name} ziyaret edildi. Enerji: -${locationData.energyCost}, Para: -${locationData.cost} TL`);
    }
  };

  const handleWin = () => {
    dispatch({ 
      type: 'VISIT_LOCATION', 
      payload: { cost: 100, energyCost: 15, moneyChange: 150, stress: -5 } 
    });
  };

  const handleLose = () => {
    dispatch({ 
      type: 'VISIT_LOCATION', 
      payload: { cost: 100, energyCost: 15, moneyChange: 0, stress: 20 } 
    });
  };

  const handleHackSuccess = () => {
    dispatch({ 
      type: 'VISIT_LOCATION', 
      payload: { cost: 0, energyCost: 40, moneyChange: 150, wantedLevel: 20, stress: -10 } 
    });
  };

  const handleHackFail = () => {
    dispatch({ 
      type: 'VISIT_LOCATION', 
      payload: { cost: 0, energyCost: 40, wantedLevel: 35, stress: 30 } 
    });
  };

  const handleDeliveryComplete = (coins = 0) => {
    setPlayingDelivery(false);
    const reward = coins > 0 ? coins * 8 : 40; 
    dispatch({ 
      type: 'MINIGAME_COMPLETE', 
      payload: { rewardMoney: reward, rewardReputation: 2, rewardWantedLevel: -2 } 
    });
    if (Platform.OS !== 'web') {
      Alert.alert('Teslimat Bitti!', `Başarıyla teslimat yaptın ve yolda ${coins} altın topladın. Ödül: ${reward} TL`);
    } else {
      alert(`Teslimat Bitti! Yolda ${coins} altın topladın. Ödül: ${reward} TL`);
    }
  };

  const handleDeliveryFail = () => {
    setPlayingDelivery(false);
    dispatch({ 
      type: 'VISIT_LOCATION', 
      payload: { cost: 30, energyCost: 20, moneyChange: 0, stress: 30, health: -15 } 
    });
    if (Platform.OS !== 'web') {
      Alert.alert('Kaza!', 'Kaza yaptın! Hastane ve motor masrafı: -30 TL, Sağlık azaldı.');
    } else {
      alert('Kaza! Kaza yaptın! Hastane ve motor masrafı: -30 TL, Sağlık azaldı.');
    }
  };

  if (playingDelivery) {
    return <DeliveryMinigame onComplete={handleDeliveryComplete} onFail={handleDeliveryFail} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Şehir Rehberi</Text>
      <Text style={styles.subtitle}>Gün geçirmeden aktif olarak enerji harcayabileceğin mekanlar.</Text>

      {/* Sokak Büfesi */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍔 Sokak Büfesi</Text>
        <Text style={styles.cardDesc}>Tükettiğin enerjiyi ve artan açlığını bastırmak için ayaküstü bir şeyler atıştır.</Text>
        <Text style={styles.cardStats}>Gereksinim: 20 TL</Text>
        <Text style={styles.cardEffect}>Etki: Açlık -50, Enerji +10</Text>
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: '#f39c12'}]} 
          onPress={() => handleVisit('Sokak Büfesi', { cost: 20, energyCost: 0, hunger: -50, health: 5, energy: 10 })}
        >
          <Text style={styles.btnText}>Yemek Ye (20 TL)</Text>
        </TouchableOpacity>
      </View>

      {/* Kurye Merkezi */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛵 Kurye Merkezi</Text>
        <Text style={styles.cardDesc}>Trafikte tehlikeli kuryelik yaparak yeteneklerini test et.</Text>
        <Text style={styles.cardStats}>Gereksinim: Tehlikeli Teslimat Görevi</Text>
        <Text style={styles.cardEffect}>Ödül: 800 TL, +20 İtibar</Text>
        <TouchableOpacity 
          style={[styles.btn, {backgroundColor: '#e67e22'}]} 
          onPress={() => setPlayingDelivery(true)}
        >
          <Text style={styles.btnText}>Teslimata Başla</Text>
        </TouchableOpacity>
      </View>

      {/* Spor Salonu */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏋️‍♂️ Spor Salonu</Text>
        <Text style={styles.cardDesc}>Sağlığını korumak ve fit kalmak için ter dök.</Text>
        <Text style={styles.cardStats}>Gereksinim: 40 Enerji, 30 TL</Text>
        <Text style={styles.cardEffect}>Etki: Sağlık +10</Text>
        <TouchableOpacity 
          style={[styles.btn, styles.gymBtn]} 
          onPress={() => handleVisit('Spor Salonu', { cost: 30, energyCost: 40, health: 10 })}
        >
          <Text style={styles.btnText}>Antrenman Yap</Text>
        </TouchableOpacity>
      </View>

      {/* Bar */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍻 Köhne Bar</Text>
        <Text style={styles.cardDesc}>İş stresini atmak için bir iki kadeh bir şeyler iç.</Text>
        <Text style={styles.cardStats}>Gereksinim: 20 Enerji, 50 TL</Text>
        <Text style={styles.cardEffect}>Etki: Stres -30, Mutluluk +10, Sağlık -5</Text>
        <TouchableOpacity 
          style={[styles.btn, styles.barBtn]} 
          onPress={() => handleVisit('Köhne Bar', { cost: 50, energyCost: 20, stress: -30, happiness: 10, health: -5 })}
        >
          <Text style={styles.btnText}>Bara Gir</Text>
        </TouchableOpacity>
      </View>

      {/* Kumarhane */}
      <View style={[styles.card, styles.casinoCard]}>
        <Text style={styles.cardTitle}>🎲 Yeraltı Kumarhanesi</Text>
        <Text style={styles.cardDesc}>Dikkat ve refleks testi! Çizgi yeşil alandayken ŞİMDİ DURDUR tuşuna basarak bahsini ikiye katla. Zamanlaman kötüyse paranı kaybedersin.</Text>
        <Text style={styles.cardStats}>Bahis: 100 TL | Gereksinim: 10 Enerji</Text>
        
        <ReflexMinigame 
          betAmount={100}
          onWin={handleWin}
          onLose={handleLose}
        />
      </View>

      {/* İnternet Kafe - Karanlık Ağ */}
      <View style={[styles.card, styles.hackCard]}>
        <Text style={styles.cardTitle}>💻 İnternet Kafe (Karanlık Ağ)</Text>
        <Text style={styles.cardDesc}>Bir banka sistemine sızmaya çalış. 3 round'da hedef kodları yakala. Başarırsan büyük para, başarısamazsan polis peşinde!</Text>
        <Text style={styles.cardStats}>Gereksinim: 30 Enerji | Kazanc: +2000 TL</Text>
        <Text style={[styles.cardEffect, {color: '#e74c3c'}]}>Risk: Aranma Seviyesi +15 (Başarı) / +30 (Başarısız)</Text>
        
        <HackingMinigame 
          onSuccess={handleHackSuccess}
          onFail={handleHackFail}
        />
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(142, 68, 173, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(142, 68, 173, 0.25)'
  },
  casinoCard: {
    borderColor: '#8e44ad',
    borderWidth: 2,
  },
  hackCard: {
    borderColor: '#16a085',
    borderWidth: 2,
    backgroundColor: '#1a2a2a',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardDesc: {
    color: '#bdc3c7',
    fontSize: 13,
    marginBottom: 10,
  },
  cardStats: {
    color: '#e74c3c',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardEffect: {
    color: '#2ecc71',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  btn: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  gymBtn: {
    backgroundColor: '#27ae60',
  },
  barBtn: {
    backgroundColor: '#d35400',
  },
  casinoBtn: {
    backgroundColor: '#8e44ad',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  resultBox: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center'
  },
  resultText: {
    color: '#f1c40f',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
