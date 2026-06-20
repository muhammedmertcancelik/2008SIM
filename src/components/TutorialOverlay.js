import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import GlassView from './GlassView';
import { SoundManager } from '../utils/SoundManager';

const TUTORIAL_STEPS = [
  {
    title: 'Lifeline\'a Hoş Geldin!',
    text: 'Yukarıda temel ihtiyaçların (Sağlık, Stres, Açlık, Enerji) ve cebindeki paran bulunuyor. Bu değerleri dengede tutmak hayatta kalmanın birinci kuralıdır.',
    emoji: '📊',
    highlight: 'top',
  },
  {
    title: 'Mesleğini Seç',
    text: 'Hayatta kalmak için paraya ihtiyacın var. "İş" sekmesinden bir mesleğe girip çalışarak günlük yevmiyeni kazanmalısın.',
    emoji: '💼',
    highlight: 'bottom',
  },
  {
    title: 'İhtiyaçlarını Gider',
    text: 'Kazandığın parayla "Alışveriş" sekmesinden yemek ve eşya almalısın. Aç kalırsan sağlığın düşer ve oyunu kaybedersin.',
    emoji: '🛒',
    highlight: 'bottom',
  },
  {
    title: 'Hikayeni Yaşa',
    text: '"Kitabım" senin yaşayan hikayendir. Geçirdiğin her gün buraya yazılır. Ayrıca mahallede tanıştığın karakterlerle buradan görüşüp ilişkilerini geliştirebilirsin.',
    emoji: '📖',
    highlight: 'bottom',
  },
  {
    title: 'Günü Bitir',
    text: 'Unutma: Her gün mutlaka en az 1 efor (Çalışmak, Kuryelik veya Karakterle Görüşmek) harcamalısın. Eforunu harcadıktan sonra "Günü Bitir" diyerek hayatına devam et. Bol şans!',
    emoji: '⏳',
    highlight: 'center',
  }
];

export default function TutorialOverlay({ visible, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!visible) return null;

  const stepData = TUTORIAL_STEPS[currentStep];

  const handleNext = () => {
    SoundManager.playClick();
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    SoundManager.playClick();
    onComplete();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <GlassView intensity={70} tint="dark" style={StyleSheet.absoluteFill} />
        
        <View style={styles.content}>
          <Text style={styles.emoji}>{stepData.emoji}</Text>
          <Text style={styles.title}>{stepData.title}</Text>
          <Text style={styles.text}>{stepData.text}</Text>
          
          <View style={styles.progressContainer}>
            {TUTORIAL_STEPS.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.progressDot, 
                  index === currentStep && styles.progressDotActive,
                  index < currentStep && styles.progressDotCompleted
                ]} 
              />
            ))}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
              <Text style={styles.skipBtnText}>Turu Atla</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextBtnText}>
                {currentStep === TUTORIAL_STEPS.length - 1 ? 'Başla!' : 'İleri'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    backgroundColor: '#2c3e50',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffcda3',
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    color: '#ecf0f1',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressDotActive: {
    width: 20,
    backgroundColor: '#3498db',
  },
  progressDotCompleted: {
    backgroundColor: 'rgba(52, 152, 219, 0.5)',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  skipBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  skipBtnText: {
    color: '#bdc3c7',
    fontWeight: '700',
    fontSize: 15,
  },
  nextBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  nextBtnText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 15,
  },
});
