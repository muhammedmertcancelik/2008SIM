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
    text: "Postacı kapıya geldi ve elinde sarı bir zarf var. Askerlik şubesinden yoklama kaçağı durumuna düştüğüne dair resmi bir kağıt. Ya hemen şubeye gidip tecil işlemlerini halletmelisin ya da kaçmaya devam edebilirsin.",
    choices: [
      {
        text: "Şubeye Git ve Tecil Ettir (-50 TL)",
        effects: { stress: 15, money: -50, energy: -30, happiness: -10 },
        delayedEffect: null,
        newMemoryToSave: "Askerliği tecil ettirdi."
      },
      {
        text: "Zarfı Yırt At (Kaçmaya Devam Et)",
        effects: { stress: -5, reputation: -10, happiness: 10 },
        delayedEffect: { daysDelay: 90, triggerEventId: "e_askerlik_gbt" },
        newMemoryToSave: "Askerlik şubesinden gelen sarı zarfı yırtıp attı, kaçak yaşamaya başladı."
      }
    ]
  },
  {
    id: "e_askerlik_gbt",
    title: "Karanlık Sokakta GBT Çevirmesi",
    text: "Gece yarısı yolda yürürken polis çevirmesine denk geldin. Kimliğini verdin ve polis telsizinden anons geçildi: 'Şahıs yoklama kaçağı amirim.'",
    choices: [
      {
        text: "Paşa Paşa Teslim Ol (Masraf -200 TL)",
        effects: { stress: 50, energy: -50, happiness: -50, reputation: -20, money: -200 }
      },
      {
        text: "Cezayı Öde ve Rüşvet Ver (-500 TL)",
        effects: { stress: 20, energy: -20, money: -500, reputation: -30, happiness: -20 }
      }
    ]
  },
  {
    id: "e_karanlik_is",
    conditions: { minAge: 18, maxMoney: 5000 }, // Fakir ve gençlere gelsin
    baseWeight: 20,
    title: "Karanlık Bir Teklif",
    text: "Mahallede pek tekin olmayan biri seni köşeye çekti. 'Al şu paketi, yarın gece limandaki depoya bırak. İçinde ne olduğuna bakma. Karşılığında 5.000 TL nakit senin olacak.' dedi.",
    choices: [
      {
        text: "Kabul Et ve Paketi Teslim Et (Riskli)",
        effects: { money: 5000, stress: 50, reputation: -20, happiness: -10 },
        delayedEffect: { daysDelay: 14, triggerEventId: "e_karanlik_is_sonuc" },
        newMemoryToSave: "Gizemli bir paketi taşıyarak 5.000 TL kazandı ama peşine birilerini taktı."
      },
      {
        text: "Kabul Et Ama Paketi Açıp Bak",
        effects: { stress: 60, energy: -20, intelligence: 10 },
        delayedEffect: { daysDelay: 1, triggerEventId: "e_paket_acildi" },
        newMemoryToSave: "Karanlık adamın paketini gizlice açıp içindekileri gördü."
      },
      {
        text: "Kibarca Reddet (Güvenli)",
        effects: { stress: -10, money: 0, reputation: 10, luck: 5 },
        newMemoryToSave: "Karanlık ve yasadışı bir iş teklifini reddetti."
      }
    ]
  },
  {
    id: "e_karanlik_is_sonuc",
    title: "Gece Yarısı Baskını",
    text: "İki hafta önce limana bıraktığın paket yüzünden polis evini bastı. Kameralarda yüzün görünmüş. Seni karakola götürüyorlar.",
    choices: [
      {
        text: "Avukat Tut ve Kurtulmaya Çalış (-4000 TL)",
        effects: { money: -4000, stress: 80, happiness: -50, reputation: -30, health: -10 }
      },
      {
        text: "Suçu İtiraf Et (Hapis Yolu)",
        effects: { money: 0, stress: 100, happiness: -80, reputation: -50, relationship: -50, isGameOver: true, gameOverReason: "Polislerin baskını sonrasında suçunu itiraf ettin ve yıllarca sürecek hapis cezasına çarptırıldın. Özgürlüğün ve hayatın burada sona erdi." }
      }
    ]
  },
  {
    id: "e_paket_acildi",
    title: "Geri Dönüşü Olmayan Sır",
    text: "Paketi açtın. İçinde çalınmış eski ve paha biçilemez bir tablo parçası var. Teslim etmezsen peşine düşecekler, satarsan milyoner olabilirsin ama çok riskli.",
    choices: [
      {
        text: "Hemen Geri Kapat ve Teslim Et",
        effects: { money: 5000, stress: 40, happiness: -10 }
      },
      {
        text: "Tabloyu Karabasaya Sat (+20.000 TL)",
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
    text: "Gece 03:00'te telefonun çaldı. Ekranda 'GİZLİ NUMARA' yazıyor. Açtığında, karşıdaki sesin tamamen senin kendi sesinle aynı olduğunu fark ettin! 'Yarın o otobüse binme.' deyip kapattı.",
    choices: [
      {
        text: "Kafaya Takma, Normal Hayatına Devam Et",
        effects: { stress: 10, energy: -10 },
        delayedEffect: { daysDelay: 1, triggerEventId: "e_otobus_kaza" }
      },
      {
        text: "Paranoyaklaş, Bütün Gün Evden Çıkma",
        effects: { stress: 30, energy: -30, happiness: -10, money: -50 }, // İşe/okula gidemediği için ceza
        newMemoryToSave: "Kendi sesinden gelen uyarıyı dinleyip o gün evden hiç çıkmadı."
      }
    ]
  },
  {
    id: "e_otobus_kaza",
    title: "Haberlerdeki Son Dakika",
    text: "Televizyonu açtın. 'Son Dakika: Her sabah bindiğiniz otobüs şarampole yuvarlandı, çok sayıda yaralı var.' Eğer evden çıksaydın sen de o otobüste olacaktın.",
    choices: [
      {
        text: "Dehşet İçinde Şükret",
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
    text: "Hiç tanımadığın uzak bir akrabanın öldüğü ve sana sadece şifreli eski model kilitli bir çelik çanta miras bıraktığı söylendi. Avukat çantayı getirdi ancak şifresini kimse bilmiyor.",
    choices: [
      {
        text: "Çilingir Çağır ve Kır (-500 TL)",
        effects: { money: -500, stress: 20, intelligence: 10 },
        delayedEffect: { daysDelay: 2, triggerEventId: "e_canta_acildi" }
      },
      {
        text: "Kendin Günlerce Uğraşarak Çözmeye Çalış",
        effects: { energy: -50, stress: 30, intelligence: 20 },
        delayedEffect: { daysDelay: 5, triggerEventId: "e_canta_acildi" }
      },
      {
        text: "Çantayı Açmadan Çöpe At (Risk İstemiyorum)",
        effects: { stress: -20, happiness: 10, luck: -10 },
        newMemoryToSave: "İçinde ne olduğunu bilmediği gizemli mirası çöpe attı."
      }
    ]
  },
  {
    id: "e_canta_acildi",
    title: "Çantanın Sırrı",
    text: "Çantayı açmayı başardın. İçinden sadece tek bir şey çıktı: Senin küçüklüğüne ait, arkasında 'Seni hep izledim' yazan gizlice çekilmiş bir fotoğraf. Çantada para yok, sadece bu rahatsız edici mesaj var.",
    choices: [
      {
        text: "Fotoğrafı Yak ve Unut",
        effects: { stress: 40, happiness: -20, energy: -10 }
      },
      {
        text: "Polise Git ve Soruşturma Başlat",
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
    text: "Sokakta yürürken gökyüzü bir anda karardı ve bardaktan boşalırcasına yağmur başladı. Şemsiyen yok ve sırılsıklam oldun. Hastalanmamak için hemen bir yere sığınmalısın.",
    choices: [
      {
        text: "En Yakın Kafeye Gir ve Sıcak Bir Çay İç (-15 TL)",
        effects: { money: -15, stress: -5, happiness: 5, energy: 10 }
      },
      {
        text: "Koşarak Eve Gitmeye Çalış",
        effects: { energy: -20, stress: 10, health: -5 }
      }
    ]
  },
  {
    id: "e_repeat_stray_dog",
    baseWeight: 20,
    isRepeatable: true,
    title: "Sokak Köpeği",
    text: "Eve dönerken çok sevimli ama bir o kadar da aç görünen bir sokak köpeği peşine takıldı. Gözlerinin içine bakarak kuyruk sallıyor.",
    choices: [
      {
        text: "Bakkaldan Sosis Alıp Ver (-20 TL)",
        effects: { money: -20, happiness: 15, stress: -10 }
      },
      {
        text: "Görmezden Gel ve Yoluna Devam Et",
        effects: { happiness: -5, stress: 5 }
      }
    ]
  },
  {
    id: "e_repeat_neighbor",
    baseWeight: 20,
    isRepeatable: true,
    title: "Komşu Gürültüsü",
    text: "Gece yarısı üst komşun son ses müzik açtı ve uyuman imkansız. Yarın enerjiye ihtiyacın var ama sinirlerin iyice gerildi.",
    choices: [
      {
        text: "Kapısına Dayan ve Bağır",
        effects: { stress: 15, energy: -10, reputation: -5 }
      },
      {
        text: "Kulaklık Takıp Uyumaya Çalış",
        effects: { stress: 5, energy: -20 }
      }
    ]
  },
  {
    id: "e_repeat_traffic",
    baseWeight: 25,
    isRepeatable: true,
    title: "Trafik Felci",
    text: "Ana yolda büyük bir kaza olmuş. Trafik tamamen kilitlenmiş durumda ve saatlerce ilerlemiyor.",
    choices: [
      {
        text: "Otobüsten/Arabadan İn ve Yürü",
        effects: { energy: -30, stress: 10, health: -5 }
      },
      {
        text: "Sabırla Bekle",
        effects: { stress: 25, energy: -10 }
      }
    ]
  },
  {
    id: "e_repeat_wallet",
    baseWeight: 10,
    isRepeatable: true,
    title: "Yerde Duran Cüzdan",
    text: "Issız bir sokakta yürürken yerde içi para dolu kalın bir cüzdan buldun. Kimlik falan yok, sadece nakit para.",
    choices: [
      {
        text: "Parayı Al (+200 TL)",
        effects: { money: 200, reputation: -10, stress: 10 }
      },
      {
        text: "Olduğu Yere Bırak",
        effects: { happiness: 5, reputation: 5 }
      }
    ]
  },
  {
    id: "e_repeat_flu",
    baseWeight: 20,
    isRepeatable: true,
    title: "Mevsimsel Grip",
    text: "Sabah boğaz ağrısı ve halsizlikle uyandın. Ateşin var ve kemiklerin sızlıyor.",
    choices: [
      {
        text: "İlaç Alıp Dinlen (-30 TL)",
        effects: { money: -30, energy: 20, health: 10 }
      },
      {
        text: "Aldırış Etmeden Hayata Devam Et",
        effects: { health: -15, energy: -20, stress: 10 }
      }
    ]
  },
  {
    id: "e_repeat_friend",
    baseWeight: 15,
    isRepeatable: true,
    title: "Eski Bir Dost",
    text: "Yolda yürürken liseden eski bir arkadaşınla karşılaştın. Seni bir kahve içmeye davet ediyor.",
    choices: [
      {
        text: "Kabul Et ve Kahve Ismarla (-25 TL)",
        effects: { money: -25, happiness: 20, relationship: 10, stress: -15 }
      },
      {
        text: "Acelem Var Diyerek Geçiştir",
        effects: { happiness: -5, relationship: -5 }
      }
    ]
  },
  {
    id: "e_repeat_powerout",
    baseWeight: 15,
    isRepeatable: true,
    title: "Karanlığa Gömülmek",
    text: "Mahallede genel bir elektrik kesintisi oldu. Evde yapacak hiçbir şey yok ve zifiri karanlık.",
    choices: [
      {
        text: "Mum Yakıp Kitap Oku / Düşün",
        effects: { stress: -10, intelligence: 5 }
      },
      {
        text: "Sıkıntıdan Patla ve Stres Yap",
        effects: { stress: 15, happiness: -5 }
      }
    ]
  },
  {
    id: "e_repeat_sale",
    baseWeight: 20,
    isRepeatable: true,
    title: "Büyük İndirim Çılgınlığı",
    text: "Geçerken bir mağazada büyük bir sezon sonu indirimi olduğunu gördün. İçerisi hınca hınç dolu.",
    choices: [
      {
        text: "İçeri Gir ve İhtiyacın Olmayan Şeyler Al (-100 TL)",
        effects: { money: -100, happiness: 15, stress: -5 }
      },
      {
        text: "Nefsini Tut ve Eve Dön",
        effects: { stress: 5, happiness: -5 }
      }
    ]
  },
  {
    id: "e_repeat_help",
    baseWeight: 15,
    isRepeatable: true,
    title: "Yardıma Muhtaç Biri",
    text: "Pazardan dönen yaşlı bir teyzenin poşetleri yırtıldı ve elindeki her şey sokağa saçıldı.",
    choices: [
      {
        text: "Hemen Yardım Et ve Eşyaları Taşı",
        effects: { energy: -15, reputation: 15, happiness: 10 }
      },
      {
        text: "Görmezden Gelip Hızlıca Uzaklaş",
        effects: { reputation: -10, happiness: -10, stress: 5 }
      }
    ]
  },
  {
    id: "e_repeat_noise",
    baseWeight: 15,
    isRepeatable: true,
    title: "Sokak Çalgıcısı",
    text: "Köşede çok yetenekli bir sokak çalgıcısı en sevdiğin şarkıyı çalıyor. İnsanlar etrafında toplanmış.",
    choices: [
      {
        text: "Bir Süre Dinle ve Bahşiş At (-10 TL)",
        effects: { money: -10, happiness: 15, stress: -10 }
      },
      {
        text: "Umursamadan Geç",
        effects: { }
      }
    ]
  },
  {
    id: "e_repeat_creepy_noise",
    baseWeight: 10,
    isRepeatable: true,
    title: "Gece Yarısı Tıkırtıları",
    text: "Gece uyurken pencerenin dışından garip tıkırtılar duymaya başladın. Biri sanki camı zorluyor gibi.",
    choices: [
      {
        text: "Kalk ve Kontrol Et",
        effects: { stress: 20, energy: -15, reputation: 5 }
      },
      {
        text: "Yorganı Kafana Çek ve Uyu",
        effects: { stress: 10 }
      }
    ]
  },
  {
    id: "e_repeat_bus_argument",
    baseWeight: 20,
    isRepeatable: true,
    title: "Toplu Taşıma Kavgası",
    text: "Otobüste iki yolcu arasında yüksek sesli bir kavga çıktı. İkisi de birbirine bağırıyor ve ortam çok gergin.",
    choices: [
      {
        text: "Araya Girip Ayırmaya Çalış",
        effects: { stress: 20, reputation: 15, energy: -10 }
      },
      {
        text: "Sessizce Kulaklık Takıp İzle",
        effects: { stress: 5, happiness: -5 }
      }
    ]
  }
];
