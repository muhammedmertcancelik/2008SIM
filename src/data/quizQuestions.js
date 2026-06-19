// ============================================
// DİNAMİK KADER VE KARAKTER SINAVI
// ============================================

export const QUIZ_QUESTIONS = [
  {
    id: 'q_cuzdan',
    question: "Issız bir sokakta içi nakit dolu (10.000 TL) bir cüzdan buldun. Kameralar yok, kimse seni görmedi. Ne yaparsın?",
    choices: [
      { text: "Cüzdanı olduğu gibi polise teslim ederim.", modifiers: { empathy: 15, discipline: 10, riskTaking: -10, luck: 5 } },
      { text: "Parayı alır, cüzdanı çöpe atarım.", modifiers: { riskTaking: 20, empathy: -20, discipline: -10, luck: -5 } },
      { text: "Paranın yarısını alır, kalanıyla polise veririm.", modifiers: { intelligence: 15, riskTaking: 10, discipline: -5 } }
    ]
  },
  {
    id: 'q_arkadas',
    question: "En yakın arkadaşının gizlice çok tehlikeli (ve yasadışı) bir işe karıştığını öğrendin. Senden yardım istiyor.",
    choices: [
      { text: "Polisi arar, onu ihbar ederim.", modifiers: { discipline: 20, empathy: -15, riskTaking: -20 } },
      { text: "Ona yardım ederim, sonuna kadar dostumdur.", modifiers: { riskTaking: 25, empathy: 15, discipline: -20 } },
      { text: "Umurumda olmaz, tamamen iletişimimi keserim.", modifiers: { intelligence: 10, empathy: -10, luck: 10 } }
    ]
  },
  {
    id: 'q_kopek',
    question: "Terk edilmiş eski bir binadan geçerken içeriden acı dolu bir inleme duydun. Ancak içerisi zifiri karanlık ve tekinsiz görünüyor.",
    choices: [
      { text: "Ne olursa olsun içeri girer ve kontrol ederim.", modifiers: { confidence: 20, empathy: 15, riskTaking: 15, intelligence: -10 } },
      { text: "Kimseye görünmeden hızla oradan uzaklaşırım.", modifiers: { riskTaking: -15, empathy: -10, stress: 5 } },
      { text: "Uzaktan polisi veya itfaiyeyi ararım.", modifiers: { intelligence: 15, discipline: 10, riskTaking: -10 } }
    ]
  },
  {
    id: 'q_kumar',
    question: "Maaşının tamamını cebine yeni koydun. Yolda giderken kesin kazanacağını hissettiğin yasadışı bir bahis fırsatı çıktı.",
    choices: [
      { text: "Tüm maaşımı basarım, ya hep ya hiç!", modifiers: { riskTaking: 30, discipline: -25, luck: -10 } },
      { text: "Maaşımın çeyreğini denerim.", modifiers: { riskTaking: 10, intelligence: 5, discipline: -5 } },
      { text: "Asla kumara bulaşmam, paramı korurum.", modifiers: { discipline: 20, riskTaking: -20, luck: 5 } }
    ]
  },
  {
    id: 'q_kavga',
    question: "Kalabalık bir caddede iri yarı bir adam, yaşlı bir kadına bağırıp üzerine yürüyor. Çevredekiler sadece izliyor.",
    choices: [
      { text: "Adama doğrudan saldırır, kadını korurum.", modifiers: { confidence: 25, riskTaking: 20, intelligence: -10 } },
      { text: "Araya girip adamı sözlü olarak sakinleştirmeye çalışırım.", modifiers: { intelligence: 20, empathy: 15, confidence: 10 } },
      { text: "Göz göze gelmeden yürümeye devam ederim.", modifiers: { empathy: -20, riskTaking: -15, confidence: -15 } }
    ]
  },
  {
    id: 'q_intikam',
    question: "Yıllar önce senin hayatını mahveden, seni borca sürükleyen o düşmanın şimdi çok zor durumda ve eline onu bitirme fırsatı geçti.",
    choices: [
      { text: "Acımam, tamamen yok olması için fırsatı kullanırım.", modifiers: { confidence: 15, empathy: -25, discipline: 10 } },
      { text: "Ona yardım elimi uzatır, büyüklük bende kalsın derim.", modifiers: { empathy: 25, intelligence: -10, luck: 10 } },
      { text: "Hiçbir şey yapmam, karma zaten cezasını veriyor.", modifiers: { patience: 20, riskTaking: -15, stress: -10 } }
    ]
  }
];

export const getRandomQuestions = (count) => {
  const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
