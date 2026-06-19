// ============================================
// MESLEKLER VE İŞ İLANLARI (JOB MARKET)
// ============================================

export const JOB_CATEGORIES = {
  PART_TIME: { id: 'PART_TIME', title: 'Yarı Zamanlı', color: '#3498db' },
  FULL_TIME: { id: 'FULL_TIME', title: 'Kurumsal (Tam Zamanlı)', color: '#9b59b6' },
  FREELANCE: { id: 'FREELANCE', title: 'Serbest Çalışan', color: '#f39c12' },
  CRIMINAL: { id: 'CRIMINAL', title: 'Yeraltı Dünyası', color: '#e74c3c' },
};

export const JOBS = [
  // YARI ZAMANLI (Part-Time)
  {
    id: 'j_waiter',
    title: 'Garson',
    categoryId: 'PART_TIME',
    icon: '☕',
    description: 'Ayaküstü yorucu bir iş ama sorumluluğu az. Bahşişlerle idare edersin.',
    salary: 400,
    energyCost: 40,
    stressCost: 15,
    requiredSkill: null,
    requiredLevel: 1,
  },
  {
    id: 'j_cashier',
    title: 'Market Kasiyeri',
    categoryId: 'PART_TIME',
    icon: '🛒',
    description: 'Bütün gün "Poşet ister misiniz?" demekten yorulacağın standart bir iş.',
    salary: 450,
    energyCost: 30,
    stressCost: 20,
    requiredSkill: null,
    requiredLevel: 1,
  },

  // KURUMSAL (Full-Time)
  {
    id: 'j_office',
    title: 'Ofis Elemanı (Veri Girişi)',
    categoryId: 'FULL_TIME',
    icon: '📠',
    description: 'Bütün gün bilgisayar başında veri girmek çok sıkıcı ama düzenli maaşı var.',
    salary: 800,
    energyCost: 25,
    stressCost: 40,
    requiredSkill: null,
    requiredLevel: 1,
  },
  {
    id: 'j_sales',
    title: 'Mağaza Müdürü',
    categoryId: 'FULL_TIME',
    icon: '👔',
    description: 'İngilizce biliyor olmak sana bu kapıyı açtı. Müşterilerle uğraşmak streslidir.',
    salary: 1200,
    energyCost: 30,
    stressCost: 55,
    requiredSkill: 'c_english', // İngilizce Kursu gerekiyor
    requiredLevel: 2,
  },
  {
    id: 'j_developer',
    title: 'Yazılım Uzmanı',
    categoryId: 'FULL_TIME',
    icon: '💻',
    description: 'Gecen gündüzün koda karışacak ama maaşı oldukça dolgun.',
    salary: 2500,
    energyCost: 35,
    stressCost: 60,
    requiredSkill: 'c_code', // Yazılım Kursu gerekiyor
    requiredLevel: 2,
  },

  // SERBEST ÇALIŞAN (Freelance)
  {
    id: 'j_courier',
    title: 'Kurye',
    categoryId: 'FREELANCE',
    icon: '🛵',
    description: 'Sürekli trafiktesin. Ne kadar çok çalışırsan o kadar çok kazanırsın ama bedenin çabuk tükenir.',
    salary: 600, // Taban maaş, kurye mini oyunu ile ekstra desteklenir
    energyCost: 50,
    stressCost: 30,
    requiredSkill: null,
    requiredLevel: 1,
  },
  {
    id: 'j_freelance_dev',
    title: 'Freelance Yazılımcı',
    categoryId: 'FREELANCE',
    icon: '☕',
    description: 'Kendi işinin patronusun ama müşteri bulmak ve projeleri yetiştirmek strese sokabilir.',
    salary: 1800,
    energyCost: 40,
    stressCost: 45,
    requiredSkill: 'c_code',
    requiredLevel: 2,
  },

  // YERALTI DÜNYASI (Criminal)
  {
    id: 'j_thief',
    title: 'Hırsız',
    categoryId: 'CRIMINAL',
    icon: '🥷',
    description: 'Büyük risk, büyük ödül. Yakalanırsan her şeyini kaybedersin.',
    salary: 3500,
    energyCost: 50,
    stressCost: 80, // Aşırı stresli
    wantedIncrease: 10, // Her çalışmada polisin dikkatini çeker
    requiredSkill: null,
    requiredLevel: 1,
  },
];
