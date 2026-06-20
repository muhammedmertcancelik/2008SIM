const fs = require('fs');
const path = require('path');

const dir = 'src/screens';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (!file.endsWith('.js')) return;
  const filePath = path.join(dir, file);
  let code = fs.readFileSync(filePath, 'utf8');

  let changed = false;

  // ShoppingScreen alertMsg -> SHOW_ALERT
  if (file === 'ShoppingScreen.js') {
    if (code.includes('setAlertMsg(')) {
      code = code.replace(/setAlertMsg\(`Bu üründen \$\{amount\} adet almak için yeterli paranız yok\.`\);/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Yetersiz Bakiye', message: `Bu üründen ${amount} adet almak için yeterli paranız yok.` } });");
      code = code.replace(/\{alertMsg && \([\s\S]*?\}\)/, ''); // Remove the local modal UI
      changed = true;
    }
  }

  // WorkScreen specific
  if (file === 'WorkScreen.js') {
    // Replace Alert.alert with buttons -> dispatch SHOW_CONFIRM
    code = code.replace(/Alert\.alert\(\s*'İşe Gir',\s*`\$\{job\.title\} işine girmek istiyor musun\? Eski işinden ayrılacaksın\.`,\s*\[\s*\{\s*text:\s*'Vazgeç',\s*style:\s*'cancel'\s*\},\s*\{\s*text:\s*'Kabul Et',\s*onPress:\s*\(\)\s*=>\s*\{\s*dispatch\(\{ type: 'CHANGE_JOB', payload: \{ job \} \}\);\s*\}\s*\}\s*\]\s*\);/g, "dispatch({ type: 'SHOW_CONFIRM', payload: { title: 'İşe Gir', message: `${job.title} işine girmek istiyor musun? Eski işinden ayrılacaksın.`, onConfirm: () => { dispatch({ type: 'CHANGE_JOB', payload: { job } }); dispatch({ type: 'HIDE_CONFIRM' }); }, onCancel: () => dispatch({ type: 'HIDE_CONFIRM' }) } });");

    code = code.replace(/Alert\.alert\(\s*'İstifa Et',\s*'Gerçekten istifa etmek istiyor musun\? İşsiz kalacaksın\.',\s*\[\s*\{\s*text:\s*'Vazgeç',\s*style:\s*'cancel'\s*\},\s*\{\s*text:\s*'İstifa Et',\s*style:\s*'destructive',\s*onPress:\s*\(\)\s*=>\s*\{\s*dispatch\(\{ type: 'CHANGE_JOB', payload: \{ job: null \} \}\);\s*\}\s*\}\s*\]\s*\);/g, "dispatch({ type: 'SHOW_CONFIRM', payload: { title: 'İstifa Et', message: 'Gerçekten istifa etmek istiyor musun? İşsiz kalacaksın.', onConfirm: () => { dispatch({ type: 'CHANGE_JOB', payload: { job: null } }); dispatch({ type: 'HIDE_CONFIRM' }); }, onCancel: () => dispatch({ type: 'HIDE_CONFIRM' }) } });");

    // Other simple alerts in WorkScreen
    code = code.replace(/Alert\.alert\('Enerji Bitti', 'Çalışmak için yeterli enerjin yok\.'\);/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Enerji Bitti', message: 'Çalışmak için yeterli enerjin yok.' } });");
    code = code.replace(/Alert\.alert\('İşsizsin', 'Çalışmak için önce bir iş bulmalısın\.'\);/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'İşsizsin', message: 'Çalışmak için önce bir iş bulmalısın.' } });");
    code = code.replace(/Alert\.alert\('Çok Yoruldun', 'Bugün zaten çalıştın\. Daha fazla mesai yaparsan hasta olabilirsin\.'\);/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Çok Yoruldun', message: 'Bugün zaten çalıştın. Daha fazla mesai yaparsan hasta olabilirsin.' } });");
    code = code.replace(/Alert\.alert\('Yeni İş', `\$\{job\.title\} işine başladın\!`\);/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Yeni İş', message: `${job.title} işine başladın!` } });");
    code = code.replace(/Alert\.alert\('Başarısız', 'Tecrüben bu iş için yeterli değil\.'\);/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Başarısız', message: 'Tecrüben bu iş için yeterli değil.' } });");

    changed = true;
  }

  // Generic Alert.alert replacements for others
  const matches = code.match(/Alert\.alert\(([^,]+),\s*([^\)]+)\);/g);
  if (matches && file !== 'WorkScreen.js') {
    matches.forEach(m => {
      // Avoid replacing if it has 3 arguments or array brackets inside
      if (m.includes('[')) return;
      
      const parts = m.match(/Alert\.alert\(([\s\S]+?),\s*([\s\S]+?)\);/);
      if (parts) {
        const title = parts[1];
        const message = parts[2];
        const replacement = `dispatch({ type: 'SHOW_ALERT', payload: { title: ${title}, message: ${message} } });`;
        code = code.replace(m, replacement);
        changed = true;
      }
    });
  }

  if (changed) {
    fs.writeFileSync(filePath, code);
  }
});
