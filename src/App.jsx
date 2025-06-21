import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./pages/Home";
import Encryptor from "./pages/Encryptor";
import BillPrinter from "./pages/Bill-printer";

function App() {
  const [mode, setMode] = useState("decrypt");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Price Code Tool</h1>

      <div className="flex gap-6 mb-8">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="mode"
            value="decrypt"
            checked={mode === "decrypt"}
            onChange={() => setMode("decrypt")}
          />
          Decrypt Code
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="mode"
            value="encrypt"
            checked={mode === "encrypt"}
            onChange={() => setMode("encrypt")}
          />
          Encrypt Price
        </label>
      </div>

      {mode === "decrypt" ? <Home /> : <Encryptor />}
      <BillPrinter />
    </div>
  );
}

export default App;
