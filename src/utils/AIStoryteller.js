// ============================================
// YAPAY ZEKA HİKAYE ANLATICISI (AI Storyteller)
// ============================================

import { CHAPTERS } from '../data/chapters';
import { NPCS } from '../data/npcs';

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

    const { profile, hiddenStats, experience, money, bankDebt, health, happiness, stress, job, memories, currentChapter, npcRelationships, metNpcs } = gameState;

    const chapterData = CHAPTERS[currentChapter || 0];

    const dna = `
    Geçmiş: ${profile.storyId}
    Kader: ${profile.fateId}
    Şans: ${hiddenStats.luck || 50}/100
    Disiplin: ${hiddenStats.discipline || 50}/100
    Zeka: ${hiddenStats.intelligence || 50}/100
    Risk Alma: ${hiddenStats.riskTaking || 50}/100
    `;

    // Tanınan NPC'leri ve ilişkilerini bir string'e çevir
    const npcContext = (metNpcs && metNpcs.length > 0)
      ? metNpcs.map(id => {
          const npc = NPCS.find(n => n.id === id);
          const rel = npcRelationships?.[id] || 0;
          return `- ${npc.name} (${npc.role}): İlişki Seviyesi ${rel}/100`;
        }).join('\n')
      : "Henüz mahalleden kimseyi iyi tanımıyor.";

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
Şu an hikayenin BÖLÜM ${chapterData.number}'indeyiz (${chapterData.title}).
Bu bölümün AI Tonu: "${chapterData.aiTone}"
Bu tona UYGUN, atmosferik, MERAK UYANDIRICI, GİZEMLİ veya DERİN DRAM içeren bir olay yaratmalısın.

Görevin, Karakter DNA'sı, Mevcut Durum, Geçmiş Anılar ve özellikle TANIDIĞI NPC'LERİ (aşağıda listelenen) kullanarak bir dönüm noktası (milestone) yaratmaktır. Eğer uygunsa, olayda tanıdığı NPC'lerden birini veya ikisini kesinlikle kullan. İlişki seviyelerine dikkat et (düşükse düşmanca, yüksekse dostça davranırlar).

Tanıdığı NPC'ler ve İlişkileri:
${npcContext}

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

  /**
   * Oyunun gün sonunda kitabı için günlük bir sayfa (paragraf) yazar.
   */
  static async generateBookPage(gameState, dailyEvent = null) {
    if (!GEMINI_API_KEY) {
      return this.getFallbackBookPage(gameState, dailyEvent);
    }

    const { money, health, happiness, job, currentChapter, metNpcs, npcRelationships } = gameState;
    const chapterData = CHAPTERS[currentChapter || 0];

    const prompt = `Sen edebi bir romancısın. Bu oyun aslında bir roman ve sen şu an bu romanın bir sayfasını yazıyorsun.
Hikayenin kahramanı (bizim karakter) şu an Bölüm ${chapterData.number} (${chapterData.title}) içinde.
Bölümün tonu: "${chapterData.aiTone}"

Karakterin durumu: Para: ${money} TL, Sağlık: ${health}/100, Mutluluk: ${happiness}/100, Meslek: ${job}.

Bugün karakterin yaşadığı en önemli şey (eğer varsa): ${dailyEvent ? dailyEvent.title + " - " + dailyEvent.text : "Sıradan bir gün geçti."}

Eğer bugün sıradan geçtiyse, karakterin iç dünyasını, yorgunluğunu, şehri, mahalledeki yalnızlığını veya tanıdığı insanlardan birini düşünmesini edebi bir dille anlat.
Eğer tanıdığı NPC'ler varsa onlardan bahsetmek harika olur (Tanıdıkları: ${metNpcs?.map(id => NPCS.find(n => n.id===id)?.name).join(', ') || 'Yok'}).

Bana romanın bu sayfasında yazacak olan tek bir paragraf ver. Yaklaşık 3-5 cümle olsun. Duygusal, bağlamsal ve akıcı olsun. Birinci veya üçüncü tekil şahıs olabilir. Sadece metni döndür, tırnak işareti veya ek açıklama kullanma.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 250 }
        })
      });

      const data = await response.json();
      const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (textContent) {
        return textContent.trim();
      }
      return this.getFallbackBookPage(gameState, dailyEvent);
    } catch (e) {
      console.log("Book page API error:", e);
      return this.getFallbackBookPage(gameState, dailyEvent);
    }
  }

  static getFallbackBookPage(gameState, dailyEvent) {
    if (dailyEvent) {
      return `Bugün farklı bir gündü. "${dailyEvent.title}" olayı zihnimi meşgul etti. Bazen hayatın getirdiklerini sadece kabullenmek gerekir.`;
    }
    
    if (gameState.money < 1000) {
      return `Cebimdeki son paraları sayarken pencereden dışarı baktım. Sokak lambası yanıp sönüyordu. Yarın daha iyi bir gün olmalı, olmak zorunda.`;
    } else if (gameState.happiness < 40) {
      return `Her şey dışarıdan yolunda gibi görünse de içimde bir boşluk var. Şehrin gürültüsü kalbimin sessizliğini bastıramıyor.`;
    } else {
      return `Sıradan bir gündü. Çayımdan bir yudum aldım ve gelecek planlarımı gözden geçirdim. Şimdilik rüzgar benden yana esiyor gibi görünüyor.`;
    }
  }
}
