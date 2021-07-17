
const _enc = new TextEncoder("utf-8");
const _dec = new TextDecoder("utf-8");

// Converts a string to Uint8Array
const asciiToBinary = (text) => {
    return _enc.encode(text);
}

const binaryToAscii = (binary) => {
    return _dec.decode(binary);
}

const getRandomIv = async () => {
    return await window.crypto.getRandomValues(new Uint8Array(12));
}

const getRandomSalt = async () => {
  return await window.crypto.getRandomValues(new Uint8Array(16));
}

const generateIndexDict = (a) => {
    let result = {};
    for (let i = 0; i < a.length; i++) {
      result[a[i]] = i;
    }
    return result;
}

// Decode URL safe even though it is not the primary encoding mechanism
const _a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const _aRev = generateIndexDict(_a);
_aRev["-"] = _aRev["+"];
_aRev["_"] = _aRev["/"];

// Return a base64-encoded string from a Uint8Array input
const binaryToBase64 = (originalBytes) => {
    // Pad the output array to a multiple of 3 bytes
    let length = originalBytes.length;
    let added = (length % 3 === 0) ? 0 : (3 - length % 3);
    let bytes = new Uint8Array(length + added);
    bytes.set(originalBytes);

    let output = "";
    for (let i = 0; i < bytes.length; i += 3) {
      // Convert 3 8-bit bytes into 4 6-bit indices and get a character from
      // the master list based on each 6-bit index
      //    3 x 8-bit:  |------ --|---- ----|-- ------|
      // => 4 x 6-bit:  |------|-- ----|---- --|------|

      // Get the first 6 bits of the first byte
      output += _a[ bytes[i] >>> 2 ];
      // Merge the end 2 bits of the first byte with the first 4 of the second
      output += _a[ ((bytes[i] & 0x3) << 4) | (bytes[i + 1] >>> 4) ];
      // Merge the end 4 bits of the second byte with the first 2 of the third
      output += _a[ ((bytes[i + 1] & 0xF) << 2) | (bytes[i + 2] >>> 6) ];
      // Get the last 6 bits of the third byte
      output += _a[ bytes[i + 2] & 0x3F ];
    }

    // Turn the final "A" characters into "=" depending on necessary padding
    if (added > 0) {
      output = output.slice(0, -added) + ("=".repeat(added));
    }

    return output;
}

// Takes a Base64 encoded string and returns a decoded Uint8Array. Throws
// an error if the input string does not appear to be a valid base64
// encoding. Attempts to add padding to un-padded base64 strings.
const base64ToBinary = (s) => {
    let bytes = [];

    // Base64 strings have at most 2 padding characters to make their length
    // a multiple of 4, so they could be missing up to 2 characters and still
    // be valid. But if 3 padding characters would be needed, the input
    // cannot be valid. Try and add padding characters if necessary/possible.
    if (s.length % 4 === 1) {
      throw new Error("Invalid base64 input");
    } else if (s.length % 4 !== 0) {
      s += "=".repeat(4 - (s.length % 4));
    }

    for (let i = 0; i <= (s.length - 4); i += 4) {
      // Check that each character in this group of 4 is valid
      for (let j = 0; j < 4; j++) {
        if (s[i + j] !== "=" && !(s[i + j] in _aRev)) {
          throw new Error("Invalid base64 input");
        } else if (s[i + j] === "=" && Math.abs(s.length - (i + j)) > 2) {
          throw new Error("Invalid base64 input");
        }
      }

      // Convert 4 6-bit indices into 3 8-bit bytes by finding the index of
      // each 6-bit character in the master list and combining
      //    4 x 6-bit:  |------|-- ----|---- --|------|
      // => 3 x 8-bit:  |------ --|---- ----|-- ------|

      // Get all 6 bits of the first byte and first 2 bits of the second byte
      bytes.push((_aRev[s[i]] << 2) | (_aRev[s[i + 1]] >>> 4));
      if (s[i + 2] !== "=") {
        // If not padding, merge end 4 bits of the second byte and first 4 of
        // the third
        bytes.push(((_aRev[s[i + 1]] & 0xF) << 4) | (_aRev[s[i + 2]] >>> 2));
      }
      if (s[i + 3] !== "=") {
        // If not padding, take the last 2 bits of the third byte and all 6 of
        // the fourth. Note that if the fourth byte is padding, then certainly
        // the third byte is, so we only have to check the fourth
        bytes.push(((_aRev[s[i + 2]] & 0x3) << 6) | _aRev[s[i + 3]]);
      }
    }

    return new Uint8Array(bytes);
}

// Generates a key for encryption/decryption using the password. 
// The url shortcode is used as the salt.
const deriveKey = async (password, shortCode) => {
    const rawKey = await window.crypto.subtle.importKey(
        "raw",
        asciiToBinary(password),
        { name: "PBKDF2" },
        false,
        [ "deriveBits", "deriveKey" ]
    );

    return await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: asciiToBinary(shortCode),
            iterations: 100000,
            hash: "SHA-256"
          },
          rawKey,
          {
            name: "AES-GCM",
            length: 256
          },
          true,
          [ "encrypt", "decrypt" ]
    );
}

// Encrypt the password using AES-GCM with key derived from password itself.
// Takes in the salt which is derived from the url shortcode.
// IV is randomly generated and returned together with the encrypted binary.
const encrypt = async (password) => {
  const salt = await getRandomSalt();
  const key = await deriveKey(password, salt);
  const iv = await getRandomIv();
  const encryptedBinary = await window.crypto.subtle.encrypt(
      {
          name: "AES-GCM",
          iv
        },
        key,
        asciiToBinary(password)
  );
  return { cipherText: binaryToBase64(new Uint8Array(encryptedBinary)), iv: binaryToBase64(iv), salt: binaryToBase64(salt)};
}

const decrypt = async (password, cipherText, iv, salt) => {
    const key = await deriveKey(password, base64ToBinary(salt));
    const decryptedBinary = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: base64ToBinary(iv)
        },
        key,
        new Uint8Array(base64ToBinary(cipherText))
    );

    return binaryToAscii(decryptedBinary);
}


const Crypto = {
    encrypt,
    decrypt
};

export default Crypto;
