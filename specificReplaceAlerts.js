const fs = require('fs');

const files = {
  'BankScreen.js': [
    ["Alert.alert(t('bank.alerts.loanRejected'), t('bank.alerts.loanRejectedDesc'));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.loanRejected'), message: t('bank.alerts.loanRejectedDesc') } });"],
    ["Alert.alert(t('bank.alerts.loanApproved'), t('bank.alerts.loanApprovedDesc').replace('{amount}', formatMoneyFull(amount, state?.language)));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.loanApproved'), message: t('bank.alerts.loanApprovedDesc').replace('{amount}', formatMoneyFull(amount, state?.language)) } });"],
    ["Alert.alert(t('bank.alerts.noMoney'), t('bank.alerts.noMoneyDebt'));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.noMoney'), message: t('bank.alerts.noMoneyDebt') } });"],
    ["Alert.alert(t('bank.alerts.noDebt'), t('bank.alerts.noDebtDesc'));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.noDebt'), message: t('bank.alerts.noDebtDesc') } });"],
    ["Alert.alert(t('bank.alerts.noMoney'), t('bank.alerts.noMoneyDeposit'));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.noMoney'), message: t('bank.alerts.noMoneyDeposit') } });"],
    ["Alert.alert(t('bank.alerts.noMoney'), t('bank.alerts.noMoneyWithdraw'));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('bank.alerts.noMoney'), message: t('bank.alerts.noMoneyWithdraw') } });"]
  ],
  'CityScreen.js': [
    ["Alert.alert('Eksik İhtiyaçlar', 'Şehre çıkmadan önce tüm ihtiyaçlarınızı (Yiyecek, Kira, Ulaşım) karşılamalısınız.');", "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Eksik İhtiyaçlar', message: 'Şehre çıkmadan önce tüm ihtiyaçlarınızı (Yiyecek, Kira, Ulaşım) karşılamalısınız.' } });"],
    ["Alert.alert(t('city.alerts.noEnergy'), t('city.alerts.noEnergyDesc'));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.noEnergy'), message: t('city.alerts.noEnergyDesc') } });"],
    ["Alert.alert(t('city.alerts.noMoney'), t('city.alerts.noMoneyDesc').replace('{cost}', formatMoney(cost, state?.language)));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.noMoney'), message: t('city.alerts.noMoneyDesc').replace('{cost}', formatMoney(cost, state?.language)) } });"]
  ],
  'DiaryScreen.js': [
    ["Alert.alert('Geliştiriliyor', 'Anılar özelliği çok yakında eklenecek!');", "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Geliştiriliyor', message: 'Anılar özelliği çok yakında eklenecek!' } });"]
  ],
  'InvestmentScreen.js': [
    ["Alert.alert(t('investment.alerts.noMoney'), t('investment.alerts.noMoneyDesc').replace('{cost}', formatMoney(totalCost)));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('investment.alerts.noMoney'), message: t('investment.alerts.noMoneyDesc').replace('{cost}', formatMoney(totalCost)) } });"],
    ["Alert.alert(t('investment.alerts.noStock'), t('investment.alerts.noStockDesc').replace('{owned}', owned).replace('{stock}', state.language === 'en' ? (stock.name_en || stock.name) : stock.name));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('investment.alerts.noStock'), message: t('investment.alerts.noStockDesc').replace('{owned}', owned).replace('{stock}', state.language === 'en' ? (stock.name_en || stock.name) : stock.name) } });"]
  ]
};

Object.keys(files).forEach(file => {
  let code = fs.readFileSync('src/screens/' + file, 'utf8');
  files[file].forEach(([find, repl]) => {
    // Escape string for regex or just use split/join
    code = code.split(find).join(repl);
  });
  fs.writeFileSync('src/screens/' + file, code);
});
