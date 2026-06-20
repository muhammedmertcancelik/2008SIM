const fs = require('fs');

let code = fs.readFileSync('src/screens/InvestmentScreen.js', 'utf8');

// Imports
code = code.replace(/import \{ View/, "import GlassView from '../components/GlassView';\nimport { View");

// View to GlassView
code = code.replace(/<View style=\{styles\.portfolioCard\}>/g, "<GlassView intensity={30} tint='dark' style={styles.portfolioCard}>");
code = code.replace(/<View key=\{stock\.id\} style=\{styles\.stockCard\}>/g, "<GlassView intensity={30} tint='dark' key={stock.id} style={styles.stockCard}>");
code = code.replace(/<View style=\{styles\.transactionsCard\}>/g, "<GlassView intensity={30} tint='dark' style={styles.transactionsCard}>");

// Update close tags for the specific Views
// Portfolio card ends right before {/* Yatırım Kartları */}
code = code.replace(/<\/View>\s*\{\/\* Yatırım Kartları \*\/\}/g, "</GlassView>\n\n      {/* Yatırım Kartları */}");
// Stock card ends before {/* İşlemler */}
code = code.replace(/<\/View>\s*\);\s*\}\)\}\s*\{\/\* İşlemler \*\/\}/, "</GlassView>\n        );\n      })}\n\n      {/* İşlemler */}");
// Transactions card ends right before <View style={{ height: 20 }} />
code = code.replace(/<\/View>\s*<View style=\{\{\s*height: 20\s*\}\}\s*\/>/g, "</GlassView>\n\n      <View style={{ height: 20 }} />");

// Styles update
code = code.replace(/backgroundColor: 'rgba\\(241, 196, 15, 0\.85\\)', borderRadius: 20, padding: 20,\s*marginBottom: 16, borderWidth: 1, borderColor: 'rgba\\(241, 196, 15, 0\.25\\)',/g, "padding: 20, borderRadius: 20, marginBottom: 16,\n    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)',");
code = code.replace(/backgroundColor: 'rgba\\(241, 196, 15, 0\.15\\)', borderRadius: 20, padding: 20, marginBottom: 16,\s*borderWidth: 1, borderColor: 'rgba\\(241, 196, 15, 0\.2\\)',/g, "padding: 20, borderRadius: 20, marginBottom: 16,\n    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)',");
code = code.replace(/backgroundColor: 'rgba\\(241, 196, 15, 0\.85\\)', borderRadius: 20, padding: 20,\s*borderWidth: 1, borderColor: 'rgba\\(241, 196, 15, 0\.2\\)',/g, "padding: 20, borderRadius: 20,\n    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)',");

// Button styles
code = code.replace(/backgroundColor: '#2ecc71',/g, "backgroundColor: 'rgba(46, 204, 113, 0.15)',");
code = code.replace(/shadowColor: '#2ecc71', shadowOffset: \{ width: 0, height: 4 \}, shadowOpacity: 0\.25, shadowRadius: 12, elevation: 3,/g, "borderWidth: 1, borderColor: 'rgba(46, 204, 113, 0.3)',");
code = code.replace(/backgroundColor: '#bdc3c7',/g, "backgroundColor: 'rgba(189, 195, 199, 0.15)',");
code = code.replace(/backgroundColor: '#e74c3c', shadowColor: '#e74c3c', shadowOffset: \{ width: 0, height: 4 \}, shadowOpacity: 0\.25, shadowRadius: 12, elevation: 3/g, "backgroundColor: 'rgba(231, 76, 60, 0.15)', borderColor: 'rgba(231, 76, 60, 0.3)', borderWidth: 1");

fs.writeFileSync('src/screens/InvestmentScreen.js', code);
