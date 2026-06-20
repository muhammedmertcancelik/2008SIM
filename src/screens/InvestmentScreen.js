// ============================================
// YATIRIM EKRANI
// ============================================

import React, { useState } from 'react';
import GlassView from '../components/GlassView';
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
      dispatch({ type: 'SHOW_ALERT', payload: { title: 'Yetersiz Bakiye', message: `Bu işlem için ${formatMoney(totalCost)} TL gerekli.` } });
      return;
    }
    dispatch({ type: 'BUY_STOCK', payload: { stockId: stock.id, amount, pricePerUnit: stock.currentPrice } });
  };

  const handleSell = (stock) => {
    const amount = getAmount(stock.id);
    const owned = state.portfolio[stock.id] || 0;
    if (owned < amount) {
      dispatch({ type: 'SHOW_ALERT', payload: { title: 'Yetersiz Miktar', message: `Sadece ${owned} adet ${stock.name} bulunuyor.` } });
      return;
    }
    dispatch({ type: 'SELL_STOCK', payload: { stockId: stock.id, amount, pricePerUnit: stock.currentPrice } });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Portföy Özeti */}
      <GlassView intensity={30} tint='dark' style={styles.portfolioCard}>
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
      </GlassView>

      {/* Yatırım Kartları */}
      {state.currentStocks.map(stock => {
        const owned = state.portfolio[stock.id] || 0;
        const totalValue = owned * stock.currentPrice;
        const isPositive = stock.monthlyChangePercent >= 0;
        const amount = getAmount(stock.id);

        return (
          <GlassView intensity={30} tint='dark' key={stock.id} style={styles.stockCard}>
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
          </GlassView>
        );
      })}

      {/* İşlemler */}
      <GlassView intensity={30} tint='dark' style={styles.transactionsCard}>
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
      </GlassView>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  portfolioCard: {
    backgroundColor: 'rgba(241, 196, 15, 0.1)', borderRadius: 20, padding: 20,
    marginBottom: 16, borderWidth: 1, borderColor: 'rgba(241, 196, 15, 0.25)',
  },
  sectionTitle: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionIcon: { fontSize: 20 },
  sectionText: { fontSize: 18, fontWeight: '800', color: '#ecf0f1' },
  portfolioGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  portfolioItem: {
    width: '47%', alignItems: 'center', padding: 12, borderRadius: 12,
    backgroundColor: 'rgba(241, 196, 15, 0.08)',
  },
  portfolioEmoji: { fontSize: 28, marginBottom: 4 },
  portfolioName: { fontSize: 12, fontWeight: '700', color: '#ecf0f1', textAlign: 'center' },
  portfolioAmount: { fontSize: 14, fontWeight: '800', color: '#2ecc71' },
  portfolioValue: { fontSize: 11, fontWeight: '600', color: '#95a5a6' },
  totalRow: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingTop: 16, borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  totalLabel: { fontSize: 15, fontWeight: '700', color: '#ecf0f1' },
  totalValue: { fontSize: 24, fontWeight: '900', color: '#2ecc71' },
  stockCard: {
    backgroundColor: 'rgba(241, 196, 15, 0.06)', borderRadius: 20, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(241, 196, 15, 0.2)',
  },
  stockHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  stockInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stockEmoji: { fontSize: 32 },
  stockName: { fontSize: 16, fontWeight: '800', color: '#ecf0f1' },
  stockType: { fontSize: 11, fontWeight: '600', color: '#95a5a6' },
  stockPriceBlock: { alignItems: 'flex-end' },
  stockPrice: { fontSize: 20, fontWeight: '900', color: '#2ecc71' },
  stockChange: { fontSize: 12, fontWeight: '700' },
  positive: { color: '#2ecc71' },
  negative: { color: '#e74c3c' },
  stockBase: { fontSize: 11, fontWeight: '600', color: '#7f8c8d' },
  ownershipRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  ownershipText: { fontSize: 13, color: '#95a5a6', fontWeight: '600' },
  ownershipDivider: { color: '#7f8c8d' },
  bold: { fontWeight: '800', color: '#ecf0f1' },
  controlsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  amountInput: {
    width: 70, paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)', borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)', textAlign: 'center', fontWeight: '700', fontSize: 14, color: '#ecf0f1',
  },
  buyStockBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 50, alignItems: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.15)',
    borderWidth: 1, borderColor: 'rgba(46, 204, 113, 0.3)',
  },
  buyStockBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },
  sellStockBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 50, alignItems: 'center',
    backgroundColor: 'rgba(189, 195, 199, 0.15)',
  },
  sellStockBtnActive: { backgroundColor: 'rgba(231, 76, 60, 0.15)', borderColor: 'rgba(231, 76, 60, 0.3)', borderWidth: 1 },
  sellStockBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },
  totalLine: { textAlign: 'center', fontSize: 11, color: '#95a5a6', fontWeight: '600', marginTop: 8 },
  transactionsCard: {
    backgroundColor: 'rgba(241, 196, 15, 0.08)', borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: 'rgba(241, 196, 15, 0.2)',
  },
  noTransactions: { textAlign: 'center', paddingVertical: 20, color: '#95a5a6', fontSize: 13 },
  txRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  txLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  txEmoji: { fontSize: 18 },
  txAction: { fontSize: 12, fontWeight: '700', color: '#ecf0f1' },
  txDate: { fontSize: 11, color: '#95a5a6' },
  txAmount: { fontSize: 13, fontWeight: '800' },
  txBuy: { color: '#e74c3c' },
  txSell: { color: '#2ecc71' },
});
