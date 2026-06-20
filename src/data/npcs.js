// ============================================
// YAN KARAKTERLER (NPC) SİSTEMİ
// ============================================

export const NPCS = [
  {
    id: 'hasan_abi',
    name: 'Hasan Abi',
    emoji: '🏪',
    role: 'Mahalle Bakkalı',
    personality: 'Bilge, sakin, her şeyi görmüş geçirmiş bir esnaf. Veresiye defterini hâlâ tutar. Hayat dersi verir ama baskı yapmaz.',
    introChapter: 0, // Bölüm 1'de otomatik tanışılır
    introCondition: null, // Koşulsuz
    dialogues: {
      poor: '"Oğlum defter kalın ama yürek temiz olduktan sonra sorun yok."',
      rich: '"Maşallah, ama sakın değişme ha."',
      stressed: '"Bir çay koy, otur. Dünya yıkılmıyor."',
      default: '"Günaydın, bugün nasılsın bakalım?"'
    },
    role_en: "Neighborhood Grocer",
    personality_en: "Wise, calm, a shopkeeper who has seen it all. Still keeps a credit notebook. Gives life lessons but doesn't pressure.",
    dialogues_en: {
      poor: "\"Son, the notebook is thick, but as long as your heart is clean, it's fine.\"",
      rich: "\"Mashallah, but don't you change, eh.\"",
      stressed: "\"Pour some tea, sit down. The world is not ending.\"",
      default: "\"Good morning, how are you today?\""
    }
  },
  {
    id: 'fatma_teyze',
    name: 'Fatma Teyze',
    emoji: '🧕',
    role: 'Üst Komşu',
    personality: 'Dedikoducu ama iyi kalpli. Her şeyi bilir, herkesi tanır. Çorbasını paylaşır ama karşılığında bilgi ister.',
    introChapter: 0,
    introCondition: null,
    dialogues: {
      poor: '"Ay oğlum aç mısın? Gel bi tabak çorba koyayım."',
      rich: '"Alt kattaki çocuk çok para kazanıyormuş, ne iş yapıyorsun sen?"',
      stressed: '"Yüzün düşük, hayrola? Anlatmak istemezsen zorlamam ama..."',
      default: '"Merhaba komşu, bugün hava güzel değil mi?"'
    },
    role_en: "Upstairs Neighbor",
    personality_en: "Gossipy but kind-hearted. Knows everything and everyone. Shares her soup but expects information in return.",
    dialogues_en: {
      poor: "\"Oh my son, are you hungry? Let me give you a bowl of soup.\"",
      rich: "\"I heard the kid downstairs makes a lot of money, what do you do?\"",
      stressed: "\"You look down, what's wrong? I won't force you if you don't want to tell...\"",
      default: "\"Hello neighbor, beautiful weather today, isn't it?\""
    }
  },
  {
    id: 'cemal_bey',
    name: 'Cemal Bey',
    emoji: '👨‍💼',
    role: 'İlk Patron',
    personality: 'Sert ama adil. İşine sadıkların arkasında durur ama tembelliğe tahammülü yoktur. Eski usul bir iş adamı.',
    introChapter: 0,
    introCondition: { type: 'hasJob' }, // İlk iş bulduğunda tanışılır
    dialogues: {
      poor: '"Bu dünyada çalışmayan aç kalır. Basit."',
      rich: '"Helal olsun, kendi ayakların üstünde duruyorsun artık."',
      stressed: '"İş stresi normaldir. Dayanamayan bu yolda yürüyemez."',
      default: '"Günaydın. Bugün de tam gaz."'
    },
    role_en: "First Boss",
    personality_en: "Tough but fair. Stands behind the loyal ones but has no tolerance for laziness. An old-school businessman.",
    dialogues_en: {
      poor: "\"In this world, those who don't work go hungry. Simple.\"",
      rich: "\"Well done, you stand on your own two feet now.\"",
      stressed: "\"Work stress is normal. Those who can't endure can't walk this path.\"",
      default: "\"Good morning. Full throttle today as well.\""
    }
  },
  {
    id: 'emre',
    name: 'Emre',
    emoji: '🧑',
    role: 'Mahalle Arkadaşı',
    personality: 'Maceracı, enerjik, bazen düşüncesiz. Hep bir planı vardır ama planları genelde çılgıncadır. Sadık bir dostur.',
    introChapter: 1, // Bölüm 2'de tanışılır
    introCondition: { type: 'minMonth', value: 3 },
    dialogues: {
      poor: '"Kanka takma kafana, bir iş buluruz sana. Benim bi fikrim var..."',
      rich: '"Lan sen zengin olmuşsun! Hadi bi iş kuralım beraber."',
      stressed: '"Gel takılalım biraz, kafanı dağıt. Hayat kısa!"',
      default: '"Naber lan, ne yapıyorsun bu aralar?"'
    },
    role_en: "Neighborhood Friend",
    personality_en: "Adventurous, energetic, sometimes thoughtless. Always has a plan, but his plans are usually crazy. A loyal friend.",
    dialogues_en: {
      poor: "\"Don't worry bro, we'll find you a job. I have an idea...\"",
      rich: "\"Man, you became rich! Let's start a business together.\"",
      stressed: "\"Let's hang out a bit, clear your mind. Life is short!\"",
      default: "\"What's up man, what are you doing these days?\""
    }
  },
  {
    id: 'elif',
    name: 'Elif',
    emoji: '👩',
    role: 'Potansiyel Sevgili',
    personality: 'Zeki, bağımsız, duygusal derinliği olan biri. Kolay etkilenmez ama samimiyete değer verir. Paradan çok karaktere bakar.',
    introChapter: 2, // Bölüm 3'te tanışılır
    introCondition: { type: 'minSocial', value: 30 },
    dialogues: {
      poor: '"Para önemli değil, önemli olan ne yapacağını bilmen."',
      rich: '"Güzel ama mutlu musun gerçekten?"',
      stressed: '"Konuşmak ister misin? Bazen dinlenmek yeterlidir."',
      default: '"Merhaba, bugün ne güzel bir gün."'
    },
    role_en: "Potential Lover",
    personality_en: "Smart, independent, someone with emotional depth. Not easily impressed but values sincerity. Cares more about character than money.",
    dialogues_en: {
      poor: "\"Money is not important, what matters is knowing what to do.\"",
      rich: "\"Nice, but are you truly happy?\"",
      stressed: "\"Do you want to talk? Sometimes just resting is enough.\"",
      default: "\"Hello, what a beautiful day today.\""
    }
  },
  {
    id: 'kara_mehmet',
    name: 'Kara Mehmet',
    emoji: '🕶️',
    role: 'Yeraltı Bağlantısı',
    personality: 'Soğukkanlı, hesapçı, tehlikeli. Teklif eder ama zorlamaz. Paranın dilinden anlar. Ona borçlanmak ölümcüldür.',
    introChapter: 2,
    introCondition: { type: 'maxMoney', value: 1000 },
    dialogues: {
      poor: '"Görüyorum ki zor durumdayasın. Bir teklifim var..."',
      rich: '"Sen akıllı çocuksun. Birlikte daha çok kazanırız."',
      stressed: '"Stres yapmak zayıflıktır. Soğukkanlı ol."',
      default: '"..."'
    },
    role_en: "Underworld Contact",
    personality_en: "Cold-blooded, calculating, dangerous. Offers but doesn't force. Speaks the language of money. Being in debt to him is deadly.",
    dialogues_en: {
      poor: "\"I see you are in a difficult situation. I have an offer...\"",
      rich: "\"You are a smart kid. We can earn more together.\"",
      stressed: "\"Stressing is weakness. Stay cool.\"",
      default: "\"...\""
    }
  },
  {
    id: 'komiser_aydin',
    name: 'Komiser Aydın',
    emoji: '👮',
    role: 'Mahalle Polisi',
    personality: 'Kuralcı ama vicdanlı. Gençlere şans tanır ama ikinci şansı pek vermez. Mahalleyi korur.',
    introChapter: 2,
    introCondition: { type: 'minWanted', value: 20 },
    dialogues: {
      poor: '"Fakir olmak suç değil ama suça bulaşmak fakir bırakır."',
      rich: '"Bu para temiz mi? Sorarım, bilirsin."',
      stressed: '"Sakin ol evlat. Sakin kafayla düşün."',
      default: '"Her şey yolunda mı komşu?"'
    },
    role_en: "Neighborhood Police",
    personality_en: "Strict but conscientious. Gives youth a chance but rarely a second one. Protects the neighborhood.",
    dialogues_en: {
      poor: "\"Being poor is not a crime, but getting involved in crime leaves you poor.\"",
      rich: "\"Is this money clean? I will ask, you know.\"",
      stressed: "\"Calm down son. Think with a clear head.\"",
      default: "\"Is everything alright, neighbor?\""
    }
  }
];

// NPC'nin mevcut duruma göre uygun diyaloğunu seçer
export const getNpcDialogue = (npc, gameState) => {
  const language = gameState.language || "tr";
  const d = language === "en" ? (npc.dialogues_en || npc.dialogues) : npc.dialogues;
  if (gameState.money < 500) return d.poor;
  if (gameState.money > 30000) return d.rich;
  if (gameState.stress > 70) return d.stressed;
  return d.default;
};

// NPC tanışma koşulunu kontrol eder
export const checkNpcIntroCondition = (npc, gameState) => {
  if (!npc.introCondition) return true; // Koşulsuz tanışma

  const cond = npc.introCondition;
  switch (cond.type) {
    case 'hasJob':
      return gameState.job !== 'İşsiz' && gameState.currentJobId;
    case 'minMonth':
      return gameState.monthCount >= cond.value;
    case 'minSocial':
      return (gameState.social || 0) >= cond.value;
    case 'maxMoney':
      return gameState.money <= cond.value;
    case 'minWanted':
      return (gameState.wantedLevel || 0) >= cond.value;
    default:
      return false;
  }
};

// Başlangıç ilişki değerlerini oluşturur
export const getInitialNpcRelationships = () => {
  const relationships = {};
  NPCS.forEach(npc => {
    relationships[npc.id] = npc.introCondition ? 0 : 50; // Koşulsuz olanlar 50'den başlar
  });
  return relationships;
};

// Başlangıçta tanışılan NPC'leri döndürür
export const getInitialMetNpcs = () => {
  return NPCS.filter(npc => !npc.introCondition).map(npc => npc.id);
};
