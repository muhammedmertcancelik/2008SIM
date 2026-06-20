import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { CHAPTERS } from '../data/chapters';

export default function ChapterIntroModal({ chapterIndex, onDismiss }) {
  const chapter = CHAPTERS[chapterIndex];
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!chapter) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.chapterLabel}>Bölüm {chapter.number}</Text>
        <View style={styles.divider} />
        <Text style={styles.chapterTitle}>{chapter.title}</Text>
        <Text style={styles.chapterSubtitle}>{chapter.subtitle}</Text>
        <Text style={styles.chapterDesc}>{chapter.description}</Text>
        
        <TouchableOpacity style={styles.continueBtn} onPress={onDismiss} activeOpacity={0.7}>
          <Text style={styles.continueBtnText}>Sayfayı Çevir →</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(5, 2, 15, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  content: {
    width: '85%',
    alignItems: 'center',
    padding: 40,
  },
  chapterLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7f8c8d',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: '#ffcda3',
    marginBottom: 20,
  },
  chapterTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffcda3',
    textAlign: 'center',
    marginBottom: 12,
  },
  chapterSubtitle: {
    fontSize: 16,
    color: '#a8b0c3',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  chapterDesc: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  continueBtn: {
    backgroundColor: 'rgba(255, 205, 163, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 205, 163, 0.5)',
  },
  continueBtnText: {
    color: '#ffcda3',
    fontSize: 16,
    fontWeight: '800',
  },
});
