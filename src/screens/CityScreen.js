import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import GlassView from '../components/GlassView';
import { useGame } from '../state/GameContext';
import { getTranslation } from '../i18n';
import ReflexMinigame from '../components/ReflexMinigame';
import HackingMinigame from '../components/HackingMinigame';
import DeliveryMinigame from '../components/DeliveryMinigame';

export default function CityScreen() {
  const { state, dispatch } = useGame();
  const t = getTranslation(state?.language || 'tr');
  const [diceResult, setDiceResult] = useState(null);
  const [playingDelivery, setPlayingDelivery] = useState(false);

  const handleVisit = (name, locationData) => {
    if (state.energy < locationData.energyCost) {
      if (Platform.OS !== 'web') {
        dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.noEnergy'), message: t('city.alerts.noEnergyDesc').replace('{name}', name).replace('{cost}', locationData.energyCost) } });
      } else {
        alert(`${t('city.alerts.noEnergy')}: ${t('city.alerts.noEnergyDesc').replace('{name}', name).replace('{cost}', locationData.energyCost)}`);
      }
      return;
    }

    if (state.money < locationData.cost) {
      if (Platform.OS !== 'web') {
        dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.noMoney'), message: t('city.alerts.noMoneyDesc').replace('{name}', name).replace('{cost}', locationData.cost) } });
      } else {
        alert(`${t('city.alerts.noMoney')}: ${t('city.alerts.noMoneyDesc').replace('{name}', name).replace('{cost}', locationData.cost)}`);
      }
      return;
    }

    dispatch({ type: 'VISIT_LOCATION', payload: locationData });
    
    if (Platform.OS !== 'web') {
      dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.visitTitle'), message: t('city.alerts.visitDesc').replace('{name}', name).replace('{energy}', locationData.energyCost).replace('{money}', locationData.cost) } });
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
      dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.deliveryDone'), message: t('city.alerts.deliveryDoneDesc').replace('{coins}', coins).replace('{reward}', reward) } });
    } else {
      alert(`${t('city.alerts.deliveryDone')} ${t('city.alerts.deliveryDoneDesc').replace('{coins}', coins).replace('{reward}', reward)}`);
    }
  };

  const handleDeliveryFail = () => {
    setPlayingDelivery(false);
    dispatch({ 
      type: 'VISIT_LOCATION', 
      payload: { cost: 30, energyCost: 20, moneyChange: 0, stress: 30, health: -15 } 
    });
    if (Platform.OS !== 'web') {
      dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.accident'), message: t('city.alerts.accidentDesc') } });
    } else {
      alert(`${t('city.alerts.accident')} ${t('city.alerts.accidentDesc')}`);
    }
  };

  if (playingDelivery) {
    return <DeliveryMinigame onComplete={handleDeliveryComplete} onFail={handleDeliveryFail} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('city.title')}</Text>
      <Text style={styles.subtitle}>{t('city.subtitle')}</Text>

      {/* Sokak Büfesi */}
      <GlassView intensity={40} tint="dark" style={styles.card}>
        <Text style={styles.cardTitle}>{t('city.streetFood.title')}</Text>
        <Text style={styles.cardDesc}>{t('city.streetFood.desc')}</Text>
        <Text style={styles.cardStats}>{t('city.streetFood.req')}</Text>
        <Text style={styles.cardEffect}>{t('city.streetFood.effect')}</Text>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => handleVisit(t('city.streetFood.name'), { cost: 20, energyCost: 0, hunger: -50, health: 5, energy: 10 })}
        >
          <Text style={styles.btnText}>{t('city.streetFood.btn')}</Text>
        </TouchableOpacity>
      </GlassView>

      {/* Kurye Merkezi */}
      <GlassView intensity={40} tint="dark" style={styles.card}>
        <Text style={styles.cardTitle}>{t('city.delivery.title')}</Text>
        <Text style={styles.cardDesc}>{t('city.delivery.desc')}</Text>
        <Text style={styles.cardStats}>{t('city.delivery.req')}</Text>
        <Text style={styles.cardEffect}>{t('city.delivery.effect')}</Text>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => setPlayingDelivery(true)}
        >
          <Text style={styles.btnText}>{t('city.delivery.btn')}</Text>
        </TouchableOpacity>
      </GlassView>

      {/* Spor Salonu */}
      <GlassView intensity={40} tint="dark" style={styles.card}>
        <Text style={styles.cardTitle}>{t('city.gym.title')}</Text>
        <Text style={styles.cardDesc}>{t('city.gym.desc')}</Text>
        <Text style={styles.cardStats}>{t('city.gym.req')}</Text>
        <Text style={styles.cardEffect}>{t('city.gym.effect')}</Text>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => handleVisit(t('city.gym.name'), { cost: 30, energyCost: 40, health: 10 })}
        >
          <Text style={styles.btnText}>{t('city.gym.btn')}</Text>
        </TouchableOpacity>
      </GlassView>

      {/* Bar */}
      <GlassView intensity={40} tint="dark" style={styles.card}>
        <Text style={styles.cardTitle}>{t('city.bar.title')}</Text>
        <Text style={styles.cardDesc}>{t('city.bar.desc')}</Text>
        <Text style={styles.cardStats}>{t('city.bar.req')}</Text>
        <Text style={styles.cardEffect}>{t('city.bar.effect')}</Text>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => handleVisit(t('city.bar.name'), { cost: 50, energyCost: 20, stress: -30, happiness: 10, health: -5 })}
        >
          <Text style={styles.btnText}>{t('city.bar.btn')}</Text>
        </TouchableOpacity>
      </GlassView>

      {/* Kumarhane */}
      <GlassView intensity={40} tint="dark" style={[styles.card, styles.casinoCard]}>
        <Text style={styles.cardTitle}>{t('city.casino.title')}</Text>
        <Text style={styles.cardDesc}>{t('city.casino.desc')}</Text>
        <Text style={styles.cardStats}>{t('city.casino.req')}</Text>
        
        <ReflexMinigame 
          betAmount={100}
          onWin={handleWin}
          onLose={handleLose}
        />
      </GlassView>

      {/* İnternet Kafe - Karanlık Ağ */}
      <GlassView intensity={40} tint="dark" style={[styles.card, styles.hackCard]}>
        <Text style={styles.cardTitle}>{t('city.hack.title')}</Text>
        <Text style={styles.cardDesc}>{t('city.hack.desc')}</Text>
        <Text style={styles.cardStats}>{t('city.hack.req')}</Text>
        <Text style={[styles.cardEffect, {color: '#e74c3c'}]}>{t('city.hack.effect')}</Text>
        
        <HackingMinigame 
          onSuccess={handleHackSuccess}
          onFail={handleHackFail}
        />
      </GlassView>

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
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  casinoCard: {
    borderColor: 'rgba(142, 68, 173, 0.4)',
  },
  hackCard: {
    borderColor: 'rgba(22, 160, 133, 0.4)',
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
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 205, 163, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 205, 163, 0.3)',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  resultBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
