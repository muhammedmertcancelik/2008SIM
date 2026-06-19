// ============================================
// KARAKTER MODELLERİ, HİKAYELER VE KADERLER
// ============================================

export const BACKGROUND_STORIES = [
  {
    id: 'story_poor',
    title: 'Fakir Aile',
    description: 'Maddi zorluklar içinde büyüdün. Hayata 1-0 geride başladın ama zorluklar seni daha dayanıklı yaptı.',
    initialModifiers: {
      money: 100,
      bankDebt: 0,
      job: 'İşsiz',
      salary: 0,
      // Gizli Özellikler (0-100)
      luck: 30,
      discipline: 70,
      hardwork: 80,
      patience: 75,
      riskTaking: 40,
      empathy: 80,
      confidence: 40,
      leadership: 30,
      intelligence: 50, // Ortalamadan başlar, genetiğe göre sapabilir
      // Başlangıç Seviyeleri (1-100)
      levels: {
        job: 1,
        finance: 1,
        education: 1,
        health: 5,
        social: 4,
        happiness: 3,
        prestige_neighborhood: 2,
        prestige_city: 1,
        prestige_country: 1
      }
    }
  },
  {
    id: 'story_middle',
    title: 'Orta Gelirli Aile',
    description: 'Sıradan bir ailede büyüdün. Her şey normal. Ne çok büyük bir şansın var, ne de büyük bir derdin.',
    initialModifiers: {
      money: 5000,
      bankDebt: 0,
      job: 'İşsiz',
      salary: 0,
      luck: 50,
      discipline: 50,
      hardwork: 50,
      patience: 50,
      riskTaking: 50,
      empathy: 50,
      confidence: 50,
      leadership: 50,
      intelligence: 50,
      levels: {
        job: 1,
        finance: 2,
        education: 3,
        health: 5,
        social: 5,
        happiness: 5,
        prestige_neighborhood: 5,
        prestige_city: 2,
        prestige_country: 1
      }
    }
  },
  {
    id: 'story_rich',
    title: 'Zengin Aile',
    description: 'Varlıklı bir ailenin çocuğusun. Hayata her anlamda önde başlıyorsun ancak şımarık yetişmiş olabilirsin.',
    initialModifiers: {
      money: 50000,
      bankDebt: 0,
      job: 'İşsiz',
      salary: 0,
      luck: 70,
      discipline: 30, // Zenginlik disiplini düşürebilir
      hardwork: 20,
      patience: 30,
      riskTaking: 70,
      empathy: 30,
      confidence: 80,
      leadership: 60,
      intelligence: 50,
      levels: {
        job: 1,
        finance: 5,
        education: 5,
        health: 8,
        social: 7,
        happiness: 8,
        prestige_neighborhood: 10,
        prestige_city: 6,
        prestige_country: 3
      }
    }
  },
  {
    id: 'story_officer',
    title: 'Memur Çocuğu',
    description: 'Garantici ve kurallara uyan bir ailede büyüdün. Risk almak sana göre değil ama disiplinlisin.',
    initialModifiers: {
      money: 3000,
      bankDebt: 0,
      job: 'İşsiz',
      salary: 0,
      luck: 50,
      discipline: 80,
      hardwork: 60,
      patience: 70,
      riskTaking: 20,
      empathy: 60,
      confidence: 50,
      leadership: 40,
      intelligence: 60,
      levels: {
        job: 1,
        finance: 3,
        education: 6,
        health: 6,
        social: 5,
        happiness: 5,
        prestige_neighborhood: 6,
        prestige_city: 3,
        prestige_country: 1
      }
    }
  }
];

export const FATE_TYPES = [
  {
    id: 'fate_struggle',
    title: 'Mücadeleci Hayat',
    effect: 'Kötü olayların gelme ihtimali %20 daha fazladır ancak başarıldığında kazanılan prestij ve mutluluk 1.5x artar.'
  },
  {
    id: 'fate_lucky',
    title: 'Şanslı Hayat',
    effect: 'İyi olayların gelme ihtimali %30 daha fazladır.'
  },
  {
    id: 'fate_unlucky',
    title: 'Talihsiz Hayat',
    effect: 'Piyango, şans oyunları ve tesadüfi iyi olayların olma ihtimali %50 azalır.'
  },
  {
    id: 'fate_average',
    title: 'Ortalama Hayat',
    effect: 'Olayların ihtimalleri standarttır.'
  }
];

// Başlangıç için rastgele bir karakter profili oluşturucu
export const generateCharacterProfile = (storyId, name, gender, country, extraTraits) => {
  const story = BACKGROUND_STORIES.find(s => s.id === storyId) || BACKGROUND_STORIES[1];
  
  // Kaderi rastgele atayabiliriz (kullanıcı bunu seçmesin, oyun arkada atasın)
  const randomFateIndex = Math.floor(Math.random() * FATE_TYPES.length);
  const fate = FATE_TYPES[randomFateIndex];

  // Yaş vb statik değerler
  const startingAge = 18;
  const startingYear = 2008; // Oyun 2008'de başlıyor

  const profileData = {
    profile: {
      name: name || 'İsimsiz',
      gender: gender || 'Erkek',
      country: country || 'Türkiye',
      age: startingAge,
      birthYear: startingYear - startingAge,
      storyId: story.id,
      fateId: fate.id,
    },
    // Gizli ve Açık Statları Hikayeden kopyala
    stats: { ...story.initialModifiers },
    // Dinamik değişkenler (100 üzerinden olanlar)
    vitals: {
      health: 100,
      happiness: 50,
      energy: 100,
      hunger: 100, // Yeni açlık sistemi (opsiyonel)
      social: 50,
      stress: 0,
      relationship: 50
    }
  };

  // Ekstra Sorulardan Gelen Dinamik Etkileri Uygula
  if (extraTraits && extraTraits.quizModifiers) {
    const mods = extraTraits.quizModifiers;
    Object.keys(mods).forEach(key => {
      // Eğer vitals içindeyse
      if (profileData.vitals[key] !== undefined) {
        profileData.vitals[key] += mods[key];
      } 
      // Eğer hiddenStats içindeyse
      else if (profileData.stats[key] !== undefined) {
        profileData.stats[key] += mods[key];
      }
    });

    // Değerleri 0-100 arasında sınırla
    ['luck', 'discipline', 'hardwork', 'patience', 'riskTaking', 'empathy', 'confidence', 'leadership', 'intelligence'].forEach(stat => {
      if (profileData.stats[stat]) {
        profileData.stats[stat] = Math.max(0, Math.min(100, profileData.stats[stat]));
      }
    });
    ['health', 'happiness', 'energy', 'social', 'stress', 'relationship'].forEach(vital => {
      if (profileData.vitals[vital] !== undefined) {
        profileData.vitals[vital] = Math.max(0, Math.min(100, profileData.vitals[vital]));
      }
    });
  }

  return profileData;
};
