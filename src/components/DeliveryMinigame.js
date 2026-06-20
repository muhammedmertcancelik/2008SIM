import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import GlassView from './GlassView';
import { useGame } from '../state/GameContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const LANE_WIDTH = 80;
const ITEM_SIZE = 50;
const PLAYER_SIZE = 50;

const OBSTACLES = ['🚗', '🚙', '🕳️', '🚧'];

export default function DeliveryMinigame({ onComplete, onFail }) {
  const { playClick } = useGame(); // optional sound
  const [isPlaying, setIsPlaying] = useState(false);
  const [lane, setLane] = useState(1); // 0: Left, 1: Center, 2: Right
  const [score, setScore] = useState(0); // Survived items
  const [coins, setCoins] = useState(0); // Collected coins
  const [gameOver, setGameOver] = useState(false);
  
  const itemY = useRef(new Animated.Value(-100)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const [itemLane, setItemLane] = useState(1);
  const [itemType, setItemType] = useState('OBSTACLE'); // 'OBSTACLE' or 'COIN'
  const [itemEmoji, setItemEmoji] = useState('🚗');
  
  const speed = useRef(1500);
  const animationRef = useRef(null);
  const scoreRef = useRef(0);
  const coinsRef = useRef(0);
  const laneRef = useRef(1);
  const itemLaneRef = useRef(1);
  const itemTypeRef = useRef('OBSTACLE');

  useEffect(() => { laneRef.current = lane; }, [lane]);
  useEffect(() => { itemLaneRef.current = itemLane; }, [itemLane]);
  useEffect(() => { itemTypeRef.current = itemType; }, [itemType]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setCoins(0);
    scoreRef.current = 0;
    coinsRef.current = 0;
    speed.current = 1500;
    setLane(1);
    
    // Yolu kaydır (scrolling effect)
    Animated.loop(
      Animated.timing(scrollY, {
        toValue: 200,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();

    spawnItem();
  };

  const spawnItem = () => {
    if (scoreRef.current >= 20) {
      // Kazanma
      onComplete(coinsRef.current);
      return;
    }

    const newLane = Math.floor(Math.random() * 3);
    const isCoin = Math.random() > 0.6; // 40% chance of coin
    
    setItemLane(newLane);
    itemLaneRef.current = newLane;
    
    if (isCoin) {
      setItemType('COIN');
      itemTypeRef.current = 'COIN';
      setItemEmoji('💰');
    } else {
      setItemType('OBSTACLE');
      itemTypeRef.current = 'OBSTACLE';
      setItemEmoji(OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)]);
    }
    
    itemY.setValue(-100);
    
    animationRef.current = Animated.timing(itemY, {
      toValue: SCREEN_HEIGHT - 200,
      duration: speed.current,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    animationRef.current.start(({ finished }) => {
      if (finished) {
        if (itemLaneRef.current === laneRef.current) {
          if (itemTypeRef.current === 'OBSTACLE') {
            handleGameOver();
          } else {
            // Collect coin
            coinsRef.current += 1;
            setCoins(coinsRef.current);
            if(playClick) playClick();
            continueGame();
          }
        } else {
          // Missed coin or dodged obstacle
          continueGame();
        }
      }
    });
  };

  const continueGame = () => {
    scoreRef.current += 1;
    setScore(scoreRef.current);
    speed.current = Math.max(700, speed.current - 40); // Hızlan
    spawnItem();
  };

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
    if (animationRef.current) animationRef.current.stop();
    scrollY.stopAnimation();
  };

  const moveLeft = () => {
    if (lane > 0) setLane(lane - 1);
  };

  const moveRight = () => {
    if (lane < 2) setLane(lane + 1);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) animationRef.current.stop();
      scrollY.stopAnimation();
    };
  }, []);

  if (!isPlaying && !gameOver) {
    return (
      <GlassView intensity={30} tint="dark" style={styles.container}>
        <Text style={styles.title}>🏍️ Kurye Macerası</Text>
        <Text style={styles.desc}>20 Paketi sağ salim teslim et!</Text>
        <Text style={styles.desc}>Yoldaki Altınları (💰) toplayarak bahşişini artır. Arabalara ve çukurlara dikkat et!</Text>
        <TouchableOpacity style={styles.startBtn} onPress={startGame}>
          <Text style={styles.startBtnText}>BAŞLA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={onFail}>
          <Text style={styles.cancelBtnText}>Vazgeç</Text>
        </TouchableOpacity>
      </GlassView>
    );
  }

  if (gameOver) {
    return (
      <GlassView intensity={40} tint="dark" style={styles.container}>
        <Text style={styles.title}>💥 KAZA YAPTIN!</Text>
        <Text style={styles.desc}>Kalan Teslimat: {20 - score}</Text>
        <Text style={styles.desc}>Toplanan Bahşiş: {coins} 💰</Text>
        <Text style={[styles.desc, {color: '#e74c3c'}]}>Hastaneye kaldırıldın ve motorda hasar var.</Text>
        <TouchableOpacity style={styles.cancelBtn} onPress={onFail}>
          <Text style={styles.cancelBtnText}>Kabul Et ve Çık (-30 TL, Sağlık Düşüşü)</Text>
        </TouchableOpacity>
      </GlassView>
    );
  }

  return (
    <GlassView intensity={20} tint="dark" style={styles.gameArea}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Paket: {score}/20</Text>
        <Text style={styles.coinText}>Bahşiş: {coins} 💰</Text>
      </View>
      
      <View style={styles.road}>
        {/* Hareketli Şerit Çizgileri */}
        <Animated.View style={[styles.laneLinesWrapper, { transform: [{ translateY: scrollY }] }]}>
          {[...Array(10)].map((_, i) => (
            <View key={`L1-${i}`} style={[styles.laneLine, { left: '33%', top: (i-2) * 80 }]} />
          ))}
          {[...Array(10)].map((_, i) => (
            <View key={`L2-${i}`} style={[styles.laneLine, { left: '66%', top: (i-2) * 80 }]} />
          ))}
        </Animated.View>

        {/* Engel veya Altın */}
        <Animated.View 
          style={[
            styles.item, 
            { 
              transform: [{ translateY: itemY }],
              left: itemLane * LANE_WIDTH + (LANE_WIDTH - ITEM_SIZE)/2
            }
          ]}
        >
          <Text style={styles.emoji}>{itemEmoji}</Text>
        </Animated.View>

        {/* Oyuncu (Kurye) */}
        <View style={[styles.player, { left: lane * LANE_WIDTH + (LANE_WIDTH - PLAYER_SIZE)/2 }]}>
          <Text style={styles.emoji}>🛵</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlBtn} onPress={moveLeft}>
          <Text style={styles.controlBtnText}>◀ SOL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn} onPress={moveRight}>
          <Text style={styles.controlBtnText}>SAĞ ▶</Text>
        </TouchableOpacity>
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    margin: 16,
    overflow: 'hidden',
  },
  title: { fontSize: 24, fontWeight: '900', color: '#ffcda3', marginBottom: 12 },
  desc: { fontSize: 14, color: '#a8b0c3', textAlign: 'center', marginBottom: 12, lineHeight: 20 },
  startBtn: { backgroundColor: 'rgba(255, 205, 163, 0.2)', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 20, marginTop: 20, borderWidth: 1, borderColor: '#ffcda3' },
  startBtnText: { color: '#ffcda3', fontWeight: '900', fontSize: 16 },
  cancelBtn: { marginTop: 20, paddingVertical: 12, paddingHorizontal: 20, backgroundColor: 'rgba(231, 76, 60, 0.2)', borderRadius: 20, borderWidth: 1, borderColor: '#e74c3c' },
  cancelBtnText: { color: '#e74c3c', fontWeight: '800', fontSize: 14 },
  
  gameArea: {
    height: 450,
    margin: 16,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  scoreText: { fontSize: 16, fontWeight: '900', color: '#a8b0c3' },
  coinText: { fontSize: 16, fontWeight: '900', color: '#f1c40f' },
  road: {
    flex: 1,
    flexDirection: 'row',
    width: LANE_WIDTH * 3,
    alignSelf: 'center',
    backgroundColor: 'rgba(20, 25, 40, 0.5)',
    overflow: 'hidden',
  },
  laneLinesWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
  },
  laneLine: {
    position: 'absolute',
    width: 4,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
  },
  item: {
    position: 'absolute',
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    position: 'absolute',
    bottom: 20,
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: { fontSize: 36 },
  controls: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  controlBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtnText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffcda3',
    letterSpacing: 2,
  },
});
