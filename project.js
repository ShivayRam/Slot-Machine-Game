// 1. Need to know how much money . DEPOSIT SOME MONEY
// 2. DETERMINE NO OF LINES TO BET ON
// 3. COLLECT BET MONEY
// 4. SPIN SLOT MACHINE
// 5. DETERMINE WINNINGS
// 6. GIVE USER WINNINGS
// 7. PLAY AGAIN

const prompt = require("prompt-sync")(); // Import prompt-sync, imports it into the program which gives us access to user imput functionality

const deposit = () => {
    const depoAmt = prompt("Please enter deposit amount: "); // Prompt user to enter deposit amount
    const numDepoAmt = parseFloat(depoAmt); // converts user input to a number

    if (isNaN(numDepoAmt) || numDepoAmt <= 0) { // Check if user input is not a number and then calls the deposit function so user may reattempt 
        console.log("Invalid amount. Please try again.");
        deposit();
    }
 }

 deposit();