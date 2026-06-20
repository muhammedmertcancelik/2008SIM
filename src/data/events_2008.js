// ============================================
// MERAK UYANDIRICI VE GİZEMLİ YEREL OLAY HAVUZU
// ============================================

export const EVENTS_2008 = [
  {
    id: "e_askerlik_1",
    yearMin: 2008,
    yearMax: 2012,
    type: "unlucky",
    baseWeight: 10,
    conditions: { minAge: 20, maxAge: 29, maritalStatus: 'Bekar' },
    title: "Sarı Zarf Kapıda",
    title_en: "Yellow Envelope at the Door",
    text: "Postacı kapıya geldi ve elinde sarı bir zarf var. Askerlik şubesinden yoklama kaçağı durumuna düştüğüne dair resmi bir kağıt. Ya hemen şubeye gidip tecil işlemlerini halletmelisin ya da kaçmaya devam edebilirsin.",
    text_en: "The postman came to the door with a yellow envelope. It's an official paper from the military branch stating that you are a draft evader. You must either go to the branch immediately and postpone it, or continue to run.",
    choices: [
      {
        text: "Şubeye Git ve Tecil Ettir (-50 TL)",
        text_en: "Go to the Branch and Postpone",
        effects: { stress: 15, money: -50, energy: -30, happiness: -10 },
        delayedEffect: null,
        newMemoryToSave: "Askerliği tecil ettirdi.",
        newMemoryToSave_en: "Tore the yellow envelope from the military branch and started living as an evader.",
      },
      {
        text: "Zarfı Yırt At (Kaçmaya Devam Et)",
        text_en: "undefined",
        effects: { stress: -5, reputation: -10, happiness: 10 },
        delayedEffect: { daysDelay: 90, triggerEventId: "e_askerlik_gbt" },
        newMemoryToSave: "Askerlik şubesinden gelen sarı zarfı yırtıp attı, kaçak yaşamaya başladı."
      }
    ]
  },
  {
    id: "e_askerlik_gbt",
    title: "Karanlık Sokakta GBT Çevirmesi",
    title_en: "GBT Check in a Dark Alley",
    text: "Gece yarısı yolda yürürken polis çevirmesine denk geldin. Kimliğini verdin ve polis telsizinden anons geçildi: 'Şahıs yoklama kaçağı amirim.'",
    text_en: "While walking down the street at midnight, you came across a police checkpoint. You gave your ID and the police announced over the radio: 'The person is a draft evader, chief.'",
    choices: [
      {
        text: "Paşa Paşa Teslim Ol (Masraf -200 TL)",
        text_en: "Surrender Peacefully",
        effects: { stress: 50, energy: -50, happiness: -50, reputation: -20, money: -200 }
      },
      {
        text: "Cezayı Öde ve Rüşvet Ver (-500 TL)",
        text_en: "undefined",
        effects: { stress: 20, energy: -20, money: -500, reputation: -30, happiness: -20 }
      }
    ]
  },
  {
    id: "e_karanlik_is",
    conditions: { minAge: 18, maxMoney: 5000 }, // Fakir ve gençlere gelsin
    baseWeight: 20,
    title: "Karanlık Bir Teklif",
    title_en: "A Dark Offer",
    text: "Mahallede pek tekin olmayan biri seni köşeye çekti. 'Al şu paketi, yarın gece limandaki depoya bırak. İçinde ne olduğuna bakma. Karşılığında 5.000 TL nakit senin olacak.' dedi.",
    text_en: "A shady guy from the neighborhood pulled you into a corner. 'Take this package, leave it at the warehouse at the port tomorrow night. Don't look inside. In return, 5,000 TL in cash is yours.'",
    choices: [
      {
        text: "Kabul Et ve Paketi Teslim Et (Riskli)",
        text_en: "Accept and Deliver the Package (Risky)",
        effects: { money: 5000, stress: 50, reputation: -20, happiness: -10 },
        delayedEffect: { daysDelay: 14, triggerEventId: "e_karanlik_is_sonuc" },
        newMemoryToSave: "Gizemli bir paketi taşıyarak 5.000 TL kazandı ama peşine birilerini taktı.",
        newMemoryToSave_en: "Declined a dark and illegal job offer.",
      },
      {
        text: "Kabul Et Ama Paketi Açıp Bak",
        text_en: "undefined",
        effects: { stress: 60, energy: -20, intelligence: 10 },
        delayedEffect: { daysDelay: 1, triggerEventId: "e_paket_acildi" },
        newMemoryToSave: "Karanlık adamın paketini gizlice açıp içindekileri gördü."
      },
      {
        text: "Kibarca Reddet (Güvenli)",
        text_en: "undefined",
        effects: { stress: -10, money: 0, reputation: 10, luck: 5 },
        newMemoryToSave: "Karanlık ve yasadışı bir iş teklifini reddetti."
      }
    ]
  },
  {
    id: "e_karanlik_is_sonuc",
    title: "Gece Yarısı Baskını",
    title_en: "Midnight Raid",
    text: "İki hafta önce limana bıraktığın paket yüzünden polis evini bastı. Kameralarda yüzün görünmüş. Seni karakola götürüyorlar.",
    text_en: "The police raided your house because of the package you left at the port two weeks ago. Your face was caught on camera. They are taking you to the station.",
    choices: [
      {
        text: "Avukat Tut ve Kurtulmaya Çalış (-4000 TL)",
        text_en: "Hire a Lawyer and Try to Escape",
        effects: { money: -4000, stress: 80, happiness: -50, reputation: -30, health: -10 }
      },
      {
        text: "Suçu İtiraf Et (Hapis Yolu)",
        text_en: "undefined",
        effects: { money: 0, stress: 100, happiness: -80, reputation: -50, relationship: -50, isGameOver: true, gameOverReason: "Polislerin baskını sonrasında suçunu itiraf ettin ve yıllarca sürecek hapis cezasına çarptırıldın. Özgürlüğün ve hayatın burada sona erdi." }
      }
    ]
  },
  {
    id: "e_paket_acildi",
    title: "Geri Dönüşü Olmayan Sır",
    title_en: "Secret of No Return",
    text: "Paketi açtın. İçinde çalınmış eski ve paha biçilemez bir tablo parçası var. Teslim etmezsen peşine düşecekler, satarsan milyoner olabilirsin ama çok riskli.",
    text_en: "You opened the package. Inside is a stolen, priceless piece of an old painting. If you don't deliver it, they will come after you, if you sell it, you can become a millionaire but it's very risky.",
    choices: [
      {
        text: "Hemen Geri Kapat ve Teslim Et",
        text_en: "Close It Immediately and Deliver",
        effects: { money: 5000, stress: 40, happiness: -10 }
      },
      {
        text: "Tabloyu Karabasaya Sat (+20.000 TL)",
        text_en: "undefined",
        effects: { money: 20000, stress: 90, reputation: -50, health: -20 },
        newMemoryToSave: "Çalıntı tarihi eseri mafyaya satıp eline büyük para geçirdi."
      }
    ]
  },
  {
    id: "e_gece_telefon",
    conditions: { minAge: 20 },
    baseWeight: 15,
    title: "Kendi Sesinden Bir Çağrı",
    title_en: "A Call from Your Own Voice",
    text: "Gece 03:00'te telefonun çaldı. Ekranda 'GİZLİ NUMARA' yazıyor. Açtığında, karşıdaki sesin tamamen senin kendi sesinle aynı olduğunu fark ettin! 'Yarın o otobüse binme.' deyip kapattı.",
    text_en: "Your phone rang at 03:00 AM. 'PRIVATE NUMBER' is written on the screen. When you opened it, you realized that the voice on the other end is exactly your own voice! 'Don't get on that bus tomorrow.' it said and hung up.",
    choices: [
      {
        text: "Kafaya Takma, Normal Hayatına Devam Et",
        text_en: "Ignore It, Continue Your Normal Life",
        effects: { stress: 10, energy: -10 },
        delayedEffect: { daysDelay: 1, triggerEventId: "e_otobus_kaza" }
      },
      {
        text: "Paranoyaklaş, Bütün Gün Evden Çıkma",
        text_en: "undefined",
        effects: { stress: 30, energy: -30, happiness: -10, money: -50 }, // İşe/okula gidemediği için ceza
        newMemoryToSave: "Kendi sesinden gelen uyarıyı dinleyip o gün evden hiç çıkmadı."
      }
    ]
  },
  {
    id: "e_otobus_kaza",
    title: "Haberlerdeki Son Dakika",
    title_en: "Breaking News",
    text: "Televizyonu açtın. 'Son Dakika: Her sabah bindiğiniz otobüs şarampole yuvarlandı, çok sayıda yaralı var.' Eğer evden çıksaydın sen de o otobüste olacaktın.",
    text_en: "You turned on the TV. 'Breaking News: The bus you take every morning rolled down a cliff, there are many casualties.' If you had left the house, you would have been on that bus.",
    choices: [
      {
        text: "Dehşet İçinde Şükret",
        text_en: "Be Thankful in Horror",
        effects: { stress: 50, happiness: -20, health: -20, relationship: 10 },
        newMemoryToSave: "Telefon uyarısını dinlemediği için büyük bir felaketin eşiğinden döndü."
      }
    ]
  },
  {
    id: "e_sifreli_miras",
    conditions: { minMoney: 2000, minAge: 25 },
    baseWeight: 10,
    title: "Ölü Bir Adamın Çantası",
    title_en: "A Dead Man's Briefcase",
    text: "Hiç tanımadığın uzak bir akrabanın öldüğü ve sana sadece şifreli eski model kilitli bir çelik çanta miras bıraktığı söylendi. Avukat çantayı getirdi ancak şifresini kimse bilmiyor.",
    text_en: "You were told that a distant relative you never knew died and left you only an old-fashioned locked steel briefcase as an inheritance. The lawyer brought the briefcase but nobody knows the password.",
    choices: [
      {
        text: "Çilingir Çağır ve Kır (-500 TL)",
        text_en: "Call a Locksmith and Break It",
        effects: { money: -500, stress: 20, intelligence: 10 },
        delayedEffect: { daysDelay: 2, triggerEventId: "e_canta_acildi" }
      },
      {
        text: "Kendin Günlerce Uğraşarak Çözmeye Çalış",
        text_en: "undefined",
        effects: { energy: -50, stress: 30, intelligence: 20 },
        delayedEffect: { daysDelay: 5, triggerEventId: "e_canta_acildi" }
      },
      {
        text: "Çantayı Açmadan Çöpe At (Risk İstemiyorum)",
        text_en: "undefined",
        effects: { stress: -20, happiness: 10, luck: -10 },
        newMemoryToSave: "İçinde ne olduğunu bilmediği gizemli mirası çöpe attı."
      }
    ]
  },
  {
    id: "e_canta_acildi",
    title: "Çantanın Sırrı",
    title_en: "The Secret of the Briefcase",
    text: "Çantayı açmayı başardın. İçinden sadece tek bir şey çıktı: Senin küçüklüğüne ait, arkasında 'Seni hep izledim' yazan gizlice çekilmiş bir fotoğraf. Çantada para yok, sadece bu rahatsız edici mesaj var.",
    text_en: "You managed to open the briefcase. Only one thing came out of it: A secretly taken photo of your childhood with 'I always watched you' written on the back. There is no money in the bag, just this disturbing message.",
    choices: [
      {
        text: "Fotoğrafı Yak ve Unut",
        text_en: "Burn the Photo and Forget",
        effects: { stress: 40, happiness: -20, energy: -10 }
      },
      {
        text: "Polise Git ve Soruşturma Başlat",
        text_en: "undefined",
        effects: { stress: 60, money: -200, reputation: 10 },
        newMemoryToSave: "Küçüklüğünden beri kendisini izleyen gizemli akrabasını polise bildirdi."
      }
    ]
  },
  {
    id: "e_repeat_rain",
    baseWeight: 30,
    isRepeatable: true,
    title: "Aniden Bastıran Sağanak Yağmur",
    title_en: "Sudden Heavy Rain",
    text: "Sokakta yürürken gökyüzü bir anda karardı ve bardaktan boşalırcasına yağmur başladı. Şemsiyen yok ve sırılsıklam oldun. Hastalanmamak için hemen bir yere sığınmalısın.",
    text_en: "While walking down the street, the sky suddenly darkened and it started pouring rain. You don't have an umbrella and you got soaked. You must seek shelter immediately to avoid getting sick.",
    choices: [
      {
        text: "En Yakın Kafeye Gir ve Sıcak Bir Çay İç (-15 TL)",
        text_en: "Go to the Nearest Cafe and Drink Hot Tea",
        effects: { money: -15, stress: -5, happiness: 5, energy: 10 }
      },
      {
        text: "Koşarak Eve Gitmeye Çalış",
        text_en: "undefined",
        effects: { energy: -20, stress: 10, health: -5 }
      }
    ]
  },
  {
    id: "e_repeat_stray_dog",
    baseWeight: 20,
    isRepeatable: true,
    title: "Sokak Köpeği",
    title_en: "Stray Dog",
    text: "Eve dönerken çok sevimli ama bir o kadar da aç görünen bir sokak köpeği peşine takıldı. Gözlerinin içine bakarak kuyruk sallıyor.",
    text_en: "On your way home, a very cute but equally hungry-looking stray dog followed you. It's wagging its tail looking into your eyes.",
    choices: [
      {
        text: "Bakkaldan Sosis Alıp Ver (-20 TL)",
        text_en: "Buy Sausage from the Grocery Store and Give It",
        effects: { money: -20, happiness: 15, stress: -10 }
      },
      {
        text: "Görmezden Gel ve Yoluna Devam Et",
        text_en: "undefined",
        effects: { happiness: -5, stress: 5 }
      }
    ]
  },
  {
    id: "e_repeat_neighbor",
    baseWeight: 20,
    isRepeatable: true,
    title: "Komşu Gürültüsü",
    title_en: "Neighbor Noise",
    text: "Gece yarısı üst komşun son ses müzik açtı ve uyuman imkansız. Yarın enerjiye ihtiyacın var ama sinirlerin iyice gerildi.",
    text_en: "At midnight, your upstairs neighbor turned on the music at full volume and it's impossible to sleep. You need energy tomorrow but your nerves are completely tense.",
    choices: [
      {
        text: "Kapısına Dayan ve Bağır",
        text_en: "Knock on Their Door and Yell",
        effects: { stress: 15, energy: -10, reputation: -5 }
      },
      {
        text: "Kulaklık Takıp Uyumaya Çalış",
        text_en: "undefined",
        effects: { stress: 5, energy: -20 }
      }
    ]
  },
  {
    id: "e_repeat_traffic",
    baseWeight: 25,
    isRepeatable: true,
    title: "Trafik Felci",
    title_en: "Traffic Paralysis",
    text: "Ana yolda büyük bir kaza olmuş. Trafik tamamen kilitlenmiş durumda ve saatlerce ilerlemiyor.",
    text_en: "There's been a massive accident on the main road. The traffic is completely deadlocked and hasn't moved for hours.",
    choices: [
      {
        text: "Otobüsten/Arabadan İn ve Yürü",
        text_en: "Get Out of the Bus/Car and Walk",
        effects: { energy: -30, stress: 10, health: -5 }
      },
      {
        text: "Sabırla Bekle",
        text_en: "undefined",
        effects: { stress: 25, energy: -10 }
      }
    ]
  },
  {
    id: "e_repeat_wallet",
    baseWeight: 10,
    isRepeatable: true,
    title: "Yerde Duran Cüzdan",
    title_en: "Wallet on the Ground",
    text: "Issız bir sokakta yürürken yerde içi para dolu kalın bir cüzdan buldun. Kimlik falan yok, sadece nakit para.",
    text_en: "While walking on a deserted street, you found a thick wallet full of money on the ground. No ID or anything, just cash.",
    choices: [
      {
        text: "Parayı Al (+200 TL)",
        text_en: "Take the Money",
        effects: { money: 200, reputation: -10, stress: 10 }
      },
      {
        text: "Olduğu Yere Bırak",
        text_en: "undefined",
        effects: { happiness: 5, reputation: 5 }
      }
    ]
  },
  {
    id: "e_repeat_flu",
    baseWeight: 20,
    isRepeatable: true,
    title: "Mevsimsel Grip",
    title_en: "Seasonal Flu",
    text: "Sabah boğaz ağrısı ve halsizlikle uyandın. Ateşin var ve kemiklerin sızlıyor.",
    text_en: "You woke up in the morning with a sore throat and weakness. You have a fever and your bones ache.",
    choices: [
      {
        text: "İlaç Alıp Dinlen (-30 TL)",
        text_en: "Take Medicine and Rest",
        effects: { money: -30, energy: 20, health: 10 }
      },
      {
        text: "Aldırış Etmeden Hayata Devam Et",
        text_en: "undefined",
        effects: { health: -15, energy: -20, stress: 10 }
      }
    ]
  },
  {
    id: "e_repeat_friend",
    baseWeight: 15,
    isRepeatable: true,
    title: "Eski Bir Dost",
    title_en: "An Old Friend",
    text: "Yolda yürürken liseden eski bir arkadaşınla karşılaştın. Seni bir kahve içmeye davet ediyor.",
    text_en: "While walking on the road, you ran into an old friend from high school. They invite you for a coffee.",
    choices: [
      {
        text: "Kabul Et ve Kahve Ismarla (-25 TL)",
        text_en: "Accept and Buy Coffee",
        effects: { money: -25, happiness: 20, relationship: 10, stress: -15 }
      },
      {
        text: "Acelem Var Diyerek Geçiştir",
        text_en: "undefined",
        effects: { happiness: -5, relationship: -5 }
      }
    ]
  },
  {
    id: "e_repeat_powerout",
    baseWeight: 15,
    isRepeatable: true,
    title: "Karanlığa Gömülmek",
    title_en: "Plunged into Darkness",
    text: "Mahallede genel bir elektrik kesintisi oldu. Evde yapacak hiçbir şey yok ve zifiri karanlık.",
    text_en: "There was a general power outage in the neighborhood. There is nothing to do at home and it's pitch black.",
    choices: [
      {
        text: "Mum Yakıp Kitap Oku / Düşün",
        text_en: "Light a Candle and Read a Book / Think",
        effects: { stress: -10, intelligence: 5 }
      },
      {
        text: "Sıkıntıdan Patla ve Stres Yap",
        text_en: "undefined",
        effects: { stress: 15, happiness: -5 }
      }
    ]
  },
  {
    id: "e_repeat_sale",
    baseWeight: 20,
    isRepeatable: true,
    title: "Büyük İndirim Çılgınlığı",
    title_en: "Huge Sale Madness",
    text: "Geçerken bir mağazada büyük bir sezon sonu indirimi olduğunu gördün. İçerisi hınca hınç dolu.",
    text_en: "Passing by, you saw that there is a huge end-of-season sale in a store. It's packed inside.",
    choices: [
      {
        text: "İçeri Gir ve İhtiyacın Olmayan Şeyler Al (-100 TL)",
        text_en: "Go Inside and Buy Things You Don't Need",
        effects: { money: -100, happiness: 15, stress: -5 }
      },
      {
        text: "Nefsini Tut ve Eve Dön",
        text_en: "undefined",
        effects: { stress: 5, happiness: -5 }
      }
    ]
  },
  {
    id: "e_repeat_help",
    baseWeight: 15,
    isRepeatable: true,
    title: "Yardıma Muhtaç Biri",
    title_en: "Someone in Need",
    text: "Pazardan dönen yaşlı bir teyzenin poşetleri yırtıldı ve elindeki her şey sokağa saçıldı.",
    text_en: "An old lady returning from the bazaar had her bags torn and everything in her hands scattered on the street.",
    choices: [
      {
        text: "Hemen Yardım Et ve Eşyaları Taşı",
        text_en: "Help Immediately and Carry the Items",
        effects: { energy: -15, reputation: 15, happiness: 10 }
      },
      {
        text: "Görmezden Gelip Hızlıca Uzaklaş",
        text_en: "undefined",
        effects: { reputation: -10, happiness: -10, stress: 5 }
      }
    ]
  },
  {
    id: "e_repeat_noise",
    baseWeight: 15,
    isRepeatable: true,
    title: "Sokak Çalgıcısı",
    title_en: "Street Musician",
    text: "Köşede çok yetenekli bir sokak çalgıcısı en sevdiğin şarkıyı çalıyor. İnsanlar etrafında toplanmış.",
    text_en: "A very talented street musician is playing your favorite song on the corner. People are gathered around.",
    choices: [
      {
        text: "Bir Süre Dinle ve Bahşiş At (-10 TL)",
        text_en: "Listen for a While and Leave a Tip",
        effects: { money: -10, happiness: 15, stress: -10 }
      },
      {
        text: "Umursamadan Geç",
        text_en: "undefined",
        effects: { }
      }
    ]
  },
  {
    id: "e_repeat_creepy_noise",
    baseWeight: 10,
    isRepeatable: true,
    title: "Gece Yarısı Tıkırtıları",
    title_en: "Midnight Rattles",
    text: "Gece uyurken pencerenin dışından garip tıkırtılar duymaya başladın. Biri sanki camı zorluyor gibi.",
    text_en: "While sleeping at night, you started hearing strange rattles from outside the window. It's as if someone is forcing the glass.",
    choices: [
      {
        text: "Kalk ve Kontrol Et",
        text_en: "Get Up and Check",
        effects: { stress: 20, energy: -15, reputation: 5 }
      },
      {
        text: "Yorganı Kafana Çek ve Uyu",
        text_en: "undefined",
        effects: { stress: 10 }
      }
    ]
  },
  {
    id: "e_repeat_bus_argument",
    baseWeight: 20,
    isRepeatable: true,
    title: "Toplu Taşıma Kavgası",
    title_en: "Public Transport Argument",
    text: "Otobüste iki yolcu arasında yüksek sesli bir kavga çıktı. İkisi de birbirine bağırıyor ve ortam çok gergin.",
    text_en: "A loud argument broke out between two passengers on the bus. Both are yelling at each other and the atmosphere is very tense.",
    choices: [
      {
        text: "Araya Girip Ayırmaya Çalış",
        text_en: "Step In and Try to Separate Them",
        effects: { stress: 20, reputation: 15, energy: -10 }
      },
      {
        text: "Sessizce Kulaklık Takıp İzle",
        text_en: "undefined",
        effects: { stress: 5, happiness: -5 }
      }
    ]
  },
  
  // ============================================
  // BÖLÜM (CHAPTER) & NPC BAĞLANTILI OLAYLAR
  // ============================================

  // BÖLÜM 1: Hasan Abi
  {
    id: "ch1_hasan_veresiye",
    chapter: 0,
    npc: { id: 'hasan_abi', minRel: 30 },
    baseWeight: 25,
    title: "Veresiye Defteri",
    title_en: "The Tab Book",
    text: "Bakkal Hasan Abi dükkânın önünde çay içiyor. Seni görünce gülümsedi. 'Oğlum, buralar zordur başlarda. İhtiyacın olursa çekinme, defterde sana da yer açarız.'",
    text_en: "Hasan Abi the grocer is drinking tea in front of the shop. He smiled when he saw you. 'Son, it's hard around here at first. If you need anything, don't hesitate, we'll make room for you in the tab book.'",
    choices: [
      {
        text: "Sağ ol abi, şimdilik idare ediyorum.",
        text_en: "Thanks man, I'm managing for now.",
        effects: { happiness: 10, stress: -10 }
      },
      {
        text: "Abi çok makbule geçer, biraz erzak alayım. (Maaş gününe kadar)",
        text_en: "undefined",
        effects: { money: -50, hunger: -30, stress: -5 }
      }
    ]
  },

  // BÖLÜM 1: Fatma Teyze
  {
    id: "ch1_fatma_corba",
    chapter: 0,
    npc: { id: 'fatma_teyze' },
    baseWeight: 20,
    title: "Üst Kattan Gelen Koku",
    title_en: "The Smell from Upstairs",
    text: "Kapın çalındı. Üst komşu Fatma Teyze elinde sıcak bir kase çorbayla duruyor. 'Kokmuştur diye getirdim yavrum. Ee anlat bakalım, nasıl gidiyor işler?'",
    text_en: "Your door knocked. Upstairs neighbor Aunt Fatma is standing with a hot bowl of soup in her hands. 'I brought it in case it smelled, my child. So tell me, how are things going?'",
    choices: [
      {
        text: "Teşekkür edip içeri davet et (Zaman harca)",
        text_en: "Thank her and invite her in (Spend time)",
        effects: { hunger: -40, energy: -15, happiness: 15 } // İlişki artışı AI/EventEngine tarafından ekleniyor
      },
      {
        text: "Çorbayı alıp kibarca gönder (Çalışmalıyım)",
        text_en: "undefined",
        effects: { hunger: -20, energy: 5 } // İlişki düşer (EventEngine bunu handle etmeli ya da AI halleder)
      }
    ]
  },

  // BÖLÜM 2: Emre
  {
    id: "ch2_emre_fikir",
    chapter: 1,
    npc: { id: 'emre' },
    baseWeight: 30,
    title: "Emre'nin Çılgın Fikri",
    title_en: "Emre's Crazy Idea",
    text: "Mahalleden Emre nefes nefese yanına geldi. 'Kanka efsane bir iş var, parayı ikiye katlayacağız ama 1000 lira lazım. Var mı sende?' Gözleri parlıyor ama pek güven vermiyor.",
    text_en: "Emre from the neighborhood came to you out of breath. 'Bro, there's a legendary job, we'll double the money but we need 1000 liras. Do you have it?' His eyes are shining but he doesn't inspire much trust.",
    choices: [
      {
        text: "Tamam lan, al 1000 TL. (-1000 TL)",
        text_en: "Okay man, here's 1000 TL.",
        effects: { money: -1000, stress: 20 },
        delayedEffect: { daysDelay: 15, triggerEventId: "ch2_emre_sonuc" },
        newMemoryToSave: "Emre'nin iş fikrine 1000 TL yatırdı."
      },
      {
        text: "Yok kanka bende o kadar para.",
        text_en: "undefined",
        effects: { happiness: -5, stress: -5 }
      }
    ]
  },
  {
    id: "ch2_emre_sonuc",
    title: "Emre'nin İşi Patladı",
    title_en: "Emre's Business Blew Up",
    text: "Beklenen oldu. Emre utana sıkıla yanına geldi. 'Kanka sorma, mallar gümrükte takıldı... Para yalan oldu.' diyerek omuz silkti.",
    text_en: "The expected happened. Emre came to you, feeling ashamed. 'Bro, don't ask, the goods got stuck at customs... The money is gone.' he shrugged.",
    choices: [
      {
        text: "Bağır çağır! Parayı geri iste.",
        text_en: "Yell and scream! Ask for the money back.",
        effects: { stress: 30, happiness: -20, energy: -20 } // İlişki düşer
      },
      {
        text: "Sağlık olsun de, konuyu kapat.",
        text_en: "undefined",
        effects: { stress: 10, happiness: 10 } // İlişki artar
      }
    ]
  },

  // BÖLÜM 3: Elif
  {
    id: "ch3_elif_kahve",
    chapter: 2,
    npc: { id: 'elif' },
    baseWeight: 20,
    title: "Kafede Karşılaşma",
    title_en: "Encounter at the Cafe",
    text: "İş çıkışı kafede otururken Elif'i gördün. Bir kitap okuyor ve oldukça yorgun görünüyor. Seni fark edip gülümsedi.",
    text_en: "While sitting at the cafe after work, you saw Elif. She is reading a book and looks quite tired. She noticed you and smiled.",
    choices: [
      {
        text: "Yanına git ve kahve ısmarla (-25 TL)",
        text_en: "Go to her and buy her coffee",
        effects: { money: -25, happiness: 20, stress: -15, energy: -10 }
      },
      {
        text: "Sadece uzaktan selam ver.",
        text_en: "undefined",
        effects: { stress: -5 }
      }
    ]
  },

  // BÖLÜM 4: Kara Mehmet
  {
    id: "ch4_mehmet_teklif",
    chapter: 3,
    npc: { id: 'kara_mehmet' },
    baseWeight: 30,
    title: "Gölgedeki Adam",
    title_en: "Kara Mehmet's Offer",
    text: "Sokak lambasının altında Kara Mehmet beliriverdi. 'Zaman daralıyor. Borçların büyüyor. Benim yanımda çalışırsan her şey düzelir. Sadece tek bir kural var: Soru sormak yok.'",
    text_en: "Kara Mehmet, the feared figure of the neighborhood, stopped your way. 'You look like a smart kid. The boys have a job. If you enter, there's a serious cut for you.'",
    choices: [
      {
        text: "Kabul et. (+10.000 TL)",
        text_en: "Accept and step into the underworld",
        effects: { money: 10000, stress: 50, reputation: -30 }, // Aranma seviyesi artacak
        newMemoryToSave: "Kara Mehmet ile çalışmaya başladı. Karanlık yola girdi."
      },
      {
        text: "Reddet. (Beladan uzak dur)",
        text_en: "undefined",
        effects: { stress: -10, happiness: 10 }
      }
    ]
  }
];
