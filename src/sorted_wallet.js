const fs = require('fs');
const readlineSync = require('readline-sync');

// Function to check if a file exists
function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

// Function to read the content of a file
function readFile(filePath) {
  try {
    // Check if the file exists before attempting to read it
    if (!fileExists(filePath)) {
      console.error(`Error: File '${filePath}' not found.`.red);
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`.red);
    return null;
  }
}

// Function to extract wallet addresses from the list and save them to a new file
function extractAddressesAndSaveToFile(walletList, outputFilePath) {
  try {
    const addresses = walletList.map((wallet) => wallet.address);

    // Save the addresses to list_address.txt without square brackets
    fs.writeFileSync(outputFilePath, addresses.join('\n'));

    console.log(`Wallet addresses extracted and saved to ${outputFilePath}`.yellow);
  } catch (error) {
    console.error('Error extracting addresses or saving to file:', error.red);
  }
}

// Main function to read wallet list and extract addresses
function main() {
  const inputFilePath = 'save_wallet.json';
  const outputFilePath = 'list_address.txt';

  // Read the content of save_wallet.json
  const walletList = readFile(inputFilePath);

  if (!walletList) {
    console.error('Exiting due to errors. Please fix the issues before running again.'.red);
    return;
  }

  // Check if list_address.txt file exists
  if (fileExists(outputFilePath)) {
    // Prompt user before sorting
    const userResponse = readlineSync.question('[NOTES] Backup the list_address.txt file first, before starting to merge again. Would you like to continue (y/n): '.bgBlue);

    if (userResponse.toLowerCase() !== 'y') {
      console.log('Exiting without sorting.');
      return;
    }
  }

  // Extract addresses from the list and save them to list_address.txt
  extractAddressesAndSaveToFile(walletList, outputFilePath);
}

module.exports = {
  main: main,
};
