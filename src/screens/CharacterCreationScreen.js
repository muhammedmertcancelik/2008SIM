import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { BACKGROUND_STORIES } from '../data/characterModels';
import { getRandomQuestions } from '../data/quizQuestions';

export default function CharacterCreationScreen({ onComplete }) {
  const [name, setName] = useState('Oyuncu');
  const [gender, setGender] = useState('Erkek');
  const [selectedStoryId, setSelectedStoryId] = useState(BACKGROUND_STORIES[1].id); // Default to middle
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setQuestions(getRandomQuestions(2)); // Rastgele 2 ikilem sorusu
  }, []);

  const handleStart = () => {
    // Toplam stat değişimlerini hesapla
    let combinedModifiers = {};
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
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Karakterini Oluştur</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>İsim:</Text>
        <TextInput 
          style={styles.input} 
          value={name} 
          onChangeText={setName} 
          placeholder="İsminizi girin" 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cinsiyet:</Text>
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.genderBtn, gender === 'Erkek' && styles.genderBtnActive]}
            onPress={() => setGender('Erkek')}
          >
            <Text style={[styles.genderBtnText, gender === 'Erkek' && styles.genderBtnTextActive]}>Erkek</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.genderBtn, gender === 'Kadın' && styles.genderBtnActive]}
            onPress={() => setGender('Kadın')}
          >
            <Text style={[styles.genderBtnText, gender === 'Kadın' && styles.genderBtnTextActive]}>Kadın</Text>
          </TouchableOpacity>
        </View>
      </View>

      {questions.map((q, index) => (
        <View key={q.id} style={styles.inputGroup}>
          <Text style={styles.label}>{index + 1}. Soru: {q.question}</Text>
          <View style={styles.col}>
            {q.choices.map((choice, cIdx) => (
              <TouchableOpacity 
                key={cIdx} 
                style={[styles.quizBtn, answers[q.id]?.text === choice.text && styles.quizBtnActive]} 
                onPress={() => setAnswers({...answers, [q.id]: choice})}
              >
                <Text style={[styles.quizBtnText, answers[q.id]?.text === choice.text && styles.quizBtnTextActive]}>
                  {choice.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <Text style={styles.label}>Geçmiş Hikayesi Seç:</Text>
      <View style={styles.storyList}>
        {BACKGROUND_STORIES.map(story => (
          <TouchableOpacity 
            key={story.id} 
            style={[styles.storyCard, selectedStoryId === story.id && styles.storyCardActive]}
            onPress={() => setSelectedStoryId(story.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.storyTitle, selectedStoryId === story.id && styles.storyTitleActive]}>{story.title}</Text>
            <Text style={styles.storyDesc}>{story.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
        <Text style={styles.startBtnText}>Hayata Başla</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#2f3640'
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    alignItems: 'center',
  },
  genderBtnActive: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  genderBtnText: {
    fontWeight: '600',
    color: '#7f8c8d',
  },
  genderBtnTextActive: {
    color: 'white',
  },
  col: {
    gap: 8,
  },
  quizBtn: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    justifyContent: 'center',
  },
  quizBtnActive: {
    backgroundColor: '#8e44ad',
    borderColor: '#8e44ad',
  },
  quizBtnText: {
    fontWeight: '600',
    color: '#7f8c8d',
    fontSize: 12,
  },
  quizBtnTextActive: {
    color: 'white',
  },
  storyList: {
    flex: 1,
    marginBottom: 16,
  },
  storyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  storyCardActive: {
    borderColor: '#2ecc71',
    backgroundColor: '#f9fff9',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 4,
  },
  storyTitleActive: {
    color: '#27ae60',
  },
  storyDesc: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  startBtn: {
    backgroundColor: '#2ecc71',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  }
});
