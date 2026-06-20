import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ImageBackground } from 'react-native';
import GlassView from '../components/GlassView';
import { BACKGROUND_STORIES } from '../data/characterModels';
import { getRandomQuestions } from '../data/quizQuestions';
import { SoundManager } from '../utils/SoundManager';
import { getTranslation } from '../i18n';
import { useGame } from '../state/GameContext';

const DREAMS = [
  { id: 'dream_rich', label: '💰 Zengin Olmak', bonus: { money: 500, happiness: 10 } },
  { id: 'dream_peace', label: '🧘 Huzurlu Yaşamak', bonus: { stress: -20, energy: 20 } },
  { id: 'dream_fame', label: '👑 Saygı Görmek', bonus: { reputation: 30, happiness: 10 } }
];

export default function CharacterCreationScreen({ onComplete }) {
  const { state } = useGame();
  const t = getTranslation(state?.language || 'tr');
  const [name, setName] = useState('Oyuncu');

  // Need to translate default name
  useEffect(() => {
    if (name === 'Oyuncu' && state?.language === 'en') {
      setName('Player');
    }
  }, [state?.language]);
  const [gender, setGender] = useState('Erkek');
  const [selectedStoryId, setSelectedStoryId] = useState(BACKGROUND_STORIES[1].id);
  const [selectedDreamId, setSelectedDreamId] = useState(DREAMS[0].id);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setQuestions(getRandomQuestions(2)); // Rastgele 2 ikilem sorusu
  }, []);

  const handleStart = () => {
    SoundManager.playClick();
    const selectedDream = DREAMS.find(d => d.id === selectedDreamId);
    
    // Toplam stat değişimlerini hesapla
    let combinedModifiers = {
      ...selectedDream.bonus
    };
    
    Object.values(answers).forEach(choice => {
      if (choice.modifiers) {
        Object.keys(choice.modifiers).forEach(key => {
          combinedModifiers[key] = (combinedModifiers[key] || 0) + choice.modifiers[key];
        });
      }
    });

    onComplete({
      storyId: selectedStoryId,
      name,
      gender,
      country: 'Türkiye',
      quizModifiers: combinedModifiers
    });
  };

  return (
    <ImageBackground source={require('../../assets/cozy_bg.png')} style={styles.background} resizeMode="cover">
      <View style={styles.darkOverlay} />
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <GlassView intensity={60} tint="dark" style={styles.card}>
          <Text style={styles.title}>{t('charCreation.title')}</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('charCreation.nameLabel')}</Text>
            <TextInput 
              style={styles.input} 
              value={name} 
              onChangeText={setName} 
              placeholder={t('charCreation.namePlaceholder')} 
              placeholderTextColor="#7f8c8d"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('charCreation.genderLabel')}</Text>
            <View style={styles.row}>
              <TouchableOpacity 
                style={[styles.genderBtn, gender === 'Erkek' && styles.genderBtnActive]}
                onPress={() => { SoundManager.playClick(); setGender('Erkek'); }}
                activeOpacity={0.7}
              >
                <Text style={[styles.genderBtnText, gender === 'Erkek' && styles.genderBtnTextActive]}>{t('charCreation.genderMale')}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.genderBtn, gender === 'Kadın' && styles.genderBtnActive]}
                onPress={() => { SoundManager.playClick(); setGender('Kadın'); }}
                activeOpacity={0.7}
              >
                <Text style={[styles.genderBtnText, gender === 'Kadın' && styles.genderBtnTextActive]}>{t('charCreation.genderFemale')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('charCreation.dreamLabel')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              {DREAMS.map(dream => (
                <TouchableOpacity
                  key={dream.id}
                  style={[styles.dreamBtn, selectedDreamId === dream.id && styles.dreamBtnActive]}
                  onPress={() => { SoundManager.playClick(); setSelectedDreamId(dream.id); }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dreamBtnText, selectedDreamId === dream.id && styles.dreamBtnTextActive]}>
                    {dream.id === 'dream_rich' ? t('charCreation.dreams.rich') : dream.id === 'dream_peace' ? t('charCreation.dreams.peace') : t('charCreation.dreams.fame')}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {questions.map((q, index) => (
            <View key={q.id} style={styles.inputGroup}>
              <Text style={styles.label}>{t('charCreation.questionLabel').replace('{index}', index + 1).replace('{question}', state.language === 'en' ? (q.question_en || q.question) : q.question)}</Text>
              <View style={styles.col}>
                {q.choices.map((choice, cIdx) => (
                  <TouchableOpacity 
                    key={cIdx} 
                    style={[styles.quizBtn, answers[q.id]?.text === choice.text && styles.quizBtnActive]} 
                    onPress={() => { SoundManager.playClick(); setAnswers({...answers, [q.id]: choice}); }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.quizBtnText, answers[q.id]?.text === choice.text && styles.quizBtnTextActive]}>
                      {state.language === 'en' ? (choice.text_en || choice.text) : choice.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <Text style={styles.label}>{t('charCreation.storyLabel')}</Text>
          <View style={styles.storyList}>
            {BACKGROUND_STORIES.map(story => (
              <TouchableOpacity 
                key={story.id} 
                style={[styles.storyCard, selectedStoryId === story.id && styles.storyCardActive]}
                onPress={() => { SoundManager.playClick(); setSelectedStoryId(story.id); }}
                activeOpacity={0.7}
              >
                <Text style={[styles.storyTitle, selectedStoryId === story.id && styles.storyTitleActive]}>{state.language === 'en' ? (story.title_en || story.title) : story.title}</Text>
                <Text style={styles.storyDesc}>{state.language === 'en' ? (story.description_en || story.description) : story.description}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.startBtn} onPress={handleStart} activeOpacity={0.7}>
            <Text style={styles.startBtnText}>{t('charCreation.startLife')}</Text>
          </TouchableOpacity>
        </GlassView>
      </ScrollView>
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
    backgroundColor: 'rgba(20, 15, 30, 0.85)',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },
  card: {
    padding: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffcda3',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffcda3',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
  },
  genderBtnActive: {
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    borderColor: '#3498db',
  },
  genderBtnText: {
    fontWeight: '700',
    color: '#a8b0c3',
    fontSize: 16,
  },
  genderBtnTextActive: {
    color: '#fff',
  },
  dreamBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
  },
  dreamBtnActive: {
    backgroundColor: 'rgba(241, 196, 15, 0.85)',
    borderColor: '#f1c40f',
  },
  dreamBtnText: {
    fontWeight: '700',
    color: '#a8b0c3',
    fontSize: 14,
  },
  dreamBtnTextActive: {
    color: '#fff',
  },
  col: {
    gap: 10,
  },
  quizBtn: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  quizBtnActive: {
    backgroundColor: 'rgba(155, 89, 182, 0.9)',
    borderColor: '#9b59b6',
  },
  quizBtnText: {
    fontWeight: '600',
    color: '#a8b0c3',
    fontSize: 13,
    lineHeight: 20,
  },
  quizBtnTextActive: {
    color: '#fff',
  },
  storyList: {
    marginBottom: 24,
  },
  storyCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  storyCardActive: {
    borderColor: '#2ecc71',
    backgroundColor: 'rgba(46, 204, 113, 0.85)',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#a8b0c3',
    marginBottom: 6,
  },
  storyTitleActive: {
    color: '#2ecc71',
  },
  storyDesc: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  startBtn: {
    backgroundColor: 'rgba(46, 204, 113, 0.8)',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2ecc71',
    marginTop: 10,
  },
  startBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
