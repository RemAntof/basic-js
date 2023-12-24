const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(reverse = true) {
    this.reverse = reverse;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();

    let encryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];

      if (/[^A-Z]/.test(char)) {
        encryptedMessage += char;
      } else {
        const shift = key.charCodeAt(keyIndex) - 65;
        const encryptedChar = String.fromCharCode((char.charCodeAt() + shift - 65 + 26) % 26 + 65);
        encryptedMessage += encryptedChar;

        keyIndex = (keyIndex + 1) % key.length;
      }
    }

    return this.reverse ? encryptedMessage : encryptedMessage.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    key = key.toUpperCase();

    let decryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < encryptedMessage.length; i++) {
      const char = encryptedMessage[i];

      if (/[^A-Z]/.test(char)) {
        decryptedMessage += char;
      } else {
        const shift = key.charCodeAt(keyIndex) - 65;
        const decryptedChar = String.fromCharCode((char.charCodeAt() - shift - 65 + 26) % 26 + 65);
        decryptedMessage += decryptedChar;

        keyIndex = (keyIndex + 1) % key.length;
      }
    }

    return this.reverse ? decryptedMessage : decryptedMessage.split('').reverse().join('');
  }
}


module.exports = {
  VigenereCipheringMachine
};
