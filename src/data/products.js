// ============================================
// ÜRÜN VERİLERİ — 2008 Türkiye Fiyatları
// ============================================

export const PRODUCTS = [
  // ---- YİYECEK: Temel Gıda ----
  { id: 'ekmek', name: 'Ekmek', name_en: 'Bread', emoji: '🍞', category: 'Yiyecek', category_en: 'Food', subcategory: 'Temel Gıda', subcategory_en: 'Basics', price: 0.25, needContribution: 3, unit: 'adet', unit_en: 'pcs' },
  { id: 'sut', name: 'Süt (1L)', name_en: 'Milk (1L)', emoji: '🥛', category: 'Yiyecek', category_en: 'Food', subcategory: 'Temel Gıda', subcategory_en: 'Basics', price: 1.50, needContribution: 5, unit: 'adet', unit_en: 'pcs' },
  { id: 'yumurta', name: 'Yumurta (10\'lu)', emoji: '🥚', category: 'Yiyecek', subcategory: 'Temel Gıda', price: 2.50, needContribution: 8, unit: 'adet' },
  { id: 'peynir', name: 'Beyaz Peynir (500g)', name_en: 'White Cheese (500g)', emoji: '🧀', category: 'Yiyecek', category_en: 'Food', subcategory: 'Temel Gıda', subcategory_en: 'Basics', price: 8.00, needContribution: 12, unit: 'adet', unit_en: 'pcs' },
  { id: 'yogurt', name: 'Yoğurt (1kg)', name_en: 'Yogurt (1kg)', emoji: '🥣', category: 'Yiyecek', category_en: 'Food', subcategory: 'Temel Gıda', subcategory_en: 'Basics', price: 2.00, needContribution: 6, unit: 'adet', unit_en: 'pcs' },
  { id: 'tereyagi', name: 'Tereyağı (250g)', name_en: 'Butter (250g)', emoji: '🧈', category: 'Yiyecek', category_en: 'Food', subcategory: 'Temel Gıda', subcategory_en: 'Basics', price: 4.00, needContribution: 7, unit: 'adet', unit_en: 'pcs' },
  { id: 'pirinc', name: 'Pirinç (1kg)', name_en: 'Rice (1kg)', emoji: '🍚', category: 'Yiyecek', category_en: 'Food', subcategory: 'Temel Gıda', subcategory_en: 'Basics', price: 3.50, needContribution: 8, unit: 'adet', unit_en: 'pcs' },
  { id: 'makarna', name: 'Makarna (500g)', name_en: 'Pasta (500g)', emoji: '🍝', category: 'Yiyecek', category_en: 'Food', subcategory: 'Temel Gıda', subcategory_en: 'Basics', price: 1.00, needContribution: 5, unit: 'adet', unit_en: 'pcs' },
  { id: 'un', name: 'Un (1kg)', name_en: 'Flour (1kg)', emoji: '🌾', category: 'Yiyecek', category_en: 'Food', subcategory: 'Temel Gıda', subcategory_en: 'Basics', price: 1.50, needContribution: 4, unit: 'adet', unit_en: 'pcs' },
  { id: 'seker', name: 'Şeker (1kg)', name_en: 'Sugar (1kg)', emoji: '🍬', category: 'Yiyecek', category_en: 'Food', subcategory: 'Temel Gıda', subcategory_en: 'Basics', price: 2.00, needContribution: 3, unit: 'adet', unit_en: 'pcs' },

  // ---- YİYECEK: Sebze & Meyve ----
  { id: 'domates', name: 'Domates (1kg)', name_en: 'Tomato (1kg)', emoji: '🍅', category: 'Yiyecek', category_en: 'Food', subcategory: 'Sebze & Meyve', subcategory_en: 'Veg & Fruit', price: 2.00, needContribution: 6, unit: 'adet', unit_en: 'pcs' },
  { id: 'patates', name: 'Patates (1kg)', name_en: 'Potato (1kg)', emoji: '🥔', category: 'Yiyecek', category_en: 'Food', subcategory: 'Sebze & Meyve', subcategory_en: 'Veg & Fruit', price: 1.50, needContribution: 5, unit: 'adet', unit_en: 'pcs' },
  { id: 'sogan', name: 'Soğan (1kg)', name_en: 'Onion (1kg)', emoji: '🧅', category: 'Yiyecek', category_en: 'Food', subcategory: 'Sebze & Meyve', subcategory_en: 'Veg & Fruit', price: 1.00, needContribution: 3, unit: 'adet', unit_en: 'pcs' },
  { id: 'biber', name: 'Biber (1kg)', name_en: 'Pepper (1kg)', emoji: '🌶️', category: 'Yiyecek', category_en: 'Food', subcategory: 'Sebze & Meyve', subcategory_en: 'Veg & Fruit', price: 3.00, needContribution: 5, unit: 'adet', unit_en: 'pcs' },
  { id: 'salatalik', name: 'Salatalık (1kg)', name_en: 'Cucumber (1kg)', emoji: '🥒', category: 'Yiyecek', category_en: 'Food', subcategory: 'Sebze & Meyve', subcategory_en: 'Veg & Fruit', price: 1.50, needContribution: 4, unit: 'adet', unit_en: 'pcs' },
  { id: 'elma', name: 'Elma (1kg)', name_en: 'Apple (1kg)', emoji: '🍎', category: 'Yiyecek', category_en: 'Food', subcategory: 'Sebze & Meyve', subcategory_en: 'Veg & Fruit', price: 2.50, needContribution: 5, unit: 'adet', unit_en: 'pcs' },
  { id: 'portakal', name: 'Portakal (1kg)', name_en: 'Orange (1kg)', emoji: '🍊', category: 'Yiyecek', category_en: 'Food', subcategory: 'Sebze & Meyve', subcategory_en: 'Veg & Fruit', price: 2.00, needContribution: 5, unit: 'adet', unit_en: 'pcs' },
  { id: 'muz', name: 'Muz (1kg)', name_en: 'Banana (1kg)', emoji: '🍌', category: 'Yiyecek', category_en: 'Food', subcategory: 'Sebze & Meyve', subcategory_en: 'Veg & Fruit', price: 4.00, needContribution: 5, unit: 'adet', unit_en: 'pcs' },
  { id: 'havuc', name: 'Havuç (1kg)', name_en: 'Carrot (1kg)', emoji: '🥕', category: 'Yiyecek', category_en: 'Food', subcategory: 'Sebze & Meyve', subcategory_en: 'Veg & Fruit', price: 1.50, needContribution: 4, unit: 'adet', unit_en: 'pcs' },
  { id: 'patlican', name: 'Patlıcan (1kg)', name_en: 'Eggplant (1kg)', emoji: '🍆', category: 'Yiyecek', category_en: 'Food', subcategory: 'Sebze & Meyve', subcategory_en: 'Veg & Fruit', price: 2.00, needContribution: 4, unit: 'adet', unit_en: 'pcs' },

  // ---- YİYECEK: Et & Balık ----
  { id: 'tavuk', name: 'Tavuk (1kg)', name_en: 'Chicken (1kg)', emoji: '🍗', category: 'Yiyecek', category_en: 'Food', subcategory: 'Et & Balık', subcategory_en: 'Meat & Fish', price: 6.00, needContribution: 15, unit: 'adet', unit_en: 'pcs' },
  { id: 'kiyma', name: 'Kıyma (1kg)', name_en: 'Minced Meat (1kg)', emoji: '🥩', category: 'Yiyecek', category_en: 'Food', subcategory: 'Et & Balık', subcategory_en: 'Meat & Fish', price: 12.00, needContribution: 20, unit: 'adet', unit_en: 'pcs' },
  { id: 'balik', name: 'Balık (1kg)', name_en: 'Fish (1kg)', emoji: '🐟', category: 'Yiyecek', category_en: 'Food', subcategory: 'Et & Balık', subcategory_en: 'Meat & Fish', price: 10.00, needContribution: 18, unit: 'adet', unit_en: 'pcs' },
  { id: 'sucuk', name: 'Sucuk (250g)', name_en: 'Sausage (250g)', emoji: '🌭', category: 'Yiyecek', category_en: 'Food', subcategory: 'Et & Balık', subcategory_en: 'Meat & Fish', price: 5.00, needContribution: 10, unit: 'adet', unit_en: 'pcs' },

  // ---- YİYECEK: Baklagiller ----
  { id: 'mercimek', name: 'Mercimek (1kg)', name_en: 'Lentil (1kg)', emoji: '🫘', category: 'Yiyecek', category_en: 'Food', subcategory: 'Baklagiller', subcategory_en: 'Legumes', price: 3.00, needContribution: 8, unit: 'adet', unit_en: 'pcs' },
  { id: 'nohut', name: 'Nohut (1kg)', name_en: 'Chickpea (1kg)', emoji: '🫛', category: 'Yiyecek', category_en: 'Food', subcategory: 'Baklagiller', subcategory_en: 'Legumes', price: 3.50, needContribution: 8, unit: 'adet', unit_en: 'pcs' },
  { id: 'kurufasulye', name: 'Kuru Fasulye (1kg)', name_en: 'White Beans (1kg)', emoji: '🫘', category: 'Yiyecek', category_en: 'Food', subcategory: 'Baklagiller', subcategory_en: 'Legumes', price: 4.00, needContribution: 9, unit: 'adet', unit_en: 'pcs' },
  { id: 'bulgur', name: 'Bulgur (1kg)', name_en: 'Bulgur (1kg)', emoji: '🌾', category: 'Yiyecek', category_en: 'Food', subcategory: 'Baklagiller', subcategory_en: 'Legumes', price: 2.50, needContribution: 7, unit: 'adet', unit_en: 'pcs' },

  // ---- YİYECEK: Baharat & Sos ----
  { id: 'tuz', name: 'Tuz (750g)', name_en: 'Salt (750g)', emoji: '🧂', category: 'Yiyecek', category_en: 'Food', subcategory: 'Baharat & Sos', subcategory_en: 'Spices & Sauces', price: 0.75, needContribution: 2, unit: 'adet', unit_en: 'pcs' },
  { id: 'salca', name: 'Salça (700g)', name_en: 'Tomato Paste (700g)', emoji: '🫙', category: 'Yiyecek', category_en: 'Food', subcategory: 'Baharat & Sos', subcategory_en: 'Spices & Sauces', price: 2.50, needContribution: 4, unit: 'adet', unit_en: 'pcs' },
  { id: 'zeytinyagi', name: 'Zeytinyağı (1L)', name_en: 'Olive Oil (1L)', emoji: '🫒', category: 'Yiyecek', category_en: 'Food', subcategory: 'Baharat & Sos', subcategory_en: 'Spices & Sauces', price: 8.00, needContribution: 6, unit: 'adet', unit_en: 'pcs' },
  { id: 'ketchup', name: 'Ketçap', name_en: 'Ketchup', emoji: '🍅', category: 'Yiyecek', category_en: 'Food', subcategory: 'Baharat & Sos', subcategory_en: 'Spices & Sauces', price: 2.00, needContribution: 2, unit: 'adet', unit_en: 'pcs' },

  // ---- YİYECEK: İçecekler ----
  { id: 'cay', name: 'Çay (500g)', name_en: 'Tea (500g)', emoji: '🍵', category: 'Yiyecek', category_en: 'Food', subcategory: 'İçecekler', subcategory_en: 'Drinks', price: 5.00, needContribution: 4, unit: 'adet', unit_en: 'pcs' },
  { id: 'su', name: 'Su (5L)', name_en: 'Water (5L)', emoji: '💧', category: 'Yiyecek', category_en: 'Food', subcategory: 'İçecekler', subcategory_en: 'Drinks', price: 1.50, needContribution: 3, unit: 'adet', unit_en: 'pcs' },
  { id: 'ayran', name: 'Ayran', name_en: 'Ayran', emoji: '🥛', category: 'Yiyecek', category_en: 'Food', subcategory: 'İçecekler', subcategory_en: 'Drinks', price: 0.75, needContribution: 2, unit: 'adet', unit_en: 'pcs' },
  { id: 'kola', name: 'Kola (1L)', name_en: 'Cola (1L)', emoji: '🥤', category: 'Yiyecek', category_en: 'Food', subcategory: 'İçecekler', subcategory_en: 'Drinks', price: 1.50, needContribution: 2, unit: 'adet', unit_en: 'pcs' },
  { id: 'meyvesuyu', name: 'Meyve Suyu (1L)', name_en: 'Fruit Juice (1L)', emoji: '🧃', category: 'Yiyecek', category_en: 'Food', subcategory: 'İçecekler', subcategory_en: 'Drinks', price: 2.00, needContribution: 3, unit: 'adet', unit_en: 'pcs' },
  { id: 'kahve', name: 'Nescafe (100g)', name_en: 'Instant Coffee (100g)', emoji: '☕', category: 'Yiyecek', category_en: 'Food', subcategory: 'İçecekler', subcategory_en: 'Drinks', price: 6.00, needContribution: 3, unit: 'adet', unit_en: 'pcs' },

  // ---- YİYECEK: Atıştırmalık ----
  { id: 'biskuvi', name: 'Bisküvi', name_en: 'Biscuit', emoji: '🍪', category: 'Yiyecek', category_en: 'Food', subcategory: 'Atıştırmalık', subcategory_en: 'Snacks', price: 1.50, needContribution: 2, unit: 'adet', unit_en: 'pcs' },
  { id: 'cikolata', name: 'Çikolata', name_en: 'Chocolate', emoji: '🍫', category: 'Yiyecek', category_en: 'Food', subcategory: 'Atıştırmalık', subcategory_en: 'Snacks', price: 2.00, needContribution: 2, unit: 'adet', unit_en: 'pcs' },
  { id: 'cips', name: 'Cips', name_en: 'Chips', emoji: '🥔', category: 'Yiyecek', category_en: 'Food', subcategory: 'Atıştırmalık', subcategory_en: 'Snacks', price: 1.75, needContribution: 2, unit: 'adet', unit_en: 'pcs' },
  { id: 'kuruyemis', name: 'Kuruyemiş (200g)', name_en: 'Nuts (200g)', emoji: '🥜', category: 'Yiyecek', category_en: 'Food', subcategory: 'Atıştırmalık', subcategory_en: 'Snacks', price: 4.00, needContribution: 3, unit: 'adet', unit_en: 'pcs' },
  { id: 'gofret', name: 'Gofret', name_en: 'Wafer', emoji: '🧇', category: 'Yiyecek', category_en: 'Food', subcategory: 'Atıştırmalık', subcategory_en: 'Snacks', price: 1.00, needContribution: 1, unit: 'adet', unit_en: 'pcs' },

  // ---- YİYECEK: Dışarıda Yemek ----
  { id: 'doner', name: 'Döner', name_en: 'Doner', emoji: '🥙', category: 'Yiyecek', category_en: 'Food', subcategory: 'Dışarıda Yemek', subcategory_en: 'Dining Out', price: 4.00, needContribution: 15, unit: 'porsiyon', unit_en: 'portion' },
  { id: 'lahmacun', name: 'Lahmacun', name_en: 'Lahmacun', emoji: '🫓', category: 'Yiyecek', category_en: 'Food', subcategory: 'Dışarıda Yemek', subcategory_en: 'Dining Out', price: 2.00, needContribution: 10, unit: 'porsiyon', unit_en: 'portion' },
  { id: 'pide', name: 'Pide', name_en: 'Pita', emoji: '🫓', category: 'Yiyecek', category_en: 'Food', subcategory: 'Dışarıda Yemek', subcategory_en: 'Dining Out', price: 5.00, needContribution: 18, unit: 'porsiyon', unit_en: 'portion' },
  { id: 'corba', name: 'Çorba', name_en: 'Soup', emoji: '🍲', category: 'Yiyecek', category_en: 'Food', subcategory: 'Dışarıda Yemek', subcategory_en: 'Dining Out', price: 2.50, needContribution: 10, unit: 'porsiyon', unit_en: 'portion' },
  { id: 'tost', name: 'Tost', name_en: 'Toast', emoji: '🥪', category: 'Yiyecek', category_en: 'Food', subcategory: 'Dışarıda Yemek', subcategory_en: 'Dining Out', price: 2.00, needContribution: 8, unit: 'porsiyon', unit_en: 'portion' },
  { id: 'simit', name: 'Simit', name_en: 'Simit', emoji: '🥯', category: 'Yiyecek', category_en: 'Food', subcategory: 'Dışarıda Yemek', subcategory_en: 'Dining Out', price: 0.50, needContribution: 4, unit: 'adet', unit_en: 'pcs' },

  // ---- ULAŞIM ----
  { id: 'otobus', name: 'Otobüs Bileti', name_en: 'Bus Ticket', emoji: '🚌', category: 'Ulaşım', category_en: 'Transport', subcategory: 'Toplu Taşıma', subcategory_en: 'Public Transit', price: 1.50, needContribution: 5, unit: 'bilet', unit_en: 'ticket' },
  { id: 'dolmus', name: 'Dolmuş', name_en: 'Minibus', emoji: '🚐', category: 'Ulaşım', category_en: 'Transport', subcategory: 'Toplu Taşıma', subcategory_en: 'Public Transit', price: 2.00, needContribution: 5, unit: 'bilet', unit_en: 'ticket' },
  { id: 'metro', name: 'Metro Bileti', name_en: 'Subway Ticket', emoji: '🚇', category: 'Ulaşım', category_en: 'Transport', subcategory: 'Toplu Taşıma', subcategory_en: 'Public Transit', price: 1.50, needContribution: 5, unit: 'bilet', unit_en: 'ticket' },
  { id: 'taksi', name: 'Taksi (kısa mesafe)', name_en: 'Taxi (Short)', emoji: '🚕', category: 'Ulaşım', category_en: 'Transport', subcategory: 'Özel', subcategory_en: 'Private', price: 8.00, needContribution: 10, unit: 'sefer', unit_en: 'trip' },
  { id: 'benzin', name: 'Benzin (1L)', name_en: 'Gasoline (1L)', emoji: '⛽', category: 'Ulaşım', category_en: 'Transport', subcategory: 'Yakıt', subcategory_en: 'Fuel', price: 3.00, needContribution: 8, unit: 'litre', unit_en: 'liter' },
  { id: 'akbil', name: 'Akbil Dolum', name_en: 'Transit Pass Refill', emoji: '💳', category: 'Ulaşım', category_en: 'Transport', subcategory: 'Toplu Taşıma', subcategory_en: 'Public Transit', price: 15.00, needContribution: 30, unit: 'dolum', unit_en: 'refill' },
  { id: 'vapur', name: 'Vapur Bileti', name_en: 'Ferry Ticket', emoji: '⛴️', category: 'Ulaşım', category_en: 'Transport', subcategory: 'Toplu Taşıma', subcategory_en: 'Public Transit', price: 1.50, needContribution: 5, unit: 'bilet', unit_en: 'ticket' },
  { id: 'servis', name: 'Servis (aylık)', name_en: 'Shuttle (Monthly)', emoji: '🚎', category: 'Ulaşım', category_en: 'Transport', subcategory: 'Özel', subcategory_en: 'Private', price: 30.00, needContribution: 30, unit: 'ay', unit_en: 'month' },

  // ---- EĞLENCE ----
  { id: 'sinema', name: 'Sinema', name_en: 'Cinema', emoji: '🎬', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Aktivite', subcategory_en: 'Activity', price: 7.00, needContribution: 0, unit: 'bilet', unit_en: 'ticket' },
  { id: 'kitap', name: 'Kitap', name_en: 'Book', emoji: '📚', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Hobi', subcategory_en: 'Hobby', price: 10.00, needContribution: 0, unit: 'adet', unit_en: 'pcs' },
  { id: 'dergi', name: 'Dergi', name_en: 'Magazine', emoji: '📰', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Hobi', subcategory_en: 'Hobby', price: 3.00, needContribution: 0, unit: 'adet', unit_en: 'pcs' },
  { id: 'kafe', name: 'Kafe (çay/kahve)', name_en: 'Cafe (Tea/Coffee)', emoji: '☕', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Aktivite', subcategory_en: 'Activity', price: 2.50, needContribution: 0, unit: 'sefer', unit_en: 'trip' },
  { id: 'internetcafe', name: 'İnternet Cafe (1 saat)', name_en: 'Internet Cafe (1h)', emoji: '💻', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Aktivite', subcategory_en: 'Activity', price: 2.00, needContribution: 0, unit: 'saat', unit_en: 'hour' },
  { id: 'park', name: 'Lunapark', name_en: 'Amusement Park', emoji: '🎡', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Aktivite', subcategory_en: 'Activity', price: 10.00, needContribution: 0, unit: 'giriş', unit_en: 'entry' },
  { id: 'muzik', name: 'Müzik CD', name_en: 'Music CD', emoji: '💿', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Hobi', subcategory_en: 'Hobby', price: 8.00, needContribution: 0, unit: 'adet', unit_en: 'pcs' },
  { id: 'oyun', name: 'Bilgisayar Oyunu', name_en: 'PC Game', emoji: '🎮', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Hobi', subcategory_en: 'Hobby', price: 15.00, needContribution: 0, unit: 'adet', unit_en: 'pcs' },
  { id: 'konser', name: 'Konser Bileti', name_en: 'Concert Ticket', emoji: '🎤', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Aktivite', subcategory_en: 'Activity', price: 25.00, needContribution: 0, unit: 'bilet', unit_en: 'ticket' },
  { id: 'futbol', name: 'Maç Bileti', name_en: 'Match Ticket', emoji: '⚽', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Aktivite', subcategory_en: 'Activity', price: 20.00, needContribution: 0, unit: 'bilet', unit_en: 'ticket' },
  { id: 'tuslu_tel', name: 'Nokia Tuşlu Telefon', name_en: 'Feature Phone', emoji: '📱', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Teknoloji', subcategory_en: 'Tech', price: 250.00, needContribution: 0, unit: 'adet', unit_en: 'pcs', maxYear: 2010 },
  { id: 'akilli_tel', name: 'Akıllı Telefon', name_en: 'Smartphone', emoji: '📲', category: 'Eğlence', category_en: 'Entertainment', subcategory: 'Teknoloji', subcategory_en: 'Tech', price: 1500.00, needContribution: 0, unit: 'adet', unit_en: 'pcs', minYear: 2011 },
  { id: 'maske', name: 'Cerrahi Maske (50\'li)', emoji: '😷', category: 'Eğlence', subcategory: 'Sağlık', price: 50.00, needContribution: 0, unit: 'kutu', minYear: 2020 },

  // ---- KİRA ----
  { id: 'studyo', name: 'Stüdyo Daire', name_en: 'Studio Appt.', emoji: '🏠', category: 'Kira', category_en: 'Rent', subcategory: 'Konut', subcategory_en: 'Housing', price: 300.00, needContribution: 450, unit: 'ay', unit_en: 'month' },
  { id: 'birartibir', name: '1+1 Daire', name_en: '1+1 Appt.', emoji: '🏡', category: 'Kira', category_en: 'Rent', subcategory: 'Konut', subcategory_en: 'Housing', price: 450.00, needContribution: 450, unit: 'ay', unit_en: 'month' },
  { id: 'ikiartibir', name: '2+1 Daire', name_en: '2+1 Appt.', emoji: '🏘️', category: 'Kira', category_en: 'Rent', subcategory: 'Konut', subcategory_en: 'Housing', price: 650.00, needContribution: 450, unit: 'ay', unit_en: 'month' },
];

export const NEED_TARGETS = {
  Yiyecek: 150,
  'Ulaşım': 30,
  Kira: 450,
};

export const CATEGORIES = [
  { tr: 'Yiyecek', en: 'Food' },
  { tr: 'Ulaşım', en: 'Transport' },
  { tr: 'Eğlence', en: 'Entertainment' },
  { tr: 'Kira', en: 'Rent' }
];

export const SUBCATEGORIES = {
  Yiyecek: ['Tümü', 'Temel Gıda', 'Sebze & Meyve', 'Et & Balık', 'Baklagiller', 'Baharat & Sos', 'İçecekler', 'Atıştırmalık', 'Dışarıda Yemek'],
  'Ulaşım': ['Tümü', 'Toplu Taşıma', 'Özel', 'Yakıt'],
  'Eğlence': ['Tümü', 'Aktivite', 'Hobi', 'Teknoloji', 'Sağlık'],
  Kira: ['Tümü', 'Konut'],
};

export const SUBCATEGORIES_EN = {
  Food: ['All', 'Basics', 'Veg & Fruit', 'Meat & Fish', 'Legumes', 'Spices & Sauces', 'Drinks', 'Snacks', 'Dining Out'],
  Transport: ['All', 'Public Transit', 'Private', 'Fuel'],
  Entertainment: ['All', 'Activity', 'Hobby', 'Tech', 'Health'],
  Rent: ['All', 'Housing'],
};

export const TOTAL_PRODUCT_COUNT = PRODUCTS.length;
