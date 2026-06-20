const fs = require('fs');

let code = fs.readFileSync('src/state/GameContext.js', 'utf8');

// Add SHOW_CONFIRM and HIDE_CONFIRM
const reducerAddition = `
    case 'SHOW_CONFIRM':
      return { ...state, confirmDialog: action.payload };
    case 'HIDE_CONFIRM':
      return { ...state, confirmDialog: null };
    case 'SHOW_ALERT':`;

code = code.replace(/case 'SHOW_ALERT':/g, reducerAddition.trim());

// Add confirmDialog to initial state
code = code.replace(/appAlert: null,/g, "appAlert: null,\n    confirmDialog: null,");

fs.writeFileSync('src/state/GameContext.js', code);
