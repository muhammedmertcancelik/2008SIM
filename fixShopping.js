const fs = require('fs');

let code = fs.readFileSync('src/screens/ShoppingScreen.js', 'utf8');

// Imports
code = code.replace(/import \{ View/, "import GlassView from '../components/GlassView';\nimport { View");

// View to GlassView
code = code.replace(/<View style=\{styles\.marketHeader\}>/g, "<GlassView intensity={30} tint='dark' style={styles.marketHeader}>");
code = code.replace(/<View key=\{item\.id\} style=\{styles\.productCard\}>/g, "<GlassView intensity={30} tint='dark' key={item.id} style={styles.productCard}>");

// Update close tags for the specific Views
// marketHeader ends right before {/* Ürün Grid — View tabanlı (FlatList yerine) */}
code = code.replace(/<\/View>\n\n      \{\/\* Ürün Grid — View tabanlı \(FlatList yerine\) \*\/\}/g, "</GlassView>\n\n      {/* Ürün Grid — View tabanlı (FlatList yerine) */}");
// productCard ends inside the map, right after </View> of buyBtnRow
code = code.replace(/<\/View>\n                  <\/View>/g, "</View>\n                  </GlassView>");

// Styles update
code = code.replace(/backgroundColor: 'rgba\\(243, 156, 18, 0\.3\\)',\n    borderRadius: 16,\n    padding: 12,\n    marginHorizontal: 16,\n    marginBottom: 8,\n    borderWidth: 1,\n    borderColor: 'rgba\\(243, 156, 18, 0\.25\\)',/g, "borderRadius: 16,\n    padding: 12,\n    marginHorizontal: 16,\n    marginBottom: 8,\n    borderWidth: 1,\n    borderColor: 'rgba(255, 255, 255, 0.1)',");

code = code.replace(/width: '48%', backgroundColor: 'rgba\\(243, 156, 18, 0\.2\\)',\n    borderRadius: 12, padding: 10, alignItems: 'center',\n    borderWidth: 1, borderColor: 'rgba\\(243, 156, 18, 0\.2\\)',/g, "width: '48%',\n    borderRadius: 12, padding: 10, alignItems: 'center',\n    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)',");

// Button styles
code = code.replace(/backgroundColor: '#f39c12', paddingVertical: 6, borderRadius: 50, flex: 1, alignItems: 'center',/g, "backgroundColor: 'rgba(243, 156, 18, 0.15)', borderWidth: 1, borderColor: 'rgba(243, 156, 18, 0.3)', paddingVertical: 6, borderRadius: 50, flex: 1, alignItems: 'center',");
code = code.replace(/buyBtnBulk: \{ backgroundColor: '#d35400' \},/g, "buyBtnBulk: { backgroundColor: 'rgba(211, 84, 0, 0.15)', borderColor: 'rgba(211, 84, 0, 0.3)' },");
code = code.replace(/buyBtnDisabled: \{ backgroundColor: '#bdc3c7' \},/g, "buyBtnDisabled: { backgroundColor: 'rgba(189, 195, 199, 0.1)', borderColor: 'rgba(189, 195, 199, 0.2)' },");

// Category pills to make them less bright
code = code.replace(/categoryPillActive: \{ backgroundColor: '#f39c12', shadowColor: '#f39c12', shadowOpacity: 0\.3, elevation: 3 \},/g, "categoryPillActive: { backgroundColor: 'rgba(243, 156, 18, 0.2)', borderWidth: 1, borderColor: 'rgba(243, 156, 18, 0.4)' },");
code = code.replace(/subcategoryPillActive: \{ backgroundColor: '#ecf0f1', borderColor: '#ecf0f1' \},/g, "subcategoryPillActive: { backgroundColor: 'rgba(236, 240, 241, 0.2)', borderColor: 'rgba(236, 240, 241, 0.4)' },");
code = code.replace(/subcategoryTextActive: \{ color: '#2c3e50' \},/g, "subcategoryTextActive: { color: '#ffffff' },");

fs.writeFileSync('src/screens/ShoppingScreen.js', code);
