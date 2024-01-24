const readline = require('readline');
const generateWallet = require('./src/generate_wallet');
const sortAddressList = require('./src/sorted_wallet');
const figlet = require("figlet")
require('colors')

// Function to display the menu and get user choice
function displayMenu() {
  console.log('Menu:');
  console.log('1. Generate Wallet');
  console.log('2. Sorted Address List');

  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter your choice (1-2): ', (choice) => {
      rl.close();
      resolve(choice);
    });
  });
}

// Main function to handle user choice
async function main() {
  let userChoice;
  
    const banner = await figlet.text("Sei Gen");
    console.log(banner, "\nGithub: https://github.com/Tnodes\n");
    userChoice = await displayMenu();

    switch (userChoice) {
      case '1':
        await generateWallet.main();
        break;
      case '2':
        await sortAddressList.main();
        break;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 2.');
        break;
    }
}

// Run the main function
main();
