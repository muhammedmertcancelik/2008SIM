const fs = require('fs');

const files = {
  'CityScreen.js': [
    ["Alert.alert(t('city.alerts.noEnergy'), t('city.alerts.noEnergyDesc').replace('{name}', name).replace('{cost}', locationData.energyCost));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.noEnergy'), message: t('city.alerts.noEnergyDesc').replace('{name}', name).replace('{cost}', locationData.energyCost) } });"],
    ["Alert.alert(t('city.alerts.noMoney'), t('city.alerts.noMoneyDesc').replace('{name}', name).replace('{cost}', locationData.cost));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.noMoney'), message: t('city.alerts.noMoneyDesc').replace('{name}', name).replace('{cost}', locationData.cost) } });"],
    ["Alert.alert(t('city.alerts.visitTitle'), t('city.alerts.visitDesc').replace('{name}', name).replace('{energy}', locationData.energyCost).replace('{money}', locationData.cost));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.visitTitle'), message: t('city.alerts.visitDesc').replace('{name}', name).replace('{energy}', locationData.energyCost).replace('{money}', locationData.cost) } });"],
    ["Alert.alert(t('city.alerts.deliveryDone'), t('city.alerts.deliveryDoneDesc').replace('{coins}', coins).replace('{reward}', reward));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.deliveryDone'), message: t('city.alerts.deliveryDoneDesc').replace('{coins}', coins).replace('{reward}', reward) } });"],
    ["Alert.alert(t('city.alerts.accident'), t('city.alerts.accidentDesc'));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('city.alerts.accident'), message: t('city.alerts.accidentDesc') } });"]
  ],
  'DiaryScreen.js': [
    ["Alert.alert(t('diary.alerts.tired'), t('diary.alerts.tiredDesc'));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('diary.alerts.tired'), message: t('diary.alerts.tiredDesc') } });"],
    ["Alert.alert(t('diary.alerts.alreadyDone'), t('diary.alerts.alreadyDoneDesc'));", "dispatch({ type: 'SHOW_ALERT', payload: { title: t('diary.alerts.alreadyDone'), message: t('diary.alerts.alreadyDoneDesc') } });"]
  ],
  'InvestmentScreen.js': [
    ["Alert.alert('Yetersiz Bakiye', `Bu işlem için ${formatMoney(totalCost)} TL gerekli.`);", "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Yetersiz Bakiye', message: `Bu işlem için ${formatMoney(totalCost)} TL gerekli.` } });"]
  ]
};

Object.keys(files).forEach(file => {
  let code = fs.readFileSync('src/screens/' + file, 'utf8');
  files[file].forEach(([find, repl]) => {
    code = code.split(find).join(repl);
  });
  fs.writeFileSync('src/screens/' + file, code);
});

// For WorkScreen.js, use regex carefully or substring
let wsCode = fs.readFileSync('src/screens/WorkScreen.js', 'utf8');
wsCode = wsCode.replace(/Alert\.alert\('Hata', 'Zaten bu işte çalışıyorsun\.'\);/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Hata', message: 'Zaten bu işte çalışıyorsun.' } });");
wsCode = wsCode.replace(/Alert\.alert\('Yetersiz Seviye', `Bu iş için İş Seviyenin en az \$\{job\.requiredLevel\} olması gerekiyor\.`\);/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Yetersiz Seviye', message: `Bu iş için İş Seviyenin en az ${job.requiredLevel} olması gerekiyor.` } });");
wsCode = wsCode.replace(/Alert\.alert\('Eksik Eğitim', `Bu işe girmek için gerekli eğitimi\/sertifikayı almadın\.`\);/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Eksik Eğitim', message: `Bu işe girmek için gerekli eğitimi/sertifikayı almadın.` } });");
wsCode = wsCode.replace(/Alert\.alert\('Hayırlı Olsun!', 'Yeni işinize başladınız\.'\);/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Hayırlı Olsun!', message: 'Yeni işinize başladınız.' } });");

// Replace multiline confirm
const multilineTarget = `Alert.alert(
      'İşe Gir',
      \`\${job.title} işine girmek istiyor musun? Eski işinden ayrılacaksın.\`,
      [
        { text: 'Vazgeç', style: 'cancel' },
        { 
          text: 'Kabul Et', 
          onPress: () => {
            dispatch({ type: 'CHANGE_JOB', payload: { job } });
            Alert.alert('Hayırlı Olsun!', 'Yeni işinize başladınız.');
          }
        }
      ]
    );`;

const multilineRepl = `dispatch({ 
      type: 'SHOW_CONFIRM', 
      payload: { 
        title: 'İşe Gir', 
        message: \`\${job.title} işine girmek istiyor musun? Eski işinden ayrılacaksın.\`, 
        onConfirm: () => { 
          dispatch({ type: 'CHANGE_JOB', payload: { job } }); 
          dispatch({ type: 'SHOW_ALERT', payload: { title: 'Hayırlı Olsun!', message: 'Yeni işinize başladınız.' } });
          dispatch({ type: 'HIDE_CONFIRM' }); 
        }, 
        onCancel: () => dispatch({ type: 'HIDE_CONFIRM' }) 
      } 
    });`;

wsCode = wsCode.split(multilineTarget).join(multilineRepl);

fs.writeFileSync('src/screens/WorkScreen.js', wsCode);
