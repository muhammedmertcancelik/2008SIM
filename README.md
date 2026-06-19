# 2008 Türkiye Simülasyonu 🇹🇷

Gerçekçi ekonomi ve yaşam dinamikleriyle donatılmış, 2008 yılından günümüze uzanan detaylı bir **Hayatta Kalma ve Yaşam Simülasyonu** oyunudur.

## 📖 Oyun Hakkında
Oyuncu, 2008 yılında Türkiye'de asgari ücretle (550 TL) hayata atılan bir karakteri canlandırır. Amacınız; sadece hayatta kalmak değil, aynı zamanda kariyer yapmak, mülk edinmek, borsada yatırım yapmak ve karşınıza çıkan rastgele hayat olaylarında doğru kararlar vermektir. Ancak dikkatli olun; ekonomi acımasızdır ve yanlış kararlar sizi iflasa, hastalığa veya cinnete sürükleyebilir!

## 🚀 Temel Özellikler

### 1. Dinamik Ekonomi ve Market
- **Enflasyon Sistemi:** Fiyatlar her ay değişir.
- **Teknoloji Gelişimi:** 2008 yılında markette "Nokia Tuşlu Telefon" varken, yıllar ilerledikçe markete "Akıllı Telefon" (2011) ve "Cerrahi Maske" (2020) gibi dönemin şartlarını yansıtan yeni ürünler eklenir.
- **Gerçekçi İhtiyaçlar:** Aylık Yiyecek, Kira ve Ulaşım hedeflerinizi tutturmak zorundasınız.

### 2. Banka ve Kredi Sistemi (Findeks)
- Paranız bittiğinde bankadan kredi çekebilirsiniz.
- Kredi notunuz (Findeks) düştüğünde banka size kredi vermez.
- Ödenmeyen borçlara her ay **%5 faiz** biner ve sizi bir borç sarmalına sürükleyebilir.

### 3. Kariyer ve Yetenek Ağacı
- **Eğitim:** Kazandığınız parayla İngilizce veya Yazılım kurslarına giderek mesleğinizi (Kasiyer, Yazılımcı vb.) değiştirebilirsiniz.
- **Kalıcı Maaş Artışı:** Eğitimler sayesinde maaşınız kalıcı olarak artar.

### 4. Mülk ve Araç Yatırımı
- Bankadan kredi çekerek **1+1 Daire** alırsanız, hayatınız boyunca bir daha "Kira" ödemek zorunda kalmazsınız.
- **Tofaş Şahin** gibi bir araba alırsanız, aylık ulaşım (akbil) masrafından kalıcı olarak kurtulursunuz.
- Borsada (BİST) hisse senedi alıp satarak paranızı katlayabilirsiniz.

### 5. Acımasız Zorluk Mekanikleri
- **İşten Kovulma:** Stresiniz çok yüksek veya sağlığınız çok kötüyken çalışmaya giderseniz %30 ihtimalle olay çıkarır ve **işten kovulursunuz**. İşsiz kaldığınızda maaşınız sıfırlanır.
- **Cinnet Geçirme:** Stresiniz %100'e vurur ve mutluluğunuz sıfırlanırsa karakteriniz kontrolü kaybederek elindeki parayı etrafa saçar.
- **Hastalık ve Ölüm:** Sağlığınız %30'un altına düşerse, her geçen gün sağlığınız erimeye başlar. İyileşmezseniz (Sağlık %0 olursa) oyun Game Over olur.

### 6. Rastgele Hikaye Olayları
Her "Gün Atla" butonuna bastığınızda karşınıza 2008 Türkiye'si kültürünü yansıtan (MSN kavgaları, internet kafe maceraları, akraba tripleri vb.) olaylar çıkar. Bu olaylarda yapacağınız seçimlerin:
- Anlık sonuçları olur.
- Aylar sonra karşınıza çıkacak **Gecikmeli Sonuçları** (Kelebek Etkisi) olur.

## 🛠 Kurulum ve Çalıştırma

Proje **React Native** ve **Expo** ile geliştirilmiştir.

```bash
# Bağımlılıkları yükleyin
npm install

# Projeyi web tarayıcısında başlatın
npm run web
```

## 🎮 Nasıl Oynanır?
1. Menüden günlük ihtiyaçlarınızı (Yemek vb.) marketten satın alın.
2. Ay bitmeden mutlaka "İş" sekmesinden en az bir kere **Çalışın** (aksi halde maaş yatmaz).
3. "Zaman Atla (+1 veya +7 Gün)" butonuna basarak olayları yaşayın ve günleri ilerletin.
4. Ay sonunda maaşınız yatar ve yeni ayın ihtiyaçları sıfırlanır.
5. Kazancınızla eğitim alın, mülk edinin veya borsaya girin!
