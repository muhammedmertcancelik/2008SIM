// ============================================
// ALIŞVERİŞ EKRANI
// ============================================

import React, { useState, useMemo } from 'react';
import GlassView from '../components/GlassView';
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
      dispatch({ type: 'SHOW_ALERT', payload: { title: 'Yetersiz Bakiye', message: `Bu üründen ${amount} adet almak için yeterli paranız yok.` } });
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
      <GlassView intensity={30} tint='dark' style={styles.marketHeader}>
        <View style={styles.marketTitleRow}>
          <Text style={styles.marketTitle}>🛒 {state.year} Market</Text>
          <Text style={styles.productCount}>{filteredProducts.length} ürün</Text>
        </View>

        {/* Kategoriler */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
          {CATEGORIES.map(catObj => {
            const catKey = catObj.tr;
            const catDisplay = state.language === 'en' ? catObj.en : catObj.tr;
            return (
            <TouchableOpacity
              key={catKey}
              style={[styles.categoryPill, catKey === category && styles.categoryPillActive]}
              onPress={() => handleCategoryChange(catKey)}
              activeOpacity={0.7}
            >
              <Text style={[styles.categoryText, catKey === category && styles.categoryTextActive]}>{catDisplay}</Text>
            </TouchableOpacity>
          )})}
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
                  <GlassView intensity={30} tint='dark' key={item.id} style={styles.productCard}>
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
      ;
