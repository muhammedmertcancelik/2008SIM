// ============================================
// YAPAY ZEKA HİKAYE ANLATICISI (AI Storyteller)
// ============================================

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export class AIStoryteller {
  /**
   * Oyuncunun durumuna göre Gemini API'sini çağırarak dinamik bir olay oluşturur.
   */
  static async generateDynamicEvent(gameState) {
    if (!GEMINI_API_KEY) {
      console.warn("EXPO_PUBLIC_GEMINI_API_KEY bulunamadı!");
      return this.getFallbackEvent();
    }

    const { profile, hiddenStats, experience, money, bankDebt, health, happiness, stress, job, memories } = gameState;

    const dna = `
    Geçmiş: ${profile.storyId}
    Kader: ${profile.fateId}
    Şans: ${hiddenStats.luck || 50}/100
    Disiplin: ${hiddenStats.discipline || 50}/100
    Zeka: ${hiddenStats.intelligence || 50}/100
    Risk Alma: ${hiddenStats.riskTaking || 50}/100
    `;

    const currentStats = `
    Meslek: ${job} (Seviye ${hiddenStats.levels?.job || 1})
    Finans: Seviye ${hiddenStats.levels?.finance || 1}
    Para: ${money} TL
    Borç: ${bankDebt} TL
    Sağlık: ${health}/100
    Mutluluk: ${happiness}/100
    Stres: ${stress}/100
    `;

    const pastMemories = (memories && memories.length > 0) 
      ? memories.slice(-5).join(", ") 
      : "Henüz önemli bir anısı yok.";

    const systemPrompt = `Sen, gerçekçi ve yapay zeka destekli bir yaşam simülasyonu RPG oyununun "AI Storyteller" (Hikaye Anlatıcısı) motorusun. 
Görevin, sana verilen Karakter DNA'sı, Mevcut Durum ve Geçmiş Anılar verilerini analiz ederek, karakterin hayatında MERAK UYANDIRICI, GİZEMLİ, POLİSİYE, DERİN DRAM veya AHLAKİ İKİLEM içeren bir dönüm noktası (milestone) yaratmaktır.

Olaylar sıradan günlük aktiviteler (işten dönmek, yemek yemek) olmamalıdır! Oyuncunun tüylerini ürpertecek, terletecek, meraklandıracak veya onu çok zor bir seçime zorlayacak senaryolar yazmalısın. Olaylar tamamen mantıklı ve karakterin geçmişiyle bağlantılı olmalıdır.

!!! KESİN MANTIK VE TUTARLILIK KURALLARI !!!
A - Yaş Sınırları: Karakterin yaşına DİKKAT ET! 
- Eğer yaş < 25 ise: Olaylar okul, üniversite, ilk iş deneyimi, aileyle yaşama veya gençlik krizleri üzerine olmalıdır (Asla şirket satın alma, evlat edinme vb. değil).
- Eğer yaş > 30 ise: Olaylar kariyer, evlilik, orta yaş krizi, ciddi yatırımlar üzerine olmalıdır.
B - Para ve Statü Sınırları: Karakterin mevcut parasına DİKKAT ET!
- Eğer Para < 5000 TL ise: Karakter fakirdir/dar gelirlidir. Olaylar hayatta kalma, fatura ödeyememe, ucuz iş fırsatları veya mahalle olayları olmalıdır. (Yat almak, yurtdışı tatili yapmak gibi absürt lüksler SUNMA).
- Seçimlerde (choices) karakterin cebindeki paradan (Para: ${money}) DAHA FAZLA para harcamasını gerektiren bir seçenek SUNAMAZSIN!
C - Borç: Banka borcu varsa haciz veya banka krizleri senaryosu üretebilirsin.

AŞAĞIDAKİ TEKNİK KURALLARA KESİNLİKLE UYMALISIN:
1. Yanıtın SADECE geçerli bir JSON formatında olmalıdır. JSON dışında hiçbir metin, markdown (\`\`\`json) veya açıklama yazma. Sadece doğrudan JSON dön.
2. Karakterin yapabileceği 2 ile 4 arasında seçim (choice) sunmalısın.
3. Her seçimin istatistiklere (statChanges) bir etkisi olmalıdır.
4. statChanges değerleri tam sayı (integer) olmalıdır. Etki değerleri kesinlikle -50 ile +50 arasında olmalıdır (Örn: -15, 20, 5). Ancak "money" değeri için karakterin bütçesine uygun yüzlerce/binlerce liralık değişimler (-2000, 500 vb.) kullanabilirsin.
5. Kullanılabilecek geçerli istatistik anahtarları SADECE şunlardır: "money", "health", "energy", "happiness", "stress", "relationship", "reputation". (Örn: Wealth yerine money, Career yerine reputation, Social yerine relationship kullanın).
6. "newMemoryToSave" alanı, oyuncu bu seçimi yaparsa gelecekte sana tekrar hatırlatılması için kaydedilecek çok kısa bir özet olmalıdır (Maksimum 6-7 kelime).

GİRDİ VERİLERİ:
Karakter DNA'sı: ${dna}
Mevcut Yaş: ${profile.age}
Mevcut İstatistikler: ${currentStats}
Geçmiş Önemli Anılar: ${pastMemories}

BEKLENEN JSON ÇIKTI FORMATI:
{
  "eventTitle": "Olayın Çarpıcı Başlığı",
  "eventDescription": "Karakterin karşılaştığı durumu, geçmişiyle bağlantı kurarak anlatan 2-3 cümlelik dramatik veya gerçekçi açıklama.",
  "choices": [
    {
      "choiceText": "Seçeneğin kısa metni (Örn: Tüm birikimimi bu girişime yatır.)",
      "statChanges": {
        "money": -4000,
        "stress": 30,
        "reputation": 20
      },
      "newMemoryToSave": "Tüm birikimini riskli bir startup'a yatırdı."
    }
  ]
}`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: systemPrompt }]
          }],
          generationConfig: {
            temperature: 0.8,
          }
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Gemini API Hatası');
      }

      let textContent = data.candidates[0].content.parts[0].text;
      
      // Markdown temizliği (eğer model inat edip ```json eklerse diye)
      textContent = textContent.replace(/```json/g, '').replace(/```/g, '').trim();

      const eventData = JSON.parse(textContent);

      // Oyunun mevcut sistemine uygun hale dönüştür (adapt)
      return {
        id: 'ai_generated_' + Date.now(),
        title: eventData.eventTitle,
        text: eventData.eventDescription,
        isAiEvent: true,
        choices: eventData.choices.map(c => ({
          text: c.choiceText,
          effects: c.statChanges || {},
          newMemoryToSave: c.newMemoryToSave
        }))
      };

    } catch (error) {
      // Sadece konsola bilgi yaz, Expo redbox çıkartmaması için console.error kullanmıyoruz
      console.log("AI Event Oluşturulamadı (Yüksek Yoğunluk veya API Hatası):", error.message);
      return this.getFallbackEvent();
    }
  }

  static getFallbackEvent() {
    return {
      id: "ai_fallback",
      title: "Derin Düşünceler",
      text: "Zaman akıp gidiyor. Hayatını sorgulamaya başladın. Nereye gidiyorsun?",
      isAiEvent: false,
      choices: [
        {
          text: "Sadece işime odaklanmalıyım.",
          effects: { stress: 10, energy: -10 }
        },
        {
          text: "Biraz dinlenip kendime vakit ayırmalıyım.",
          effects: { happiness: 20, stress: -20, money: -50 }
        }
      ]
    };
  }
}
