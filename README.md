# 2008 Türkiye Yaşam Simülasyonu (2008SIM)

Bu proje, 2008 yılı Türkiye ekonomisi referans alınarak geliştirilmiş bir yaşam simülasyonu oyunudur. Oyuncular, belirtilen maaşla çalışarak kira, gıda ve ulaşım gibi temel ihtiyaçlarını karşılamaya ve ellerinde kalan parayla borsa (hisse senedi) yatırımı yaparak hayatta kalmaya çalışırlar.

## Özellikler

- **Çalış & Kazan Sistemi:** Her ay çalışarak maaş alın.
- **Dinamik Market:** 2008 fiyatlarına göre ayarlanmış ürünler.
- **Borsa & Yatırım:** Aylık değişken hisse senedi fiyatları ile yatırım yapma fırsatı.
- **İhtiyaç Takibi:** Yiyecek, ulaşım ve kira ihtiyaçlarını karşılamadan sonraki aya geçememe mekaniği.
- **Enflasyon:** Fiyatlar ve maaşlar zamanla ekonomik duruma göre değişiklik gösterir.

## Kurulum ve Çalıştırma

Projeyi bilgisayarınıza indirip çalıştırmak için bilgisayarınızda **Node.js**'in kurulu olduğundan emin olun.

1. Projeyi bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/muhammedmertcancelik/2008SIM.git
   cd 2008SIM
   ```

2. Gerekli kütüphaneleri yükleyin:
   ```bash
   npm install
   ```

3. Uygulamayı web tarayıcısında başlatın:
   ```bash
   npm run web
   ```
   *Alternatif olarak `npm start` yazarak açılan menüden telefon veya web üzerinden projeyi test edebilirsiniz.*

## Kullanılan Teknolojiler
- React Native
- Expo
- React Native Web
- AsyncStorage (Kayıt sistemi için)
