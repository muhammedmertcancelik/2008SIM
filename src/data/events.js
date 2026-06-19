// ============================================
// HAFTALIK OLAYLAR VE TERCİHLER SİSTEMİ
// ============================================

export const WEEKLY_EVENTS = [
  {
    id: 'e1',
    title: 'Nostaljik Korsan CD',
    text: 'Mahalledeki seyyar satıcı elinde "En Yeni MP3\'ler ve Oyunlar" yazılı bir CD kutusuyla yanına yaklaştı. Normalde çok daha pahalı olan bu içerikler sadece 10 TL.',
    choices: [
      { text: 'CD\'yi satın al (-10 TL, Stres Düşer)', effects: { money: -10, stress: -15, energy: 0, relationship: 0 } },
      { text: 'Yoluna devam et (Cebinden 5 TL düşürdün)', effects: { money: -5, stress: 5, energy: 0, relationship: 0 } }
    ]
  },
  {
    id: 'e2',
    title: 'Mesai Arkadaşının Borcu',
    text: 'İş yerinden yakın bir arkadaşın maddi sıkışıklık yaşadığını söyleyip senden acil 50 TL borç istedi. Geri ödeyeceğine söz veriyor.',
    choices: [
      { text: 'Borç ver (-50 TL, vicdan rahatlar)', effects: { money: -50, stress: -10, energy: 0, relationship: 10 } },
      { text: 'Yok de (Yemeği sen ısmarladın -15 TL)', effects: { money: -15, stress: 5, energy: 0, relationship: -5 } }
    ]
  },
  {
    id: 'e3',
    title: 'Boş Metrobüs!',
    text: 'İşe giderken metrobüste boş koltuk buldun! Oturmak için hamle yaparken yaşlı bir teyzenin de baktığını gördün.',
    choices: [
      { text: 'Hemen otur! (Çantan yırtıldı -10 TL)', effects: { money: -10, stress: 15, energy: 20, relationship: -5 } },
      { text: 'Teyzeye yer ver (Yerde 5 TL buldun)', effects: { money: 5, stress: -10, energy: -15, relationship: 5 } }
    ]
  },
  {
    id: 'e4',
    title: 'Patronun Şüpheli Teklifi',
    text: 'Patronun seni yanına çağırıp "Maliyeden denetim gelecek, faturaları biraz makyajlayalım. Sana da 200 TL veririm" dedi.',
    choices: [
      { text: 'Kabul et (+200 TL, büyük Stres)', effects: { money: 200, stress: 40, energy: -10, relationship: 5 } },
      { text: 'Dürüst kal (Priminden kesti -30 TL)', effects: { money: -30, stress: 0, energy: 0, relationship: -10 } }
    ]
  },
  {
    id: 'e5',
    title: 'İnternet Koptu',
    text: 'Evdeki ADSL bağlantısı sürekli kopuyor. Müşteri hizmetlerini aramak için 1 saat telefonda müzik dinlemen gerekecek.',
    choices: [
      { text: 'Ara ve çöz (Telefon faturası -15 TL)', effects: { money: -15, stress: 10, energy: -20, relationship: 0 } },
      { text: 'Boşver, dışarı çık (Çay içtin -10 TL)', effects: { money: -10, stress: 15, energy: 0, relationship: 5 } }
    ]
  },
  {
    id: 'e6',
    title: 'Eskici Geçiyor',
    text: '"Eskiyeeeee! Eskici geldi hanııım!" sesiyle irkildin. Evdeki eski radyoyu ve kitapları satsan biraz kazanırsın.',
    choices: [
      { text: 'Eskileri sat (+25 TL, Enerji kaybı)', effects: { money: 25, stress: 0, energy: -15, relationship: 0 } },
      { text: 'Kalsın (Eşya kırıldı, masraf -10 TL)', effects: { money: -10, stress: 10, energy: 0, relationship: 0 } }
    ]
  },
  {
    id: 'e7',
    title: 'Sokak Köpeği',
    text: 'Kapının önünde çok aç ve bitkin görünen bir sokak köpeği var. Sana masum masum bakıyor.',
    choices: [
      { text: 'Mama alıp besle (-15 TL, Huzur)', effects: { money: -15, stress: -20, energy: 0, relationship: 5 } },
      { text: 'Geç git (Vicdan azabı, tatlı aldın -20 TL)', effects: { money: -20, stress: 15, energy: 0, relationship: 0 } }
    ]
  },
  {
    id: 'e8',
    title: 'Fırsat Kuponu',
    text: 'Gazetenin arasında lüks bir restoranda %50 indirim sağlayan bir kupon buldun. Fırsat kolay gelmez.',
    choices: [
      { text: 'Restorana git (-100 TL, Full Enerji)', effects: { money: -100, stress: -100, energy: 100, relationship: 0 } },
      { text: 'Kuponu at (Makarna malzemesi -15 TL)', effects: { money: -15, stress: 10, energy: 0, relationship: 0 } }
    ]
  },
  {
    id: 'e9',
    title: 'Ailenin Sitemi',
    text: 'Annen aradı: "Hiç aramıyorsun, hayırsız evlat oldun! Hafta sonu bari gel de bir yüzünü görelim." diyor.',
    choices: [
      { text: 'Ziyarete git (Yol/Hediye -25 TL)', effects: { money: -25, stress: 10, energy: -20, relationship: 15 } },
      { text: 'Bahaneler uydur (Çiçek yolladın -40 TL)', effects: { money: -40, stress: -5, energy: 0, relationship: -10 } }
    ]
  },
  {
    id: 'e10',
    title: 'Arkadaşın Düğünü',
    text: 'Liseden çok yakın bir arkadaşın evleniyor. Çeyrek altın takman gerekiyor ama fiyatlar uçmuş!',
    choices: [
      { text: 'Çeyrek tak (-70 TL, İlişki Artar)', effects: { money: -70, stress: 10, energy: -10, relationship: 20 } },
      { text: 'Hediye gönder (-30 TL, İlişki Düşer)', effects: { money: -30, stress: 5, energy: 0, relationship: -10 } },
      { text: 'Gitme (Arkadaşın borcunu istedi -50 TL)', effects: { money: -50, stress: -10, energy: 10, relationship: -30 } }
    ]
  },
  {
    id: 'e11',
    title: 'Eski Sevgili / Flört',
    text: 'Eski bir flörtün sana mesaj attı: "Nasılsın? Akşam bir kahve içelim mi?"',
    choices: [
      { text: 'Kahveye git (Hesabı sen ödedin -40 TL)', effects: { money: -40, stress: -15, energy: -15, relationship: 25 } },
      { text: 'Görüldü at (Efkarlanıp sipariş verdin -15 TL)', effects: { money: -15, stress: 0, energy: 0, relationship: -10 } }
    ]
  },
  {
    id: 'e12',
    title: 'Kontör Bitti',
    text: 'Sevgilinle mesajlaşırken tam en can alıcı yerde "Bakiyeniz yetersiz" uyarısı aldın. Bakkaldan kontör alman lazım.',
    choices: [
      { text: '100 Kontör Al (-20 TL)', effects: { money: -20, stress: -10, energy: 0, relationship: 10 } },
      { text: 'Ödemeli At (Karşı taraf trip attı -5 TL ceza)', effects: { money: -5, stress: 15, energy: 0, relationship: -15 } }
    ]
  },
  {
    id: 'e13',
    title: 'Ucuz Döner Sendromu',
    text: 'Acıktın ve köşedeki "Yarım Ekmek Tavuk Döner + Ayran 2.5 TL" tabelası sana göz kırpıyor. Etin ne eti olduğu meçhul.',
    choices: [
      { text: 'Ye Gitsin! (Zehirlendin, ilaç masrafı -15 TL)', effects: { money: -15, stress: 20, energy: -30, relationship: 0 } },
      { text: 'Lüks Ye (Düzgün yemeğe -25 TL)', effects: { money: -25, stress: -10, energy: 30, relationship: 0 } }
    ]
  },
  {
    id: 'e14',
    title: 'Sahte Komiser',
    text: 'Telefonun çaldı. Tok bir ses "Ben Başkomiser Kemal. Terör örgütü banka hesabınıza sızmış, hemen şu numaraya kontör yollayın!" dedi.',
    choices: [
      { text: 'Korkudan Kontör Yolla (-50 TL)', effects: { money: -50, stress: 30, energy: 0, relationship: 0 } },
      { text: 'Yüze Kapat (Adam inat edip seni uykusuz bıraktı -10 TL)', effects: { money: -10, stress: 20, energy: -20, relationship: 0 } }
    ]
  },
  {
    id: 'e15',
    title: 'Halı Saha Maçı',
    text: 'Akşam 10-11 halı saha maçında adam eksik, seni çağırıyorlar. Kalede mi geçersin, forvette mi?',
    choices: [
      { text: 'Forvet Oyna (Saha parası ve baklava -35 TL)', effects: { money: -35, stress: -20, energy: -40, relationship: 20 } },
      { text: 'Kalede Dur (Ayakkabın yırtıldı, tamiri -20 TL)', effects: { money: -20, stress: -5, energy: -15, relationship: 10 } },
      { text: 'Gitme (Evde TV başında cips yedin -10 TL)', effects: { money: -10, stress: 10, energy: 0, relationship: -15 } }
    ]
  },
  {
    id: 'e16',
    title: 'Komşu Ziyareti',
    text: 'Üst kat komşun akşam çaya çağırdı. Eli boş gidilmez, mahalle pastanesinden bir şeyler almak şart.',
    choices: [
      { text: 'Kuru Pasta Al (-25 TL, Komşu Sevindi)', effects: { money: -25, stress: 0, energy: 0, relationship: 15 } },
      { text: 'Evde Kek Yap (Malzemeler -15 TL, Enerji Düştü)', effects: { money: -15, stress: 10, energy: -20, relationship: 10 } },
      { text: 'Gitme (Elektrik faturasına itiraz ederken -10 TL)', effects: { money: -10, stress: 15, energy: 0, relationship: -20 } }
    ]
  },
  {
    id: 'e17',
    title: 'Su Tesisatı Patladı',
    text: 'Gecenin bir yarısı mutfak lavabosunun altından su fışkırmaya başladı. Mutfak göle dönüyor!',
    choices: [
      { text: 'Acil Usta Çağır (-80 TL)', effects: { money: -80, stress: -10, energy: -10, relationship: 0 } },
      { text: 'Kendin Tamir Et (Boruyu kırdın, usta -150 TL aldı)', effects: { money: -150, stress: 40, energy: -30, relationship: 0 } }
    ]
  },
  {
    id: 'e18',
    title: 'Derbi Günü',
    text: 'Akşam çok kritik bir derbi var. Kahvehanede maç yayını izlemek paralı.',
    choices: [
      { text: 'Kahvehaneye Git (Çay+Maç Parası -30 TL)', effects: { money: -30, stress: -20, energy: 0, relationship: 15 } },
      { text: 'Radyodan Dinle (Çekirdek -10 TL, Stres Tavan)', effects: { money: -10, stress: 25, energy: 0, relationship: 0 } }
    ]
  },
  {
    id: 'e19',
    title: 'Kredi Kartı Ekstresi',
    text: 'Kredi kartı ekstresi geldi ve düşündüğünden biraz daha kabarık. Asgariyi mi ödesen, tamamını mı?',
    choices: [
      { text: 'Tamamını Öde (-150 TL)', effects: { money: -150, stress: -30, energy: 0, relationship: 0 } },
      { text: 'Asgariyi Öde (Faiz bindi, daha çok yansıyacak -30 TL)', effects: { money: -30, stress: 20, energy: 0, relationship: 0 } }
    ]
  },
  {
    id: 'e20',
    title: 'Diş Ağrısı',
    text: 'Yirmilik dişin sızlamaya başladı. Gününü zehir ediyor. Devlet hastanesine mi özel kliniğe mi gitmeli?',
    choices: [
      { text: 'Özele Git (-120 TL, Anında Çözüm)', effects: { money: -120, stress: -40, energy: 10, relationship: 0 } },
      { text: 'Devletten Randevu Al (Yol ve ağrı kesici -20 TL)', effects: { money: -20, stress: 30, energy: -30, relationship: 0 } }
    ]
  },
  {
    id: 'e21',
    title: 'Kazı Kazan!',
    text: 'Yolda yürürken Seyyar Milli Piyangocu "Şansını dene beyim, kazı kazan" diye seslendi.',
    choices: [
      { text: '3 Tane Al (-15 TL, Hiçbir Şey Çıkmadı)', effects: { money: -15, stress: 10, energy: 0, relationship: 0 } },
      { text: '1 Tane Al (-5 TL, Amorti vurdu, döner yedin -10 TL)', effects: { money: -10, stress: -5, energy: 10, relationship: 0 } },
      { text: 'Alma (Adam peşinden küfretti, stres oldun -5 TL)', effects: { money: -5, stress: 15, energy: 0, relationship: 0 } }
    ]
  },
  {
    id: 'e22',
    title: 'Korsan Maç Forması',
    text: 'Pazarda gezerken tuttuğun takımın çok ucuz çakma formasını gördün. Renkleri biraz tuhaf ama iş görür.',
    choices: [
      { text: 'Satın Al (-25 TL, İlk yıkamada çekti)', effects: { money: -25, stress: 15, energy: 0, relationship: 0 } },
      { text: 'Alma (Kaliteli tişört aldın -40 TL)', effects: { money: -40, stress: -10, energy: 0, relationship: 0 } }
    ]
  },
  {
    id: 'e23',
    title: 'Kışlık Kömür / Doğalgaz',
    text: 'Havalar soğudu. Ya kömür alman lazım ya da kombinini peteklerini açman.',
    choices: [
      { text: 'Kombiyi Sonuna Kadar Aç (Fatura -100 TL)', effects: { money: -100, stress: -20, energy: 0, relationship: 0 } },
      { text: 'Kapat, Battaniyeye Sarıl (Üşüttün, ilaç -40 TL)', effects: { money: -40, stress: 30, energy: -40, relationship: 0 } }
    ]
  },
  {
    id: 'e24',
    title: 'Bayram Geldi',
    text: 'Kurban bayramı geldi çattı. Küçük yeğenler el öpmeye sıraya girdi, hepsi harçlık bekliyor.',
    choices: [
      { text: 'Herkese Bol Harçlık Dağıt (-80 TL)', effects: { money: -80, stress: -10, energy: 0, relationship: 30 } },
      { text: 'Şeker Ver Geç (Yeğenler ağladı, şeker -20 TL)', effects: { money: -20, stress: 20, energy: 0, relationship: -20 } }
    ]
  },
  {
    id: 'e25',
    title: 'Ev Sahibinin Telefonu',
    text: 'Ev sahibi aradı: "Kardeşim enflasyon malum, kiraya ara zam yapmamız lazım" diyor. Sözleşme bitmemişti ama...',
    choices: [
      { text: 'Kavga Et (Mahkemelik oldun, avukat -150 TL)', effects: { money: -150, stress: 50, energy: -30, relationship: 0 } },
      { text: 'Alttan Al, Küçük Zam (-60 TL)', effects: { money: -60, stress: 10, energy: 0, relationship: 0 } }
    ]
  },
  {
    id: 'e26',
    title: 'İş Yerinde Doğum Günü',
    text: 'Patronun doğum günüymüş. Ofiste herkes para toplayıp lüks bir hediye alma kararı almış.',
    choices: [
      { text: 'Gruba Katıl (-40 TL, Gözüne Girdin)', effects: { money: -40, stress: -5, energy: 0, relationship: 10 } },
      { text: 'Ben Yokum De (Dışlandın, kendi pastanı aldın -15 TL)', effects: { money: -15, stress: 25, energy: 0, relationship: -15 } }
    ]
  },
  {
    id: 'e27',
    title: 'Arabası Bozulan Dayı',
    text: 'Dayının Şahin marka arabası yolda kalmış. Senden acil çekici parası istiyor.',
    choices: [
      { text: 'Çekici Parasını Yolla (-70 TL)', effects: { money: -70, stress: 0, energy: 0, relationship: 25 } },
      { text: 'Telefonu Açma (İçip efkarlandın -25 TL)', effects: { money: -25, stress: 20, energy: 0, relationship: -25 } }
    ]
  },
  {
    id: 'e28',
    title: 'Korsan Oyun CD\'si Bozuk Çıktı',
    text: 'Geçen hafta aldığın GTA Vice City CD\'si çizik çıktı. Gidip değiştirmek istersen adamla tartışman gerekecek.',
    choices: [
      { text: 'Kavga Et (Gözün morardı, krem -15 TL)', effects: { money: -15, stress: 30, energy: -20, relationship: 0 } },
      { text: 'Sineye Çek (Yenisini aldın -10 TL)', effects: { money: -10, stress: 10, energy: 0, relationship: 0 } }
    ]
  },
  {
    id: 'e29',
    title: 'Pazar Alışverişi Kazığı',
    text: 'Pazardan meyve aldın ama pazarcı hep ezik ve çürükleri koymuş poşete.',
    choices: [
      { text: 'Geri Dönüp İtiraz Et (Meyveler döküldü -20 TL)', effects: { money: -20, stress: 25, energy: -15, relationship: 0 } },
      { text: 'Çürükleri Atıp Ye (Aç kaldın, döner söyledin -25 TL)', effects: { money: -25, stress: 5, energy: 10, relationship: 0 } }
    ]
  },
  {
    id: 'e30',
    title: 'Kaçak Elektrik Faturası',
    text: 'Apartmanda ortak kullanım elektrik faturası yine yüksek gelmiş. Yönetici herkesten ekstra para istiyor.',
    choices: [
      { text: 'Paşa Paşa Öde (-40 TL)', effects: { money: -40, stress: 10, energy: 0, relationship: 5 } },
      { text: 'Yöneticiyle Kavga Et (Mahalleli sana düşman oldu -10 TL)', effects: { money: -10, stress: 40, energy: -20, relationship: -20 } }
    ]
  }
];

export function getRandomEvent() {
  const randomIndex = Math.floor(Math.random() * WEEKLY_EVENTS.length);
  return WEEKLY_EVENTS[randomIndex];
}
