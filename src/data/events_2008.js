export const EVENTS_2008 = [
  {
    id: "e_askerlik_1",
    yearMin: 2008,
    yearMax: 2012,
    title: "Sarı Zarf Kapıda",
    text: "Postacı kapıya geldi ve elinde sarı bir zarf var. Askerlik şubesinden yoklama kaçağı durumuna düştüğüne dair resmi bir kağıt. Ya hemen şubeye gidip tecil işlemlerini halletmelisin ya da kaçmaya devam edebilirsin. Kaçarsan ileride GBT'de yakalanma riskin var.",
    choices: [
      {
        text: "Şubeye Git ve Tecil Ettir (-50 TL)",
        effects: { stress: 15, money: -50, energy: -30, happiness: -10 },
        delayedEffect: null
      },
      {
        text: "Zarfı Yırt At (Kaçmaya Devam Et)",
        effects: { stress: -5, reputation: -10, happiness: 10 },
        delayedEffect: { daysDelay: 90, triggerEventId: "e_askerlik_gbt" } 
      }
    ]
  },
  {
    id: "e_askerlik_gbt",
    title: "Karanlık Sokakta GBT Çevirmesi",
    text: "Gece yarısı yolda yürürken polis çevirmesine denk geldin. Kimliğini verdin ve polis telsizinden anons geçildi: 'Şahıs yoklama kaçağı amirim.' Aylar önce yırttığın sarı zarfın bedeli seni buldu.",
    choices: [
      {
        text: "Paşa Paşa Teslim Ol (Masraf -200 TL)",
        effects: { stress: 50, energy: -50, happiness: -50, reputation: -20, money: -200 }
      },
      {
        text: "Cezayı Öde (-500 TL)",
        effects: { stress: 20, energy: -20, money: -500, reputation: -30, happiness: -20 }
      }
    ]
  },
  {
    id: "e_msn_ask",
    title: "MSN Messenger'da Titreşim",
    text: "Gece geç saatlerde MSN'de otururken yıllardır hoşlandığın kişiden art arda titreşim geldi. 'Uyudun mu? Sana bir şey söylemem lazım...' yazdı. O an kalbin hızla atmaya başladı.",
    choices: [
      {
        text: "Uyuyorum numarası yap",
        effects: { stress: -10, happiness: -20, reputation: -5, relationship: -20 }
      },
      {
        text: "'Uyumadım, dinliyorum' de",
        effects: { stress: 20, energy: -30, happiness: 40, relationship: 50 },
        delayedEffect: { daysDelay: 14, triggerEventId: "e_ilk_bulusma" }
      }
    ]
  },
  {
    id: "e_ilk_bulusma",
    title: "İlk Buluşma Krizleri",
    text: "İki hafta önce MSN'de yaptığınız konuşmadan sonra bugün ilk kez buluşacaksınız. Ancak hava inanılmaz sıcak, ter içindesin ve cüzdanında çok da fazla paran yok.",
    choices: [
      {
        text: "Lüks Bir Kafeye Götür (-150 TL)",
        effects: { stress: 30, money: -150, happiness: 20, relationship: 20 }
      },
      {
        text: "Parkta Çekirdek Çitle (-15 TL)",
        effects: { stress: -10, money: -15, happiness: 30, relationship: -10 }
      }
    ]
  },
  {
    id: "e_internet_kafe",
    title: "İnternet Kafe GTA Turnuvası",
    text: "Mahalledeki internet kafede GTA Vice City helikopter görevi turnuvası düzenleniyor. Giriş 20 TL. Birinciye 1 Aylık Sınırsız Masa açılacak.",
    choices: [
      {
        text: "Turnuvaya Katıl (-20 TL)",
        effects: { stress: 20, money: -20, energy: -30, happiness: 10, reputation: 10 }
      },
      {
        text: "İzle ve Taktik Ver",
        effects: { stress: -5, money: 0, energy: -10, happiness: 5, relationship: 10 }
      }
    ]
  },
  {
    id: "e_nokia_batarya",
    title: "Nokia 3310 Batarya Şişmesi",
    text: "Telefonunun arka kapağı kapanmıyor çünkü batarya davul gibi şişmiş. Patlama ihtimali var ama yeni batarya almak masraflı.",
    choices: [
      {
        text: "Orijinal Batarya Al (-60 TL)",
        effects: { stress: -10, money: -60, energy: 0, health: 0 }
      },
      {
        text: "Buzdolabına Koy (Belki İner)",
        effects: { stress: 20, money: 0, energy: -5, health: -10, reputation: -5 },
        delayedEffect: { daysDelay: 7, triggerEventId: "e_nokia_patlama" }
      }
    ]
  },
  {
    id: "e_nokia_patlama",
    title: "Kısa Devre Yapan Telefon",
    text: "Buzdolabına koyup kurtarmaya çalıştığın şişmiş bataryalı telefon cebindeyken bir anda ısınmaya ve duman çıkarmaya başladı. Panikle yere attın ama telefon tamamen öldü.",
    choices: [
      {
        text: "Yeni Telefon Almak Zorunda Kal (-300 TL)",
        effects: { stress: 40, money: -300, energy: -20, happiness: -30 }
      }
    ]
  },
  {
    id: "e_akraba_dugun",
    title: "Uzaktan Akraba Düğünü",
    text: "Hiç sevmediğin ve 10 yıldır görmediğin uzaktan bir akrabanın düğün davetiyesi geldi. Şehir dışında. Ailen mutlaka gitmen gerektiğini söylüyor.",
    choices: [
      {
        text: "Otobüsle Git ve Altın Tak (-200 TL)",
        effects: { stress: 30, money: -200, energy: -40, relationship: 20, happiness: -20 }
      },
      {
        text: "Hastalık Bahanesi Uydur (Gitme)",
        effects: { stress: 10, money: 0, energy: 0, relationship: -30, reputation: -15 },
        delayedEffect: { daysDelay: 30, triggerEventId: "e_akraba_trip" }
      }
    ]
  },
  {
    id: "e_akraba_trip",
    title: "Düğüne Gitmemenin Bedeli",
    text: "Geçen ay hastalığı bahane edip gitmediğin akraba düğününde, dedikoducu teyzeler senin aslında hasta olmadığını, sırf altın takmamak için gelmediğini bütün sülaleye yaymış.",
    choices: [
      {
        text: "Umursama (Saygınlık İyice Düşer)",
        effects: { stress: 10, reputation: -20, happiness: -10, relationship: -10 }
      },
      {
        text: "Hediyeyle Gönül Al (-100 TL)",
        effects: { stress: 20, money: -100, reputation: 10, relationship: 20 }
      }
    ]
  },
  {
    id: "e_korsan_film",
    title: "Sinema Çekimi Film",
    text: "Çok beklediğin o ünlü Hollywood filmi sonunda kasetçiye düşmüş! Ancak görüntü sinema çekimi ve adamın biri filmin ortasında ekrandan geçiyor.",
    choices: [
      {
        text: "Korsan CD Al (-5 TL, Gözlerin Bozulur)",
        effects: { stress: 15, money: -5, energy: -10, health: -5, happiness: 10 }
      },
      {
        text: "Parayı Biriktirip Sinemaya Git (-25 TL)",
        effects: { stress: -10, money: -25, energy: -5, happiness: 30 }
      }
    ]
  }
];
