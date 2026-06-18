// ============================================
// ÜRÜN VERİLERİ — 2008 Türkiye Fiyatları
// ============================================

export const PRODUCTS = [
  // ---- YİYECEK: Temel Gıda ----
  { id: 'ekmek', name: 'Ekmek', emoji: '🍞', category: 'Yiyecek', subcategory: 'Temel Gıda', price: 0.25, needContribution: 3, unit: 'adet' },
  { id: 'sut', name: 'Süt (1L)', emoji: '🥛', category: 'Yiyecek', subcategory: 'Temel Gıda', price: 1.50, needContribution: 5, unit: 'adet' },
  { id: 'yumurta', name: 'Yumurta (10\'lu)', emoji: '🥚', category: 'Yiyecek', subcategory: 'Temel Gıda', price: 2.50, needContribution: 8, unit: 'adet' },
  { id: 'peynir', name: 'Beyaz Peynir (500g)', emoji: '🧀', category: 'Yiyecek', subcategory: 'Temel Gıda', price: 8.00, needContribution: 12, unit: 'adet' },
  { id: 'yogurt', name: 'Yoğurt (1kg)', emoji: '🥣', category: 'Yiyecek', subcategory: 'Temel Gıda', price: 2.00, needContribution: 6, unit: 'adet' },
  { id: 'tereyagi', name: 'Tereyağı (250g)', emoji: '🧈', category: 'Yiyecek', subcategory: 'Temel Gıda', price: 4.00, needContribution: 7, unit: 'adet' },
  { id: 'pirinc', name: 'Pirinç (1kg)', emoji: '🍚', category: 'Yiyecek', subcategory: 'Temel Gıda', price: 3.50, needContribution: 8, unit: 'adet' },
  { id: 'makarna', name: 'Makarna (500g)', emoji: '🍝', category: 'Yiyecek', subcategory: 'Temel Gıda', price: 1.00, needContribution: 5, unit: 'adet' },
  { id: 'un', name: 'Un (1kg)', emoji: '🌾', category: 'Yiyecek', subcategory: 'Temel Gıda', price: 1.50, needContribution: 4, unit: 'adet' },
  { id: 'seker', name: 'Şeker (1kg)', emoji: '🍬', category: 'Yiyecek', subcategory: 'Temel Gıda', price: 2.00, needContribution: 3, unit: 'adet' },

  // ---- YİYECEK: Sebze & Meyve ----
  { id: 'domates', name: 'Domates (1kg)', emoji: '🍅', category: 'Yiyecek', subcategory: 'Sebze & Meyve', price: 2.00, needContribution: 6, unit: 'adet' },
  { id: 'patates', name: 'Patates (1kg)', emoji: '🥔', category: 'Yiyecek', subcategory: 'Sebze & Meyve', price: 1.50, needContribution: 5, unit: 'adet' },
  { id: 'sogan', name: 'Soğan (1kg)', emoji: '🧅', category: 'Yiyecek', subcategory: 'Sebze & Meyve', price: 1.00, needContribution: 3, unit: 'adet' },
  { id: 'biber', name: 'Biber (1kg)', emoji: '🌶️', category: 'Yiyecek', subcategory: 'Sebze & Meyve', price: 3.00, needContribution: 5, unit: 'adet' },
  { id: 'salatalik', name: 'Salatalık (1kg)', emoji: '🥒', category: 'Yiyecek', subcategory: 'Sebze & Meyve', price: 1.50, needContribution: 4, unit: 'adet' },
  { id: 'elma', name: 'Elma (1kg)', emoji: '🍎', category: 'Yiyecek', subcategory: 'Sebze & Meyve', price: 2.50, needContribution: 5, unit: 'adet' },
  { id: 'portakal', name: 'Portakal (1kg)', emoji: '🍊', category: 'Yiyecek', subcategory: 'Sebze & Meyve', price: 2.00, needContribution: 5, unit: 'adet' },
  { id: 'muz', name: 'Muz (1kg)', emoji: '🍌', category: 'Yiyecek', subcategory: 'Sebze & Meyve', price: 4.00, needContribution: 5, unit: 'adet' },
  { id: 'havuc', name: 'Havuç (1kg)', emoji: '🥕', category: 'Yiyecek', subcategory: 'Sebze & Meyve', price: 1.50, needContribution: 4, unit: 'adet' },
  { id: 'patlican', name: 'Patlıcan (1kg)', emoji: '🍆', category: 'Yiyecek', subcategory: 'Sebze & Meyve', price: 2.00, needContribution: 4, unit: 'adet' },

  // ---- YİYECEK: Et & Balık ----
  { id: 'tavuk', name: 'Tavuk (1kg)', emoji: '🍗', category: 'Yiyecek', subcategory: 'Et & Balık', price: 6.00, needContribution: 15, unit: 'adet' },
  { id: 'kiyma', name: 'Kıyma (1kg)', emoji: '🥩', category: 'Yiyecek', subcategory: 'Et & Balık', price: 12.00, needContribution: 20, unit: 'adet' },
  { id: 'balik', name: 'Balık (1kg)', emoji: '🐟', category: 'Yiyecek', subcategory: 'Et & Balık', price: 10.00, needContribution: 18, unit: 'adet' },
  { id: 'sucuk', name: 'Sucuk (250g)', emoji: '🌭', category: 'Yiyecek', subcategory: 'Et & Balık', price: 5.00, needContribution: 10, unit: 'adet' },

  // ---- YİYECEK: Baklagiller ----
  { id: 'mercimek', name: 'Mercimek (1kg)', emoji: '🫘', category: 'Yiyecek', subcategory: 'Baklagiller', price: 3.00, needContribution: 8, unit: 'adet' },
  { id: 'nohut', name: 'Nohut (1kg)', emoji: '🫛', category: 'Yiyecek', subcategory: 'Baklagiller', price: 3.50, needContribution: 8, unit: 'adet' },
  { id: 'kurufasulye', name: 'Kuru Fasulye (1kg)', emoji: '🫘', category: 'Yiyecek', subcategory: 'Baklagiller', price: 4.00, needContribution: 9, unit: 'adet' },
  { id: 'bulgur', name: 'Bulgur (1kg)', emoji: '🌾', category: 'Yiyecek', subcategory: 'Baklagiller', price: 2.50, needContribution: 7, unit: 'adet' },

  // ---- YİYECEK: Baharat & Sos ----
  { id: 'tuz', name: 'Tuz (750g)', emoji: '🧂', category: 'Yiyecek', subcategory: 'Baharat & Sos', price: 0.75, needContribution: 2, unit: 'adet' },
  { id: 'salca', name: 'Salça (700g)', emoji: '🫙', category: 'Yiyecek', subcategory: 'Baharat & Sos', price: 2.50, needContribution: 4, unit: 'adet' },
  { id: 'zeytinyagi', name: 'Zeytinyağı (1L)', emoji: '🫒', category: 'Yiyecek', subcategory: 'Baharat & Sos', price: 8.00, needContribution: 6, unit: 'adet' },
  { id: 'ketchup', name: 'Ketçap', emoji: '🍅', category: 'Yiyecek', subcategory: 'Baharat & Sos', price: 2.00, needContribution: 2, unit: 'adet' },

  // ---- YİYECEK: İçecekler ----
  { id: 'cay', name: 'Çay (500g)', emoji: '🍵', category: 'Yiyecek', subcategory: 'İçecekler', price: 5.00, needContribution: 4, unit: 'adet' },
  { id: 'su', name: 'Su (5L)', emoji: '💧', category: 'Yiyecek', subcategory: 'İçecekler', price: 1.50, needContribution: 3, unit: 'adet' },
  { id: 'ayran', name: 'Ayran', emoji: '🥛', category: 'Yiyecek', subcategory: 'İçecekler', price: 0.75, needContribution: 2, unit: 'adet' },
  { id: 'kola', name: 'Kola (1L)', emoji: '🥤', category: 'Yiyecek', subcategory: 'İçecekler', price: 1.50, needContribution: 2, unit: 'adet' },
  { id: 'meyvesuyu', name: 'Meyve Suyu (1L)', emoji: '🧃', category: 'Yiyecek', subcategory: 'İçecekler', price: 2.00, needContribution: 3, unit: 'adet' },
  { id: 'kahve', name: 'Nescafe (100g)', emoji: '☕', category: 'Yiyecek', subcategory: 'İçecekler', price: 6.00, needContribution: 3, unit: 'adet' },

  // ---- YİYECEK: Atıştırmalık ----
  { id: 'biskuvi', name: 'Bisküvi', emoji: '🍪', category: 'Yiyecek', subcategory: 'Atıştırmalık', price: 1.50, needContribution: 2, unit: 'adet' },
  { id: 'cikolata', name: 'Çikolata', emoji: '🍫', category: 'Yiyecek', subcategory: 'Atıştırmalık', price: 2.00, needContribution: 2, unit: 'adet' },
  { id: 'cips', name: 'Cips', emoji: '🥔', category: 'Yiyecek', subcategory: 'Atıştırmalık', price: 1.75, needContribution: 2, unit: 'adet' },
  { id: 'kuruyemis', name: 'Kuruyemiş (200g)', emoji: '🥜', category: 'Yiyecek', subcategory: 'Atıştırmalık', price: 4.00, needContribution: 3, unit: 'adet' },
  { id: 'gofret', name: 'Gofret', emoji: '🧇', category: 'Yiyecek', subcategory: 'Atıştırmalık', price: 1.00, needContribution: 1, unit: 'adet' },

  // ---- YİYECEK: Dışarıda Yemek ----
  { id: 'doner', name: 'Döner', emoji: '🥙', category: 'Yiyecek', subcategory: 'Dışarıda Yemek', price: 4.00, needContribution: 15, unit: 'porsiyon' },
  { id: 'lahmacun', name: 'Lahmacun', emoji: '🫓', category: 'Yiyecek', subcategory: 'Dışarıda Yemek', price: 2.00, needContribution: 10, unit: 'porsiyon' },
  { id: 'pide', name: 'Pide', emoji: '🫓', category: 'Yiyecek', subcategory: 'Dışarıda Yemek', price: 5.00, needContribution: 18, unit: 'porsiyon' },
  { id: 'corba', name: 'Çorba', emoji: '🍲', category: 'Yiyecek', subcategory: 'Dışarıda Yemek', price: 2.50, needContribution: 10, unit: 'porsiyon' },
  { id: 'tost', name: 'Tost', emoji: '🥪', category: 'Yiyecek', subcategory: 'Dışarıda Yemek', price: 2.00, needContribution: 8, unit: 'porsiyon' },
  { id: 'simit', name: 'Simit', emoji: '🥯', category: 'Yiyecek', subcategory: 'Dışarıda Yemek', price: 0.50, needContribution: 4, unit: 'adet' },

  // ---- ULAŞIM ----
  { id: 'otobus', name: 'Otobüs Bileti', emoji: '🚌', category: 'Ulaşım', subcategory: 'Toplu Taşıma', price: 1.50, needContribution: 5, unit: 'bilet' },
  { id: 'dolmus', name: 'Dolmuş', emoji: '🚐', category: 'Ulaşım', subcategory: 'Toplu Taşıma', price: 2.00, needContribution: 5, unit: 'bilet' },
  { id: 'metro', name: 'Metro Bileti', emoji: '🚇', category: 'Ulaşım', subcategory: 'Toplu Taşıma', price: 1.50, needContribution: 5, unit: 'bilet' },
  { id: 'taksi', name: 'Taksi (kısa mesafe)', emoji: '🚕', category: 'Ulaşım', subcategory: 'Özel', price: 8.00, needContribution: 10, unit: 'sefer' },
  { id: 'benzin', name: 'Benzin (1L)', emoji: '⛽', category: 'Ulaşım', subcategory: 'Yakıt', price: 3.00, needContribution: 8, unit: 'litre' },
  { id: 'akbil', name: 'Akbil Dolum', emoji: '💳', category: 'Ulaşım', subcategory: 'Toplu Taşıma', price: 15.00, needContribution: 30, unit: 'dolum' },
  { id: 'vapur', name: 'Vapur Bileti', emoji: '⛴️', category: 'Ulaşım', subcategory: 'Toplu Taşıma', price: 1.50, needContribution: 5, unit: 'bilet' },
  { id: 'servis', name: 'Servis (aylık)', emoji: '🚎', category: 'Ulaşım', subcategory: 'Özel', price: 30.00, needContribution: 30, unit: 'ay' },

  // ---- EĞLENCE ----
  { id: 'sinema', name: 'Sinema', emoji: '🎬', category: 'Eğlence', subcategory: 'Aktivite', price: 7.00, needContribution: 0, unit: 'bilet' },
  { id: 'kitap', name: 'Kitap', emoji: '📚', category: 'Eğlence', subcategory: 'Hobi', price: 10.00, needContribution: 0, unit: 'adet' },
  { id: 'dergi', name: 'Dergi', emoji: '📰', category: 'Eğlence', subcategory: 'Hobi', price: 3.00, needContribution: 0, unit: 'adet' },
  { id: 'kafe', name: 'Kafe (çay/kahve)', emoji: '☕', category: 'Eğlence', subcategory: 'Aktivite', price: 2.50, needContribution: 0, unit: 'sefer' },
  { id: 'internetcafe', name: 'İnternet Cafe (1 saat)', emoji: '💻', category: 'Eğlence', subcategory: 'Aktivite', price: 2.00, needContribution: 0, unit: 'saat' },
  { id: 'park', name: 'Lunapark', emoji: '🎡', category: 'Eğlence', subcategory: 'Aktivite', price: 10.00, needContribution: 0, unit: 'giriş' },
  { id: 'muzik', name: 'Müzik CD', emoji: '💿', category: 'Eğlence', subcategory: 'Hobi', price: 8.00, needContribution: 0, unit: 'adet' },
  { id: 'oyun', name: 'Bilgisayar Oyunu', emoji: '🎮', category: 'Eğlence', subcategory: 'Hobi', price: 15.00, needContribution: 0, unit: 'adet' },
  { id: 'konser', name: 'Konser Bileti', emoji: '🎤', category: 'Eğlence', subcategory: 'Aktivite', price: 25.00, needContribution: 0, unit: 'bilet' },
  { id: 'futbol', name: 'Maç Bileti', emoji: '⚽', category: 'Eğlence', subcategory: 'Aktivite', price: 20.00, needContribution: 0, unit: 'bilet' },

  // ---- KİRA ----
  { id: 'studyo', name: 'Stüdyo Daire', emoji: '🏠', category: 'Kira', subcategory: 'Konut', price: 300.00, needContribution: 450, unit: 'ay' },
  { id: 'birartibir', name: '1+1 Daire', emoji: '🏡', category: 'Kira', subcategory: 'Konut', price: 450.00, needContribution: 450, unit: 'ay' },
  { id: 'ikiartibir', name: '2+1 Daire', emoji: '🏘️', category: 'Kira', subcategory: 'Konut', price: 650.00, needContribution: 450, unit: 'ay' },
];

export const NEED_TARGETS = {
  Yiyecek: 150,
  'Ulaşım': 30,
  Kira: 450,
};

export const CATEGORIES = ['Yiyecek', 'Ulaşım', 'Eğlence', 'Kira'];

export const SUBCATEGORIES = {
  Yiyecek: ['Tümü', 'Temel Gıda', 'Sebze & Meyve', 'Et & Balık', 'Baklagiller', 'Baharat & Sos', 'İçecekler', 'Atıştırmalık', 'Dışarıda Yemek'],
  'Ulaşım': ['Tümü', 'Toplu Taşıma', 'Özel', 'Yakıt'],
  'Eğlence': ['Tümü', 'Aktivite', 'Hobi'],
  Kira: ['Tümü', 'Konut'],
};

export const TOTAL_PRODUCT_COUNT = PRODUCTS.length;
