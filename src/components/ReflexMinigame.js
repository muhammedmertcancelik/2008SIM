import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

export default function ReflexMinigame({ onWin, onLose, betAmount }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const BAR_WIDTH = 250;
  const TARGET_START = 100;
  const TARGET_END = 150;
  
  const animationRef = useRef(null);

  const startGame = () => {
    setIsPlaying(true);
    setResult(null);
    animatedValue.setValue(0);
    
    // Yoyo animasyonu (Sürekli git-gel)
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: BAR_WIDTH,
          duration: 600, // Hız
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ])
    );
    
    animationRef.current.start();
  };

  const stopGame = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    setIsPlaying(false);
    
    // Anlık değeri al (hacky yol ama Animated.Value._value React Native'de çalışır)
    const currentVal = animatedValue.__getValue ? animatedValue.__getValue() : animatedValue._value;
    
    if (currentVal >= TARGET_START && currentVal <= TARGET_END) {
      setResult('win');
      onWin();
    } else {
      setResult('lose');
      onLose();
    }
  };

  return (
    <View style={styles.container}>
      {!isPlaying && !result && (
        <TouchableOpacity style={styles.startBtn} onPress={startGame}>
          <Text style={styles.btnText}>Oyuna Başla ({betAmount} TL)</Text>
        </TouchableOpacity>
      )}

      {(isPlaying || result) && (
        <View style={styles.gameArea}>
          <View style={[styles.bar, { width: BAR_WIDTH }]}>
            {/* Hedef Alan (Yeşil Bölge) */}
            <View style={[styles.targetZone, { left: TARGET_START, width: TARGET_END - TARGET_START }]} />
            
            {/* Hareket Eden İmleç */}
            <Animated.View style={[styles.cursor, { left: animatedValue }]} />
          </View>

          {isPlaying && (
            <TouchableOpacity style={styles.stopBtn} onPress={stopGame}>
              <Text style={styles.btnText}>ŞİMDİ DURDUR!</Text>
            </TouchableOpacity>
          )}

          {result === 'win' && (
            <View style={styles.resultBoxWin}>
              <Text style={styles.resultText}>HARİKA! Hedefi tutturdun. +{betAmount * 2} TL Kazandın!</Text>
              <TouchableOpacity style={styles.startBtn} onPress={startGame}>
                <Text style={styles.btnText}>Tekrar Oyna</Text>
              </TouchableOpacity>
            </View>
          )}

          {result === 'lose' && (
            <View style={styles.resultBoxLose}>
              <Text style={styles.resultText}>Kaçırdın! -{betAmount} TL Kaybettin.</Text>
              <TouchableOpacity style={styles.startBtn} onPress={startGame}>
                <Text style={styles.btnText}>Tekrar Oyna</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
    width: '100%'
  },
  startBtn: {
    backgroundColor: '#8e44ad',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  stopBtn: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  gameArea: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10
  },
  bar: {
    height: 30,
    backgroundColor: '#34495e',
    borderRadius: 15,
    position: 'relative',
    overflow: 'hidden'
  },
  targetZone: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(46, 204, 113, 0.5)', // Yarı saydam yeşil
  },
  cursor: {
    position: 'absolute',
    height: '100%',
    width: 10,
    backgroundColor: '#f1c40f',
    borderRadius: 5,
    marginLeft: -5 // Ortalamak için
  },
  resultBoxWin: {
    marginTop: 20,
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2ecc71'
  },
  resultBoxLose: {
    marginTop: 20,
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e74c3c'
  },
  resultText: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10
  }
});
