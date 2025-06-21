import React, { useState } from "react";

// Reuse the same letter-to-digit map
const letterToDigitMap = {
  A: 6,
  B: 0,
  C: 5,
  D: 9,
  E: 2,
  F: 7,
  G: 4,
  H: 3,
  I: 1,
  J: 8,
  K: 4,
  L: 6,
  M: 3,
  N: 0,
  O: 8,
  P: 7,
  Q: 9,
  R: 2,
  S: 5,
  T: 1,
};

// Flip the map: digit → possible letters
const digitToLettersMap = {};
for (const [letter, digit] of Object.entries(letterToDigitMap)) {
  if (!digitToLettersMap[digit]) digitToLettersMap[digit] = [];
  digitToLettersMap[digit].push(letter);
}

const Encryptor = () => {
  const [price, setPrice] = useState("");
  const [code, setCode] = useState("");

  const handleEncrypt = () => {
    if (!/^\d+$/.test(price)) {
      setCode("Enter only numbers");
      return;
    }

    const digits = price.split("");
    const codeLetters = digits.map((digit) => {
      const possibleLetters = digitToLettersMap[digit];
      if (!possibleLetters) return "?";
      // Pick a random letter for that digit
      const randomIndex = Math.floor(Math.random() * possibleLetters.length);
      return possibleLetters[randomIndex];
    });

    if (codeLetters.includes("?")) {
      setCode("Invalid digit found");
    } else {
      setCode(codeLetters.join(""));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Encrypt Price</h2>

      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full text-center"
        placeholder="Enter Price (digits only)"
      />

      <button
        onClick={handleEncrypt}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Encrypt
      </button>

      {code && (
        <div className="mt-6 text-lg text-blue-600 text-center">
          Encrypted Code: <span className="font-semibold">{code}</span>
        </div>
      )}
    </div>
  );
};

export default Encryptor;
