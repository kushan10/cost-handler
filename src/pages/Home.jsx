import React, { useState } from "react";

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

const Home = () => {
  const [code, setCode] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [secondPrice, set10Price] = useState("");
  const [thirdPrice, set15Price] = useState("");
  const [lastPrice, set20Price] = useState("");

  const handleDecrypt = () => {
    const upperCode = code.toUpperCase();

    if (upperCode.length < 1 || upperCode.length > 7) {
      setOriginalPrice("Code must be 1 to 7 letters");
      setFinalPrice("");
      set10Price("");
      set15Price("");
      set20Price("");
      return;
    }

    const digits = upperCode.split("").map((letter) => {
      const digit = letterToDigitMap[letter];
      return digit !== undefined ? digit : "?";
    });

    if (digits.includes("?")) {
      setOriginalPrice("Invalid letter in code");
      setFinalPrice("");
      set10Price("");
      set15Price("");
      set20Price("");
    } else {
      const rawPrice = parseInt(digits.join(""));
      const added5Percent = (rawPrice * 1.05).toFixed(2);
      const added15Percent = (rawPrice * 1.15).toFixed(2);
      const added20Percent = (rawPrice * 1.2).toFixed(2);

      setOriginalPrice(`Rs. ${rawPrice}`);
      setFinalPrice(`Rs. ${added5Percent}`);
      set10Price(`Rs. ${added15Percent}`);
      set15Price(`Rs. ${added15Percent}`);
      set20Price(`Rs. ${added20Percent}`);
    }
  };

  return (
    <div className=" bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-10">
      <h1 className="text-xl font-bold mb-4 text-center">Price Decryptor</h1>

      <input
        type="text"
        value={code}
        maxLength={7}
        onChange={(e) => {
          const lettersOnly = e.target.value
            .replace(/[^a-zA-Z]/g, "")
            .toUpperCase();
          setCode(lettersOnly);
        }}
        className="border border-gray-300 p-2 rounded mb-4 w-full text-center uppercase"
        placeholder="Enter Code (1–7 letters)"
      />

      <button
        onClick={handleDecrypt}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Show Price
      </button>

      {originalPrice && (
        <div className="mt-6 text-lg font-medium text-gray-800">
          Original Price: {originalPrice}
        </div>
      )}

      {finalPrice && (
        <div className="mt-2 text-xl font-semibold text-green-600">
          (+5%): {finalPrice} <br />
          (+10%): {secondPrice} <br />
          (+15%): {thirdPrice} <br />
          (+20%): {lastPrice}
        </div>
      )}
    </div>
  );
};

export default Home;
