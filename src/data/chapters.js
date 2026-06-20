// ============================================
// BÖLÜM (CHAPTER) SİSTEMİ — Romanın Evreleri
// ============================================

export const CHAPTERS = [
  {
    id: 'ch1',
    number: 1,
    title: 'Yeni Bir Hayat',
    title_en: 'A New Life',
    subtitle: '"Her şey bir ilk adımla başlar."',
    subtitle_en: '"Everything starts with a first step."',
    monthStart: 0,
    monthEnd: 2,    // Ay 0-2 (ilk 3 ay)
    pageStart: 1,
    pageEnd: 30,
    theme: 'survival',
    aiTone: 'Yumuşak, tanıtıcı, umut dolu. Karakter dünyayı keşfediyor. Olaylar basit ve öğretici.',
    aiTone_en: 'Soft, introductory, hopeful. The character is exploring the world. Events are simple and instructive.',
    description: 'Yeni bir şehre geldin. Mahalleyi tanı, ilk işini bul, ayakta kalmayı öğren.',
    description_en: 'You came to a new city. Get to know the neighborhood, find your first job, learn to survive.',
    npcsIntroduced: ['hasan_abi', 'fatma_teyze'],
  },
  {
    id: 'ch2',
    number: 2,
    title: 'Kökler Salıyor',
    title_en: 'Taking Roots',
    subtitle: '"İnsan bir yere ait olmaya başlayınca değişir."',
    subtitle_en: '"A person changes when they start to belong somewhere."',
    monthStart: 3,
    monthEnd: 7,    // Ay 3-7 (5 ay)
    pageStart: 31,
    pageEnd: 60,
    theme: 'socializing',
    aiTone: 'Sıcak, dostça, ilişki kurucu. Arkadaşlıklar ve bağlar ön planda. Hafif dramatik anlar.',
    aiTone_en: 'Warm, friendly, relationship building. Friendships and bonds are at the forefront. Light dramatic moments.',
    description: 'Mahalleli seni tanımaya başladı. Arkadaşlıklar kurdun, belki bir işe girdin. Kökler salıyorsun.',
    description_en: 'The neighborhood started to know you. You made friends, maybe got a job. You are taking roots.',
    npcsIntroduced: ['emre', 'cemal_bey'],
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Fırtına Öncesi',
    title_en: 'Before the Storm',
    subtitle: '"Sakin deniz, iyi kaptan yetiştirmez."',
    subtitle_en: '"A calm sea does not make a skilled sailor."',
    monthStart: 8,
    monthEnd: 13,   // Ay 8-13 (6 ay)
    pageStart: 61,
    pageEnd: 95,
    theme: 'crisis',
    aiTone: 'Gergin, kaotik, endişe verici. 2008 ekonomik krizi patlıyor. İşler sarsılır. Büyük kararlar.',
    aiTone_en: 'Tense, chaotic, worrying. The 2008 economic crisis hits. Businesses are shaken. Big decisions.',
    description: 'Ekonomik kriz kapıda. İş kayıpları, fiyat artışları, belirsizlik. Ayakta kalmak zorlaşıyor.',
    description_en: 'The economic crisis is at the door. Job losses, price hikes, uncertainty. Surviving becomes harder.',
    npcsIntroduced: ['elif', 'kara_mehmet', 'komiser_aydin'],
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Derin Sular',
    title_en: 'Deep Waters',
    subtitle: '"Karanlıkta yürürken asıl karakterin ortaya çıkar."',
    subtitle_en: '"True character is revealed when walking in the dark."',
    monthStart: 14,
    monthEnd: 21,   // Ay 14-21 (8 ay)
    pageStart: 96,
    pageEnd: 130,
    theme: 'moral_dilemma',
    aiTone: 'Ağır, derin, ahlaki ikilemlerle dolu. Karakterin gerçek yüzü ortaya çıkıyor. Yeraltı teklifleri, ihanetler.',
    aiTone_en: 'Heavy, deep, full of moral dilemmas. The true face of the character is revealed. Underground offers, betrayals.',
    description: 'Kolay seçimler bitti. Artık her karar bir bedel. Kimin yanında duruyorsun?',
    description_en: 'Easy choices are over. Now every decision has a price. Whose side are you on?',
    npcsIntroduced: [],
  },
  {
    id: 'ch5',
    number: 5,
    title: 'Son Perde',
    title_en: 'Final Curtain',
    subtitle: '"Her hikayenin bir sonu vardır. Önemli olan nasıl bittiğidir."',
    subtitle_en: '"Every story has an end. What matters is how it ends."',
    monthStart: 22,
    monthEnd: 29,   // Ay 22-29 (8 ay)
    pageStart: 131,
    pageEnd: 150,
    theme: 'conclusion',
    aiTone: 'Nostaljik, kapanışa yönelik, duygusal. Tüm ilişkiler ve kararlar meyvesini veriyor. Hikaye kapanıyor.',
    aiTone_en: 'Nostalgic, closure-oriented, emotional. All relationships and decisions bear fruit. The story ends.',
    description: 'Son sayfalar yazılıyor. Tüm kararlarının meyvesini toplama zamanı.',
    description_en: 'The final pages are being written. Time to reap the fruits of all your decisions.',
    npcsIntroduced: [],
  }
];

// Ay sayısına göre mevcut bölümü döndürür
export const getCurrentChapter = (monthCount) => {
  for (let i = CHAPTERS.length - 1; i >= 0; i--) {
    if (monthCount >= CHAPTERS[i].monthStart) {
      return CHAPTERS[i];
    }
  }
  return CHAPTERS[0];
};

// Mevcut bölüm indeksini döndürür (0-4)
export const getCurrentChapterIndex = (monthCount) => {
  for (let i = CHAPTERS.length - 1; i >= 0; i--) {
    if (monthCount >= CHAPTERS[i].monthStart) {
      return i;
    }
  }
  return 0;
};

// Toplam sayfa sayısı
export const TOTAL_PAGES = 150;

// Ay sayısına göre mevcut sayfa numarasını hesaplar (yaklaşık)
export const getPageNumber = (monthCount, dayInMonth) => {
  // Her ay yaklaşık 5 sayfa (30 ay × 5 = 150 sayfa)
  return Math.min(TOTAL_PAGES, (monthCount * 5) + Math.ceil(dayInMonth / 6));
};

// Son bölümün son ayını döndürür
export const FINAL_MONTH = CHAPTERS[CHAPTERS.length - 1].monthEnd;
