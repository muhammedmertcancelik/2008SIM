import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import GlassView from '../components/GlassView';
import { SoundManager } from '../utils/SoundManager';
import { useGame } from '../state/GameContext';

export default function WelcomeScreen({ onContinue, onNewGame }) {
  const { state } = useGame();
  const hasSave = state.isCharacterCreated;

  return (
    <ImageBackground source={require('../../assets/cozy_bg.png')} style={styles.background} resizeMode="cover">
      <View style={styles.darkOverlay} />
      <View style={styles.container}>
        <GlassView intensity={80} tint="dark" style={styles.content}>
          <Text style={styles.title}>LIFELINE</Text>
          <Text style={styles.subtitle}>Hayata Tutunma Mücadelesi</Text>

          <View style={styles.buttonContainer}>
            {hasSave && (
              <TouchableOpacity 
                style={[styles.btn, styles.continueBtn]} 
                onPress={() => {
                  SoundManager.playClick();
                  onContinue();
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.btnText}>Devam Et</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={[styles.btn, styles.newGameBtn]} 
              onPress={() => {
                SoundManager.playClick();
                onNewGame();
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.btnText}>Yeni Oyun</Text>
            </TouchableOpacity>
          </View>
        </GlassView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20, 15, 30, 0.4)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    padding: 32,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffcda3',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#a8b0c3',
    marginBottom: 48,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  btn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  continueBtn: {
    backgroundColor: 'rgba(46, 204, 113, 0.6)',
    borderColor: 'rgba(46, 204, 113, 0.8)',
  },
  newGameBtn: {
    backgroundColor: 'rgba(255, 205, 163, 0.5)',
    borderColor: 'rgba(255, 205, 163, 0.8)',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  }
});
