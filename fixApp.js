const fs = require('fs');

let code = fs.readFileSync('App.js', 'utf8');

// 1. Add appAlert modal after Confirm Modal
const appAlertCode = `
        {/* App Alert Modal */}
        {state.appAlert && !state.currentEvent && (
          <View style={styles.modalOverlay}>
            <GlassView intensity={80} tint="dark" style={styles.modalContent}>
              <Text style={styles.modalTitle}>{state.appAlert.title}</Text>
              <Text style={styles.modalText}>{state.appAlert.message}</Text>
              <TouchableOpacity 
                style={[styles.modalChoiceBtn, {backgroundColor: '#3498db', alignItems: 'center'}]} 
                onPress={() => dispatch({ type: 'HIDE_ALERT' })}
              >
                <Text style={styles.modalChoiceText}>Tamam</Text>
              </TouchableOpacity>
            </GlassView>
          </View>
        )}
`;
code = code.replace(/\{\/\* Eğitim Turu \(Sadece 1 kez gösterilir\) \*\/\}/g, appAlertCode + '\n      {/* Eğitim Turu (Sadece 1 kez gösterilir) */}');

// 2. Replace alerts in handleAdvanceTime
code = code.replace(/if \(Platform\.OS !== 'web'\) \{\s*Alert\.alert\('Eksik İhtiyaçlar', 'Aya geçmeden önce tüm ihtiyaçlarınızı \(Yiyecek, Kira, Ulaşım\) karşılamalısınız\.'\);\s*\} else \{\s*alert\('Eksik İhtiyaçlar: Aya geçmeden önce tüm ihtiyaçlarınızı \(Yiyecek, Kira, Ulaşım\) karşılamalısınız\.'\);\s*\}/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Eksik İhtiyaçlar', message: 'Aya geçmeden önce tüm ihtiyaçlarınızı (Yiyecek, Kira, Ulaşım) karşılamalısınız.' } });");

code = code.replace(/if \(Platform\.OS !== 'web'\) \{\s*Alert\.alert\('Günü Bitiremezsin', 'Bugün hiçbir şey yapmadın\. Zamanı ilerletmeden önce çalışmalı, kuryelik yapmalı veya bir karakterle görüşmelisin\.'\);\s*\} else \{\s*alert\('Bugün hiçbir şey yapmadın\. Zamanı ilerletmeden önce çalışmalı, kuryelik yapmalı veya bir karakterle görüşmelisin\.'\);\s*\}/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Günü Bitiremezsin', message: 'Bugün hiçbir şey yapmadın. Zamanı ilerletmeden önce çalışmalı, kuryelik yapmalı veya bir karakterle görüşmelisin.' } });");

code = code.replace(/if \(Platform\.OS !== 'web'\) \{\s*Alert\.alert\('Hata', 'Artık her gün için zorunlu efor harcaman gerektiği için 7 gün atlayamazsın\. Gün gün ilerlemelisin\.'\);\s*\} else \{\s*alert\('Artık her gün için zorunlu efor harcaman gerektiği için 7 gün atlayamazsın\. Gün gün ilerlemelisin\.'\);\s*\}/g, "dispatch({ type: 'SHOW_ALERT', payload: { title: 'Hata', message: 'Artık her gün için zorunlu efor harcaman gerektiği için 7 gün atlayamazsın. Gün gün ilerlemelisin.' } });");

fs.writeFileSync('App.js', code);
