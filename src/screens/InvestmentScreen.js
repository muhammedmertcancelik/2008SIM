// ============================================
// YATIRIM EKRANI
// ============================================

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useGame } from '../state/GameContext';
import { formatMoney, formatPercent } from '../utils/formatter';

export default function InvestmentScreen() {
  const { state, dispatch, getPortfolioValue } = useGame();
  const [amounts, setAmounts] = useState({});

  const totalPortfolio = getPortfolioValue();

  const getAmount = (stockId) => parseInt(amounts[stockId]) || 1;

  const handleBuy = (stock) => {
    const amount = getAmount(stock.id);
    const totalCost = amount * stock.currentPrice;
    if (totalCost > state.money) {
      Alert.alert('Yetersiz Bakiye', `Bu işlem için ${formatMoney(totalCost)} TL gerekli.`);
      return;
    }
    dispatch({ type: 'BUY_STOCK', payload: { stockId: stock.id, amount, pricePerUnit: stock.currentPrice } });
  };

  const handleSell = (stock) => {
    const amount = getAmount(stock.id);
    const owned = state.portfolio[stock.id] || 0;
    if (owned < amount) {
      Alert.alert('Yetersiz Miktar', `Sadece ${owned} adet ${stock.name} bulunuyor.`);
      return;
    }
    dispatch({ type: 'SELL_STOCK', payload: { stockId: stock.id, amount, pricePerUnit: stock.currentPrice } });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Portföy Özeti */}
      <View style={styles.portfolioCard}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionIcon}>🏆</Text>
          <Text style={styles.sectionText}>Portföy Özeti</Text>
        </View>

        <View style={styles.portfolioGrid}>
          {state.currentStocks.map(stock => {
            const owned = state.portfolio[stock.id] || 0;
            const value = owned * stock.currentPrice;
            return (
              <View key={stock.id} style={styles.portfolioItem}>
                <Text style={styles.portfolioEmoji}>{stock.emoji}</Text>
                <Text style={styles.portfolioName}>{stock.name}</Text>
                <Text style={styles.portfolioAmount}>{owned} adet</Text>
                <Text style={styles.portfolioValue}>{formatMoney(value)} TL</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Toplam Portföy: </Text>
          <Text style={styles.totalValue}>{formatMoney(totalPortfolio)} TL</Text>
        </View>
      </View>

      {/* Yatırım Kartları */}
      {state.currentStocks.map(stock => {
        const owned = state.portfolio[stock.id] || 0;
        const totalValue = owned * stock.currentPrice;
        const isPositive = stock.monthlyChangePercent >= 0;
        const amount = getAmount(stock.id);

        return (
          <View key={stock.id} style={styles.stockCard}>
            {/* Üst kısım */}
            <View style={styles.stockHeader}>
              <View style={styles.stockInfo}>
                <Text style={styles.stockEmoji}>{stock.emoji}</Text>
                <View>
                  <Text style={styles.stockName}>{stock.name}</Text>
                  <Text style={styles.stockType}>{stock.type}</Text>
                </View>
              </View>
              <View style={styles.stockPriceBlock}>
                <Text style={styles.stockPrice}>{formatMoney(stock.currentPrice)} TL</Text>
                <Text style={[styles.stockChange, isPositive ? styles.positive : styles.negative]}>
                  {formatPercent(stock.monthlyChangePercent)} (aybaşından)
                </Text>
                <Text style={styles.stockBase}>Başlangıç: {formatMoney(stock.basePrice)} TL</Text>
              </View>
            </View>

            {/* Sahiplik */}
            <View style={styles.ownershipRow}>
              <Text style={styles.ownershipText}>Sahip: <Text style={styles.bold}>{owned}</Text></Text>
              <Text style={styles.ownershipDivider}>|</Text>
              <Text style={styles.ownershipText}>Değer: <Text style={styles.bold}>{formatMoney(totalValue)} TL</Text></Text>
            </View>

            {/* Kontroller */}
            <View style={styles.controlsRow}>
              <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                value={String(amounts[stock.id] || '1')}
                onChangeText={(text) => setAmounts(prev => ({ ...prev, [stock.id]: text }))}
                placeholder="Adet"
              />
              <TouchableOpacity style={styles.buyStockBtn} onPress={() => handleBuy(stock)} activeOpacity={0.7}>
                <Text style={styles.buyStockBtnText}>📈 Al</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sellStockBtn, owned > 0 && styles.sellStockBtnActive]}
                onPress={() => handleSell(stock)}
                disabled={owned === 0}
                activeOpacity={0.7}
              >
                <Text style={styles.sellStockBtnText}>📉 Sat</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.totalLine}>
              Toplam: {formatMoney(stock.currentPrice * amount)} TL
            </Text>
          </View>
        );
      })}

      {/* İşlemler */}
      <View style={styles.transactionsCard}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionIcon}>📋</Text>
          <Text style={styles.sectionText}>İşlemler</Text>
        </View>

        {state.transactions.length === 0 ? (
          <Text style={styles.noTransactions}>Henüz işlem yapılmadı</Text>
        ) : (
          state.transactions.slice(-10).reverse().map((tx, i) => {
            const stock = state.currentStocks.find(s => s.id === tx.stockId);
            const isBuy = tx.type === 'buy';
            return (
              <View key={i} style={styles.txRow}>
                <View style={styles.txLeft}>
                  <Text style={styles.txEmoji}>{stock?.emoji || '📊'}</Text>
                  <View>
                    <Text style={styles.txAction}>{tx.amount} adet {stock?.name || tx.stockId} {isBuy ? 'alındı' : 'satıldı'}</Text>
                    <Text style={styles.txDate}>{isBuy ? 'Alış' : 'Satış'} @ {formatMoney(tx.pricePerUnit)} TL</Text>
                  </View>
                </View>
                <Text style={[styles.txAmount, isBuy ? styles.txBuy : styles.txSell]}>
                  {isBuy ? '-' : '+'}{formatMoney(tx.totalCost)} TL
                </Text>
              </View>
            );
          })
        )}
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  portfolioCard: {
    backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: 20, padding: 20,
    marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 3,
  },
  sectionTitle: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionIcon: { fontSize: 20 },
  sectionText: { fontSize: 18, fontWeight: '800', color: '#2c3e50' },
  portfolioGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  portfolioItem: {
    width: '47%', alignItems: 'center', padding: 12, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  portfolioEmoji: { fontSize: 28, marginBottom: 4 },
  portfolioName: { fontSize: 12, fontWeight: '700', color: '#2c3e50', textAlign: 'center' },
  portfolioAmount: { fontSize: 14, fontWeight: '800', color: '#2ecc71' },
  portfolioValue: { fontSize: 11, fontWeight: '600', color: '#7f8c8d' },
  totalRow: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingTop: 16, borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.06)',
  },
  totalLabel: { fontSize: 15, fontWeight: '700', color: '#2c3e50' },
  totalValue: { fontSize: 24, fontWeight: '900', color: '#2ecc71' },
  stockCard: {
    backgroundColor: '#eafaf1', borderRadius: 20, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(46,204,113,0.15)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 3,
  },
  stockHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  stockInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stockEmoji: { fontSize: 32 },
  stockName: { fontSize: 16, fontWeight: '800', color: '#2c3e50' },
  stockType: { fontSize: 11, fontWeight: '600', color: '#7f8c8d' },
  stockPriceBlock: { alignItems: 'flex-end' },
  stockPrice: { fontSize: 20, fontWeight: '900', color: '#2ecc71' },
  stockChange: { fontSize: 12, fontWeight: '700' },
  positive: { color: '#2ecc71' },
  negative: { color: '#e74c3c' },
  stockBase: { fontSize: 11, fontWeight: '600', color: '#7f8c8d' },
  ownershipRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  ownershipText: { fontSize: 13, color: '#7f8c8d', fontWeight: '600' },
  ownershipDivider: { color: '#bdc3c7' },
  bold: { fontWeight: '800', color: '#2c3e50' },
  controlsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  amountInput: {
    width: 70, paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.06)', borderRadius: 10,
    backgroundColor: 'white', textAlign: 'center', fontWeight: '700', fontSize: 14,
  },
  buyStockBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 50, alignItems: 'center',
    backgroundColor: '#2ecc71',
    shadowColor: '#2ecc71', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 3,
  },
  buyStockBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },
  sellStockBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 50, alignItems: 'center',
    backgroundColor: '#bdc3c7',
  },
  sellStockBtnActive: { backgroundColor: '#e74c3c', shadowColor: '#e74c3c', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 3 },
  sellStockBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },
  totalLine: { textAlign: 'center', fontSize: 11, color: '#7f8c8d', fontWeight: '600', marginTop: 8 },
  transactionsCard: {
    backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 3,
  },
  noTransactions: { textAlign: 'center', paddingVertical: 20, color: '#7f8c8d', fontSize: 13 },
  txRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.06)' },
  txLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  txEmoji: { fontSize: 18 },
  txAction: { fontSize: 12, fontWeight: '700', color: '#2c3e50' },
  txDate: { fontSize: 11, color: '#7f8c8d' },
  txAmount: { fontSize: 13, fontWeight: '800' },
  txBuy: { color: '#e74c3c' },
  txSell: { color: '#2ecc71' },
});
