// 1. Need to know how much money . DEPOSIT SOME MONEY
// 2. DETERMINE NO OF LINES TO BET ON
// 3. COLLECT BET MONEY
// 4. SPIN SLOT MACHINE
// 5. DETERMINE WINNINGS
// 6. GIVE USER WINNINGS
// 7. PLAY AGAIN

const prompt = require("prompt-sync")(); // Import prompt-sync, imports it into the program which gives us access to user imput functionality

const ROWS = 3; // Number of rows in the slot machine
const COLS = 3; // Number of columns in the slot machine

const SYMBOLS_COUNT = { //dont need the "" around the keys in JS
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
}


const deposit = () => {
    while (true) {    
        const depoAmt = prompt("Please enter deposit amount: "); // Prompt user to enter deposit amount
        const numDepoAmt = parseFloat(depoAmt); // converts user input to a number

        if (isNaN(numDepoAmt) || numDepoAmt <= 0) { // Check if user input is not a number and then calls the deposit function so user may reattempt 
             console.log("Invalid amount. Please try again.");
        }else {
            return numDepoAmt;
        }
    }
}

const getNumOfLines = () => {
    while (true) {    
        const lines = prompt("Please enter the number of lines to bet on (1-3): "); // Prompt user to enter deposit amount
        const numOfLines = parseFloat(lines); // converts user input to a number

        if (isNaN(numOfLines) || numOfLines <= 0 || numOfLines > 3) { // Check if user input is not a number or is invalide choice and user may reattempt 
             console.log("Invalid number of lines. Please try again.");
        }else {
            return numOfLines;
        }
    }
}

const getBet = (balance, lines) => {
    while (true) {    
        const bet = prompt("Please enter the total bet per line: "); // Prompt user to enter bet amount
        const numBet = parseFloat(bet); // converts user input to a number

        if (isNaN(numBet) || numBet <= 0 || numBet > balance / lines) { // Check if user input is not a number or is invalide choice and user may reattempt 
             console.log("Invalid bet. Please try again.");
        }else {
            return numBet;
        }
    }

}

const spin = () => {
    const symbols = [];
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];  //arrays inside represent our columns

    for (let i = 0; i < COLS; i++) {
        reels.push([]); //push an empty array into our reels array
        const reelSymbols = [...symbols]; //copy of symbols array
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); //generates a random number between 0 and the length of the symbols array - 1.
            const selectedSymbol = reelSymbols[randomIndex]; //select the element/symbol from our reelssymbol array
            reels[i].push(selectedSymbol); //push the selected symbol into our reels array
            reelSymbols.splice(randomIndex, 1); //remove the selected symbol from our reelSymbols array
        }
    }

    return reels;
}

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

const printRows = (rows) => {
    for (const row of rows) {
       let rowString = "";
       for (const [i, symbol] of row.entries()) {
           rowString += symbol;
           if (i != row.length - 1) {
                rowString += " | ";
           }
       }
       console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;
}

const game = () => {
   
    let balance = deposit();
  
    while (true) {
      console.log("You have a balance of $" + balance);
      const numberOfLines = getNumOfLines();
      const bet = getBet(balance, numberOfLines);
      balance -= bet * numberOfLines;
      const reels = spin();
      const rows = transpose(reels);
      printRows(rows);
      const winnings = getWinnings(rows, bet, numberOfLines);
      balance += winnings;
      console.log("You won, $" + winnings.toString());
  
      if (balance <= 0) {
        console.log("You ran out of money!");
        break;
      }
  
      const playAgain = prompt("Do you want to play again (y/n)? ");
  
      if (playAgain != "y") break;
    }
  };
  
  game();