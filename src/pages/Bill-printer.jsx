import React, { useState, useRef } from "react";

const BillPrinter = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const printRef = useRef();

  const handleAddProduct = () => {
    if (!name || !qty || !price) return;
    setProducts([...products, { name, qty: +qty, price: +price }]);
    setName("");
    setQty("");
    setPrice("");
  };

  const handlePrint = () => {
    const confirmPrint = window.confirm(
      "Are you sure you want to pay and print the bill?"
    );
    if (confirmPrint) {
      // Wait for the print dialog to open, then refresh the page after printing
      window.onafterprint = () => {
        window.location.reload();
      };
      window.print();
    }
    // If cancelled, do nothing
  };

  const total = products.reduce((acc, p) => acc + p.qty * p.price, 0);

  const today = new Date();
  const dateStr = today.toLocaleDateString();
  const timeStr = today.toLocaleTimeString();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">🧾 Bill Generator</h2>

      {/* Product Entry Section - Hidden on Print */}
      <div className="grid grid-cols-3 gap-4 mb-4 print:hidden">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="number"
          placeholder="Qty"
          min={1}
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
      </div>

      <button
        onClick={handleAddProduct}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-6 print:hidden"
      >
        Add Product
      </button>

      {/* Bill Preview - Only this will be printed */}
      {products.length > 0 && (
        <div ref={printRef} className="print-area p-4">
          {/* Date and Time */}
          <div className="flex justify-between mb-4 text-sm text-gray-600 border-t pt-2">
            <div>
              Thilakarathna Hardware <br /> No 74, <br />
              Pitipana North, <br />
              Homagama <br />
              071233243 / 0754321234
            </div>
            <div>Date: {dateStr}</div>
            <div>Time: {timeStr}</div>
          </div>

          <table className="w-full text-left border border-collapse mb-4">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">{p.qty}</td>
                  <td className="p-2 border">Rs. {p.price}</td>
                  <td className="p-2 border">Rs. {p.qty * p.price}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td colSpan="3" className="p-2 text-right border">
                  Total
                </td>
                <td className="p-2 border">Rs. {total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded w-full print:hidden"
          >
            Pay & Print
          </button>
        </div>
      )}
    </div>
  );
};

export default BillPrinter;
