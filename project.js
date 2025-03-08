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

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
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

let balance = deposit(); // Calls the deposit function and stores the return value in the variable balance
const numOfLines = getNumOfLines(); // Calls the getNumOfLines function and stores the return value in the variable numOfLines
const bet = getBet(balance, numOfLines); // Calls the getBet function and stores the return value in the variable bet
