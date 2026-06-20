export const translations = {
  tr: {
    quests: {
      reputation: 'İtibar',
      wanted: 'Aranma',
      item: 'Eşya',
      activeQuests: 'Aktif Görevler',
      noActiveQuests: 'Şu an aktif bir göreviniz bulunmuyor.',
      progress: 'İlerleme',
      reward: 'Ödül',
      availableQuests: 'Alınabilir Görevler',
      noAvailableQuests: 'Şu an alınabilir bir görev bulunmuyor.',
      acceptQuest: 'Görevi Kabul Et'
    },
    investment: {
      alerts: {
        noMoney: 'Yetersiz Bakiye',
        noMoneyDesc: 'Bu işlem için {cost} paranız olması gerekiyor.',
        noStock: 'Yetersiz Hisse',
        noStockDesc: 'Sadece {owned} adet {stock} hissesine sahipsiniz.'
      },
      portfolioSummary: 'Portföy Özeti',
      totalPortfolio: 'Toplam Portföy Değeri',
      sinceMonthStart: 'Ay başından beri',
      basePrice: 'Birim Fiyat',
      owned: 'Sahip Olunan',
      value: 'Değer'
    },
    diary: {
      emptyBookTitle: 'Kitabın Henüz Boş',
      emptyBookSubtitle: 'Başına ilginç olaylar geldikçe veya hayatında dönüm noktaları yaşadıkça kitabına yeni sayfalar eklenecek.',
      prevPage: 'Önceki',
      pageInfo: 'Sayfa {current} / {total}',
      nextPage: 'Sonraki',
      chapter: 'Bölüm {num}',
      date: '{day} / {year}',
      progressLabel: 'Kitap Tamamlama İlerlemesi',
      progressText: '{written} / {total} Sayfa Yazıldı',
      alerts: {
        tired: 'Çok Yorgunsun',
        tiredDesc: 'Kitap yazmak için yeterli enerjin yok.',
        alreadyDone: 'Zaten Yazdın',
        alreadyDoneDesc: 'Bugün zaten kitapla ilgilendin, yarın devam et.'
      },
      emptyCharsTitle: 'Henüz Kimseyi Tanımıyorsun',
      emptyCharsSubtitle: 'Şehirde dolaşarak yeni insanlarla tanışabilirsin.',
      relationships: {
        veryClose: 'Çok Yakın',
        friend: 'Arkadaş',
        acquaintance: 'Tanıdık',
        distant: 'Mesafeli',
        cold: 'Soğuk'
      },
      interact: 'Etkileşim',
      title: 'Hayat Kitabım',
      tabs: {
        pages: 'Sayfalar',
        characters: 'Karakterler'
      }
    },
    charCreation: {
      questionLabel: 'Soru {index}: {question}'
    },
    city: {
      title: 'Şehir Merkezi',
      subtitle: 'Dışarıda hayat akıyor. Paranı ve enerjini dikkatli harca.',
      alerts: {
        noEnergy: 'Enerjin Yok',
        noEnergyDesc: '{name} için {cost} enerjiye ihtiyacın var.',
        noMoney: 'Paran Yok',
        noMoneyDesc: '{name} için {cost} TL gerekiyor.',
        visitTitle: 'Ziyaret Edildi',
        visitDesc: '{name} mekanına gittin. (-{energy} Enerji, -{money} TL)',
        deliveryDone: 'Teslimat Tamamlandı!',
        deliveryDoneDesc: '{coins} altın topladın, {reward} TL kazandın.',
        accident: 'Kaza Yaptın!',
        accidentDesc: 'Paketler döküldü, para kazanamadın.'
      },
      streetFood: {
        title: '🌭 Sokak Lezzetleri',
        desc: 'Ucuz ve hızlı bir atıştırmalık.',
        req: 'Gereksinim: 20 TL',
        effect: 'Açlık: -50 | Enerji: +10 | Sağlık: +5',
        name: 'Sokak Lezzetleri',
        btn: 'Yemek Ye (20 TL)'
      },
      delivery: {
        title: '🛵 Kurye Görevi',
        desc: 'Paketleri topla ve para kazan. Kaza yapmamaya dikkat et!',
        req: 'Gereksinim: 30 Enerji',
        effect: 'Değişken Kazanç',
        btn: 'Kurye Minioyununa Başla'
      },
      gym: {
        title: '🏋️ Spor Salonu',
        desc: 'Ter atarak sağlığını koru ve stres at.',
        req: 'Gereksinim: 30 TL, 40 Enerji',
        effect: 'Sağlık: +10',
        name: 'Spor Salonu',
        btn: 'Antrenman Yap (30 TL)'
      },
      bar: {
        title: '🍻 Gece Kulübü & Bar',
        desc: 'Günün stresini at ama cüzdanına ve sağlığına dikkat et.',
        req: 'Gereksinim: 50 TL, 20 Enerji',
        effect: 'Mutluluk: +10 | Stres: -30 | Sağlık: -5',
        name: 'Gece Kulübü',
        btn: 'Eğlen (50 TL)'
      },
      casino: {
        title: '🎰 Kumarhane (Beta)',
        desc: 'Zengin olmak ya da batmak... Sadece şansına güven.',
        req: 'Yakında eklenecek.',
        btn: 'Kumar Oyna'
      },
      hack: {
        title: '💻 Karanlık Ağ (Hacking)',
        desc: 'Yasadışı yollardan para kazanmak ister misin? Yakalanma riski var.',
        req: 'Gereksinim: 30 Enerji',
        effect: 'Yüksek Kazanç / Aranma Riski',
        btn: 'Hacking Minioyununa Başla'
      },
      explore: 'Şehri Keşfet'
    },
    bank: {
      creditLimit: 'Kredi Limiti',
      debt: 'Borç',
      pay: 'Öde',
      take: 'Çek'
    },
    gameOver: {
      titles: {
        success: 'Mutlu Son',
        pyrrhic: 'Buruk Zafer',
        peace: 'Huzurlu Yaşam',
        bitter: 'Acı Dolu Hayat',
        dark: 'Karanlık Sokaklar',
        lastPage: 'Son Sayfa',
        unfinished: 'Yarım Kalan Hikaye'
      },
      subtitles: {
        complete: 'Hikayenin sonuna geldin.',
        arrested: 'Hapishanede çürümeye mahkum oldun.',
        died: 'Hayata veda ettin.'
      },
      author: 'Yazar:',
      anonymous: 'İsimsiz',
      pagesWritten: '{count} Sayfa Yazıldı',
      pagesUnfinished: '{count} Sayfada Kaldı',
      deathTitle: 'Ölüm Nedeni',
      statsTitle: 'Hayat İstatistikleri',
      finalBalance: 'Kalan Para',
      totalEarned: 'Kazanılan',
      totalSpent: 'Harcanan',
      months: 'Ay',
      timeLived: 'Yaşanan Süre',
      peopleMet: 'Tanınan Karakterler',
      lastMemories: 'Son Anılar',
      newGame: 'Yeniden Başla'
    }
  }
};

export const getTranslation = (lang = 'tr') => {
  return (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    return value || key;
  };
};
