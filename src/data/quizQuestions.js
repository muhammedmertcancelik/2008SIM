// ============================================
// DİNAMİK KADER VE KARAKTER SINAVI
// ============================================

export const QUIZ_QUESTIONS = [
  {
    id: 'q_cuzdan',
    question: "Issız bir sokakta içi nakit dolu (10.000 TL) bir cüzdan buldun. Kameralar yok, kimse seni görmedi. Ne yaparsın?",
    question_en: "You found a wallet full of cash (10,000 TL) on a deserted street. There are no cameras, no one saw you. What do you do?",
    choices: [
      { text: "Cüzdanı olduğu gibi polise teslim ederim.", text_en: "I hand the wallet over to the police as it is.", modifiers: { empathy: 15, discipline: 10, riskTaking: -10, luck: 5 } },
      { text: "Parayı alır, cüzdanı çöpe atarım.", text_en: "I take the money and throw the wallet in the trash.", modifiers: { riskTaking: 20, empathy: -20, discipline: -10, luck: -5 } },
      { text: "Paranın yarısını alır, kalanıyla polise veririm.", text_en: "I take half the money and give the rest to the police.", modifiers: { intelligence: 15, riskTaking: 10, discipline: -5 } }
    ]
  },
  {
    id: 'q_arkadas',
    question: "En yakın arkadaşının gizlice çok tehlikeli (ve yasadışı) bir işe karıştığını öğrendin. Senden yardım istiyor.",
    question_en: "You found out your best friend is secretly involved in a very dangerous (and illegal) business. They ask you for help.",
    choices: [
      { text: "Polisi arar, onu ihbar ederim.", text_en: "I call the cops and report them.", modifiers: { discipline: 20, empathy: -15, riskTaking: -20 } },
      { text: "Ona yardım ederim, sonuna kadar dostumdur.", text_en: "I help them, they are my friend until the end.", modifiers: { riskTaking: 25, empathy: 15, discipline: -20 } },
      { text: "Umurumda olmaz, tamamen iletişimimi keserim.", text_en: "I don't care, I completely cut off communication.", modifiers: { intelligence: 10, empathy: -10, luck: 10 } }
    ]
  },
  {
    id: 'q_kopek',
    question: "Terk edilmiş eski bir binadan geçerken içeriden acı dolu bir inleme duydun. Ancak içerisi zifiri karanlık ve tekinsiz görünüyor.",
    question_en: "Passing by an abandoned old building, you hear a painful moan from inside. But it looks pitch black and eerie inside.",
    choices: [
      { text: "Ne olursa olsun içeri girer ve kontrol ederim.", text_en: "I go in and check no matter what.", modifiers: { confidence: 20, empathy: 15, riskTaking: 15, intelligence: -10 } },
      { text: "Kimseye görünmeden hızla oradan uzaklaşırım.", text_en: "I quickly walk away without being seen.", modifiers: { riskTaking: -15, empathy: -10, stress: 5 } },
      { text: "Uzaktan polisi veya itfaiyeyi ararım.", text_en: "I call the police or fire department from a distance.", modifiers: { intelligence: 15, discipline: 10, riskTaking: -10 } }
    ]
  },
  {
    id: 'q_kumar',
    question: "Maaşının tamamını cebine yeni koydun. Yolda giderken kesin kazanacağını hissettiğin yasadışı bir bahis fırsatı çıktı.",
    question_en: "You just put your entire salary in your pocket. Walking down the street, an illegal betting opportunity comes up that you feel you will definitely win.",
    choices: [
      { text: "Tüm maaşımı basarım, ya hep ya hiç!", text_en: "I bet my whole salary, all or nothing!", modifiers: { riskTaking: 30, discipline: -25, luck: -10 } },
      { text: "Maaşımın çeyreğini denerim.", text_en: "I try with a quarter of my salary.", modifiers: { riskTaking: 10, intelligence: 5, discipline: -5 } },
      { text: "Asla kumara bulaşmam, paramı korurum.", text_en: "I never get involved in gambling, I protect my money.", modifiers: { discipline: 20, riskTaking: -20, luck: 5 } }
    ]
  },
  {
    id: 'q_kavga',
    question: "Kalabalık bir caddede iri yarı bir adam, yaşlı bir kadına bağırıp üzerine yürüyor. Çevredekiler sadece izliyor.",
    question_en: "On a crowded street, a large man is yelling and walking towards an old woman. The bystanders are just watching.",
    choices: [
      { text: "Adama doğrudan saldırır, kadını korurum.", text_en: "I directly attack the man and protect the woman.", modifiers: { confidence: 25, riskTaking: 20, intelligence: -10 } },
      { text: "Araya girip adamı sözlü olarak sakinleştirmeye çalışırım.", text_en: "I step in and try to calm the man down verbally.", modifiers: { intelligence: 20, empathy: 15, confidence: 10 } },
      { text: "Göz göze gelmeden yürümeye devam ederim.", text_en: "I keep walking without making eye contact.", modifiers: { empathy: -20, riskTaking: -15, confidence: -15 } }
    ]
  },
  {
    id: 'q_intikam',
    question: "Yıllar önce senin hayatını mahveden, seni borca sürükleyen o düşmanın şimdi çok zor durumda ve eline onu bitirme fırsatı geçti.",
    question_en: "The enemy who ruined your life years ago and dragged you into debt is now in a very difficult situation, and you have the opportunity to finish them off.",
    choices: [
      { text: "Acımam, tamamen yok olması için fırsatı kullanırım.", text_en: "I show no mercy, I use the opportunity to destroy them completely.", modifiers: { confidence: 15, empathy: -25, discipline: 10 } },
      { text: "Ona yardım elimi uzatır, büyüklük bende kalsın derim.", text_en: "I extend a helping hand to them, let me be the bigger person.", modifiers: { empathy: 25, intelligence: -10, luck: 10 } },
      { text: "Hiçbir şey yapmam, karma zaten cezasını veriyor.", text_en: "I do nothing, karma is already punishing them.", modifiers: { patience: 20, riskTaking: -15, stress: -10 } }
    ]
  }
];

export const getRandomQuestions = (count) => {
  const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
