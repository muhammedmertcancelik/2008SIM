import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const CODES = [
  'A7F2', 'X9K1', 'B3M8', 'Q5R0', 'T6W4', 'Z1P9', 'H8C3', 'L2D7', 'N4J6', 'Y0S5',
  'E3V1', 'U7G8', 'K9F2', 'W4M0', 'R6B5', 'P1X3', 'D8N7', 'J2T9', 'C5H4', 'S0L6'
];

export default function HackingMinigame({ onSuccess, onFail }) {
  const [phase, setPhase] = useState('idle'); // idle, playing, success, fail
  const [targetCode, setTargetCode] = useState('');
  const [displayedCodes, setDisplayedCodes] = useState([]);
  const [timeLeft, setTimeLeft] = useState(5);
  const [round, setRound] = useState(0);
  const [totalRounds] = useState(3);
  const timerRef = useRef(null);
  const codeIntervalRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(codeIntervalRef.current);
    };
  }, []);

  const startGame = () => {
    setPhase('playing');
    setRound(1);
    startRound();
  };

  const startRound = () => {
    // Hedef kodu belirle
    const target = CODES[Math.floor(Math.random() * CODES.length)];
    setTargetCode(target);
    setTimeLeft(5);

    // Süre sayacı
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          clearInterval(codeIntervalRef.current);
          setPhase('fail');
          if (onFail) onFail();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Ekranda kayan kodlar (her 400ms'de değiş)
    generateNewCodes(target);
    clearInterval(codeIntervalRef.current);
    codeIntervalRef.current = setInterval(() => {
      generateNewCodes(target);
    }, 600);

    // Nabız animasyonu
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 300, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ])
    ).start();
  };

  const generateNewCodes = (target) => {
    // 6 kod göster, içlerinden biri hedef
    const codes = [];
    const targetPos = Math.floor(Math.random() * 6);
    for (let i = 0; i < 6; i++) {
      if (i === targetPos) {
        codes.push({ code: target, isTarget: true });
      } else {
        let randomCode;
        do {
          randomCode = CODES[Math.floor(Math.random() * CODES.length)];
        } while (randomCode === target);
        codes.push({ code: randomCode, isTarget: false });
      }
    }
    setDisplayedCodes(codes);
  };

  const handleCodePress = (item) => {
    if (phase !== 'playing') return;

    if (item.isTarget) {
      clearInterval(timerRef.current);
      clearInterval(codeIntervalRef.current);

      const nextRound = round + 1;
      if (nextRound > totalRounds) {
        // Tüm roundları geçti!
        setPhase('success');
        if (onSuccess) onSuccess();
      } else {
        // Sonraki round
        setRound(nextRound);
        startRound();
      }
    } else {
      // Yanlış koda bastı
      clearInterval(timerRef.current);
      clearInterval(codeIntervalRef.current);
      setPhase('fail');
      if (onFail) onFail();
    }
  };

  const reset = () => {
    setPhase('idle');
    setRound(0);
    setTimeLeft(5);
    setDisplayedCodes([]);
    clearInterval(timerRef.current);
    clearInterval(codeIntervalRef.current);
  };

  if (phase === 'idle') {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Ekranda kayan kodlar arasından hedef kodu bul ve tıkla. 3 round'u da geçersen sistemi hacklersin. Yanlış koda basarsan veya süre biterse yakalanırsın!
        </Text>
        <TouchableOpacity style={styles.startBtn} onPress={startGame}>
          <Text style={styles.btnText}>Hacklemeye Başla</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (phase === 'success') {
    return (
      <View style={styles.container}>
        <View style={styles.successBox}>
          <Text style={styles.successText}>SİSTEM HACKLENDİ!</Text>
          <Text style={styles.successSubText}>Banka hesabından para aktarıldı. Büyük ikramiye!</Text>
        </View>
        <TouchableOpacity style={styles.startBtn} onPress={reset}>
          <Text style={styles.btnText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (phase === 'fail') {
    return (
      <View style={styles.container}>
        <View style={styles.failBox}>
          <Text style={styles.failText}>YAKALANDIN!</Text>
          <Text style={styles.failSubText}>Güvenlik duvarı seni tespit etti. Polis aranma seviyen arttı!</Text>
        </View>
        <TouchableOpacity style={styles.startBtn} onPress={reset}>
          <Text style={styles.btnText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Playing phase
  return (
    <Animated.View style={[styles.container, { transform: [{ scale: pulseAnim }] }]}>
      <View style={styles.header}>
        <Text style={styles.roundText}>Round {round}/{totalRounds}</Text>
        <Text style={[styles.timerText, timeLeft <= 2 && { color: '#e74c3c' }]}>⏱ {timeLeft}s</Text>
      </View>

      <View style={styles.targetRow}>
        <Text style={styles.targetLabel}>HEDEF KOD:</Text>
        <Text style={styles.targetCodeText}>{targetCode}</Text>
      </View>

      <View style={styles.codeGrid}>
        {displayedCodes.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.codeBtn}
            onPress={() => handleCodePress(item)}
            activeOpacity={0.5}
          >
            <Text style={styles.codeText}>{item.code}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  instructions: {
    color: '#bdc3c7',
    fontSize: 13,
    marginBottom: 15,
    lineHeight: 20,
  },
  startBtn: {
    backgroundColor: '#16a085',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  roundText: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timerText: {
    color: '#f1c40f',
    fontWeight: 'bold',
    fontSize: 18,
  },
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    gap: 10,
  },
  targetLabel: {
    color: '#95a5a6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  targetCodeText: {
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'monospace',
    letterSpacing: 4,
  },
  codeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  codeBtn: {
    width: '30%',
    backgroundColor: 'rgba(52, 73, 94, 0.8)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  codeText: {
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
  successBox: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    borderWidth: 1,
    borderColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  successText: {
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  successSubText: {
    color: '#bdc3c7',
    fontSize: 13,
  },
  failBox: {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    borderWidth: 1,
    borderColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  failText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  failSubText: {
    color: '#bdc3c7',
    fontSize: 13,
  },
});
