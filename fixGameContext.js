const fs = require('fs');

let code = fs.readFileSync('src/state/GameContext.js', 'utf8');

// 1. Add hasSeenTutorial to saveData
code = code.replace(/stats: gameState\.stats,\n\s*\/\* === Yaşayan Roman === \*\//g, "stats: gameState.stats,\n        hasSeenTutorial: gameState.hasSeenTutorial || false,\n        /* === Yaşayan Roman === */");

// 2. Add SHOW_ALERT and HIDE_ALERT to reducer
const reducerAddition = `
    case 'SHOW_ALERT':
      return { ...state, appAlert: action.payload };
    case 'HIDE_ALERT':
      return { ...state, appAlert: null };

    case 'COMPLETE_TUTORIAL':`;

code = code.replace(/case 'COMPLETE_TUTORIAL':/g, reducerAddition.trim());

// 3. Add appAlert: null to initial state
code = code.replace(/hasSeenTutorial: false,/g, "hasSeenTutorial: false,\n    appAlert: null,");

fs.writeFileSync('src/state/GameContext.js', code);
