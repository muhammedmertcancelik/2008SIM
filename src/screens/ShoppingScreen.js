// ============================================
// ALIŞVERİŞ EKRANI
// ============================================

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useGame } from '../state/GameContext';
import { CATEGORIES, SUBCATEGORIES } from '../data/products';
import { formatMoney } from '../utils/formatter';
import NeedsTracker from '../components/NeedsTracker';

export default function ShoppingScreen() {
  const { state, dispatch } = useGame();
  const [category, setCategory] = useState('Yiyecek');
  const [subcategory, setSubcategory] = useState('Tümü');
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState('default');
  const [alertMsg, setAlertMsg] = useState(null);

  const filteredProducts = useMemo(() => {
    let products = state.currentProducts.filter(p => p.category === category);
    if (subcategory !== 'Tümü') products = products.filter(p => p.subcategory === subcategory);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      products = products.filter(p => p.name.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q));
    }
    if (sortMode === 'asc') products.sort((a, b) => a.price - b.price);
    if (sortMode === 'desc') products.sort((a, b) => b.price - a.price);
    return products;
  }, [state.currentProducts, category, subcategory, search, sortMode]);

  const handleBuy = (product, amount = 1) => {
    if (product.price * amount > state.money) {
      setAlertMsg(`Bu üründen ${amount} adet almak için yeterli paranız yok.`);
      return;
    }
    dispatch({ type: 'BUY_PRODUCT', payload: { product, amount } });
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSubcategory('Tümü');
    setSearch('');
  };

  // 2'li grid için ürünleri ikili gruplara ayır
  const productPairs = [];
  for (let i = 0; i < filteredProducts.length; i += 2) {
    productPairs.push(filteredProducts.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {/* Harcama / İhtiyaç Takibi (Sadece Alışverişte de Görünsün İstendiği İçin) */}
      <NeedsTracker />

      {/* Market Başlığı */}
      <View style={styles.marketHeader}>
        <View style={styles.marketTitleRow}>
          <Text style={styles.marketTitle}>🛒 {state.year} Market</Text>
          <Text style={styles.productCount}>{filteredProducts.length} ürün</Text>
        </View>

        {/* Kategoriler */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryPill, cat === category && styles.categoryPillActive]}
              onPress={() => handleCategoryChange(cat)}
              activeOpacity={0.7}
            >
              <Text style={[styles.categoryText, cat === category && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Arama & Sıralama */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Ürün ara..."
              placeholderTextColor="#bdc3c7"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity
            style={[styles.sortBtn, sortMode === 'asc' && styles.sortBtnActive]}
            onPress={() => setSortMode(sortMode === 'asc' ? 'default' : 'asc')}
          >
            <Text style={[styles.sortBtnText, sortMode === 'asc' && styles.sortBtnTextActive]}>↑</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortBtn, sortMode === 'desc' && styles.sortBtnActive]}
            onPress={() => setSortMode(sortMode === 'desc' ? 'default' : 'desc')}
          >
            <Text style={[styles.sortBtnText, sortMode === 'desc' && styles.sortBtnTextActive]}>↓</Text>
          </TouchableOpacity>
        </View>

        {/* Alt Kategoriler */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subcategoryRow}>
          {(SUBCATEGORIES[category] || ['Tümü']).map(sub => (
            <TouchableOpacity
              key={sub}
              style={[styles.subcategoryPill, sub === subcategory && styles.subcategoryPillActive]}
              onPress={() => setSubcategory(sub)}
              activeOpacity={0.7}
            >
              <Text style={[styles.subcategoryText, sub === subcategory && styles.subcategoryTextActive]}>{sub}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Ürün Grid — View tabanlı (FlatList yerine) */}
      {filteredProducts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyText}>Ürün bulunamadı</Text>
        </View>
      ) : (
        <View style={styles.productGrid}>
          {productPairs.map((pair, rowIndex) => (
            <View key={rowIndex} style={styles.productRow}>
              {pair.map(item => {
                const canAfford1 = state.money >= item.price;
                const canAfford5 = state.money >= (item.price * 5);
                return (
                  <View key={item.id} style={styles.productCard}>
                    <Text style={styles.productEmoji}>{item.emoji}</Text>
                    <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.productCategory}>{item.subcategory}</Text>
                    <Text style={styles.productPrice}>{formatMoney(item.price)} TL</Text>
                    <View style={styles.buyBtnRow}>
                      <TouchableOpacity
                        style={[styles.buyBtn, !canAfford1 && styles.buyBtnDisabled]}
                        onPress={() => handleBuy(item, 1)}
                        disabled={!canAfford1}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.buyBtnText}>1x Al</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.buyBtn, styles.buyBtnBulk, !canAfford5 && styles.buyBtnDisabled]}
                        onPress={() => handleBuy(item, 5)}
                        disabled={!canAfford5}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.buyBtnText}>5x Al</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
              {pair.length === 1 && <View style={styles.productCardEmpty} />}
            </View>
          ))}
        </View>
      )}

      {/* Alert Modal */}
      {alertMsg && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yetersiz Bakiye</Text>
            <Text style={styles.modalText}>{alertMsg}</Text>
            <TouchableOpacity 
              style={styles.modalChoiceBtn} 
              onPress={() => setAlertMsg(null)}
            >
              <Text style={styles.modalChoiceText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { },
  marketHeader: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  marketTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  marketTitle: { fontSize: 16, fontWeight: '900', color: '#2c3e50' },
  productCount: { fontSize: 12, fontWeight: '600', color: '#7f8c8d' },
  categoryRow: { flexDirection: 'row', marginBottom: 8 },
  categoryPill: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50,
    backgroundColor: 'white', marginRight: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 1,
  },
  categoryPillActive: { backgroundColor: '#f39c12', shadowColor: '#f39c12', shadowOpacity: 0.3, elevation: 3 },
  categoryText: { fontSize: 12, fontWeight: '700', color: '#7f8c8d' },
  categoryTextActive: { color: 'white' },
  searchRow: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'white', borderRadius: 50, paddingHorizontal: 10, paddingVertical: 6,
    borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.06)',
  },
  searchIcon: { fontSize: 14 },
  searchInput: { flex: 1, fontSize: 14, fontWeight: '600', color: '#2c3e50', padding: 0 },
  sortBtn: {
    width: 38, height: 38, borderRadius: 10, backgroundColor: 'white',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.06)',
  },
  sortBtnActive: { backgroundColor: '#2ecc71', borderColor: '#2ecc71' },
  sortBtnText: { fontSize: 16, fontWeight: '700', color: '#7f8c8d' },
  sortBtnTextActive: { color: 'white' },
  subcategoryRow: { flexDirection: 'row' },
  subcategoryPill: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50,
    borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.06)', backgroundColor: 'white', marginRight: 6,
  },
  subcategoryPillActive: { backgroundColor: '#2c3e50', borderColor: '#2c3e50' },
  subcategoryText: { fontSize: 11, fontWeight: '600', color: '#7f8c8d' },
  subcategoryTextActive: { color: 'white' },
  productGrid: { paddingHorizontal: 16, paddingBottom: 16 },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  productCard: {
    width: '48%', backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 12, padding: 10, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  productCardEmpty: { width: '48%' },
  productEmoji: { fontSize: 28, marginBottom: 4 },
  productName: { fontSize: 13, fontWeight: '700', color: '#2c3e50', textAlign: 'center', marginBottom: 2 },
  productCategory: { fontSize: 10, color: '#7f8c8d', marginBottom: 4 },
  productPrice: { fontSize: 14, fontWeight: '800', color: '#f39c12', marginBottom: 8 },
  buyBtnRow: { flexDirection: 'row', width: '100%', gap: 4 },
  buyBtn: {
    backgroundColor: '#f39c12', paddingVertical: 6, borderRadius: 50, flex: 1, alignItems: 'center',
  },
  buyBtnBulk: { backgroundColor: '#d35400' },
  buyBtnDisabled: { backgroundColor: '#bdc3c7' },
  buyBtnText: { color: 'white', fontWeight: '700', fontSize: 13 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 8 },
  emptyText: { fontSize: 15, fontWeight: '600', color: '#7f8c8d' },
  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', alignItems: 'center', zIndex: 999,
  },
  modalContent: {
    backgroundColor: 'white', width: '85%', borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10,
    alignItems: 'center'
  },
  modalTitle: { fontSize: 16, fontWeight: '800', color: '#e74c3c', marginBottom: 8 },
  modalText: { fontSize: 13, color: '#34495e', lineHeight: 18, marginBottom: 16, textAlign: 'center', fontWeight: '500' },
  modalChoiceBtn: {
    backgroundColor: '#3498db', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center', width: '100%'
  },
  modalChoiceText: { color: 'white', fontWeight: '700', fontSize: 13, textAlign: 'center' },
});
