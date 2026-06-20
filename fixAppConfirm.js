const fs = require('fs');

let code = fs.readFileSync('App.js', 'utf8');

// Remove local state
code = code.replace(/const \[confirmDialog, setConfirmDialog\] = useState\(null\);/g, "");

// Replace references to confirmDialog with state.confirmDialog
code = code.replace(/\{confirmDialog &&/g, "{state.confirmDialog &&");
code = code.replace(/\{confirmDialog\.title\}/g, "{state.confirmDialog.title}");
code = code.replace(/\{confirmDialog\.message\}/g, "{state.confirmDialog.message}");
code = code.replace(/confirmDialog\.onCancel/g, "state.confirmDialog.onCancel");
code = code.replace(/confirmDialog\.onConfirm/g, "state.confirmDialog.onConfirm");

// Replace setConfirmDialog({ ... }) with dispatch({ type: 'SHOW_CONFIRM', payload: { ... } })
// And setConfirmDialog(null) with dispatch({ type: 'HIDE_CONFIRM' })
code = code.replace(/setConfirmDialog\(null\)/g, "dispatch({ type: 'HIDE_CONFIRM' })");

code = code.replace(/setConfirmDialog\(\{([\s\S]*?)\}\);/g, "dispatch({ type: 'SHOW_CONFIRM', payload: {$1} });");

// The Confirm Modal inside WelcomeScreen might cause an issue because WelcomeScreen doesn't have its own dispatch if it's outside. But WelcomeScreen is inside AppContent, so dispatch works!

// Wait, the confirm modal inside the render tree:
/*
        {state.confirmDialog && !state.currentEvent && (
          <View style={styles.modalOverlay}>
            <GlassView intensity={80} tint="dark" style={styles.modalContent}>
*/
// It's already updated!

fs.writeFileSync('App.js', code);
