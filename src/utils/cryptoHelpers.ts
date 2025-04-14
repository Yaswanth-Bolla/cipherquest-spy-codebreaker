
// Caesar cipher encryption/decryption
export function caesarCipher(text: string, shift: number, decrypt = false): string {
  // Adjust shift for decryption
  if (decrypt) {
    shift = (26 - shift) % 26;
  }
  
  return text.split('').map(char => {
    // Only shift alphabetic characters
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      let shiftedCode: number;
      
      // Handle uppercase letters
      if (code >= 65 && code <= 90) {
        shiftedCode = ((code - 65 + shift) % 26) + 65;
      } 
      // Handle lowercase letters
      else if (code >= 97 && code <= 122) {
        shiftedCode = ((code - 97 + shift) % 26) + 97;
      } 
      else {
        return char;
      }
      
      return String.fromCharCode(shiftedCode);
    }
    return char;
  }).join('');
}

// Vigenère cipher encryption/decryption
export function vigenereCipher(text: string, key: string, decrypt = false): string {
  const result: string[] = [];
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // Only encrypt/decrypt alphabetic characters
    if (char.match(/[a-z]/i)) {
      const isUpperCase = char === char.toUpperCase();
      const textChar = char.toLowerCase();
      const keyChar = key[keyIndex % key.length].toLowerCase();
      
      const textCode = textChar.charCodeAt(0) - 97; // 'a' is 97
      const keyCode = keyChar.charCodeAt(0) - 97;
      
      let result: number;
      
      if (decrypt) {
        result = (textCode - keyCode + 26) % 26;
      } else {
        result = (textCode + keyCode) % 26;
      }
      
      const resultChar = String.fromCharCode(result + 97);
      result.push(isUpperCase ? resultChar.toUpperCase() : resultChar);
      keyIndex++;
    } else {
      result.push(char);
    }
  }
  
  return result.join('');
}

// Base64 encoding/decoding
export function base64Encode(text: string): string {
  // For browser environments
  return btoa(text);
}

export function base64Decode(encoded: string): string {
  try {
    return atob(encoded);
  } catch (e) {
    console.error('Invalid Base64 string:', e);
    return 'Error: Invalid Base64 string';
  }
}

// Hex encoding/decoding
export function hexEncode(text: string): string {
  return Array.from(text)
    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}

export function hexDecode(hex: string): string {
  try {
    // Remove any spaces or non-hex characters
    hex = hex.replace(/[^0-9a-fA-F]/g, '');
    
    // Ensure we have an even number of characters
    if (hex.length % 2 !== 0) {
      throw new Error('Invalid hex string: odd length');
    }
    
    const result: string[] = [];
    for (let i = 0; i < hex.length; i += 2) {
      const hexPair = hex.substr(i, 2);
      const num = parseInt(hexPair, 16);
      result.push(String.fromCharCode(num));
    }
    
    return result.join('');
  } catch (e) {
    console.error('Invalid hex string:', e);
    return 'Error: Invalid hex string';
  }
}
