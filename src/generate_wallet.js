const fs = require('fs');
const readline = require('readline');
const { generateWallet } = require('@sei-js/core');

// Function to prompt the user for input
function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Save wallet information to a file
async function saveWalletToFile(numWallets) {
  try {
    const wallets = [];

    for (let i = 0; i < numWallets; i++) {
      const generatedWallet = await generateWallet();
      const walletAddress = await generatedWallet.getAccounts({});

      const walletInfo = {
        mnemonic: generatedWallet.mnemonic,
        algo: walletAddress[0].algo,
        pubkey: walletAddress[0].pubkey.toString(),
        address: walletAddress[0].address,
      };

      wallets.push(walletInfo);
    }

    // Convert wallets array to a JSON string
    const walletsString = JSON.stringify(wallets, null, 2);

    // Save the JSON string to save_wallet.json
    fs.writeFileSync('save_wallet.json', walletsString);

    console.log(`${numWallets} wallet(s) information saved to save_wallet.json`.yellow);
  } catch (error) {
    console.error('Error generating or saving wallet:', error.red);
  }
}

// Main function to get user input and generate wallets
async function main() {
  console.log("[NOTES] Back up the save_wallet.json file first, before generating it again.".bgBlue);
  const numWalletsInput = await askQuestion('Enter the number of wallet addresses to generate: ');
  const numWallets = parseInt(numWalletsInput, 10);

  if (isNaN(numWallets) || numWallets <= 0) {
    console.error('Invalid input. Please enter a valid number greater than 0.'.red);
    return;
  }

  saveWalletToFile(numWallets);
}

module.exports = {
    main: main,
};
