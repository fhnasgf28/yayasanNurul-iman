// components/Donation.tsx
import React, { useState } from 'react';

const Donation: React.FC = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = () => {
    // Format data untuk dikirim melalui WhatsApp
    const formattedData = `Assalamualaikum, saya ingin melakukan donasi sejumlah IDR ${amount.toLocaleString()}, atas nama ${name}. Pesan: ${onmessage}`;

    // Buat URL WhatsApp dengan parameter
    const whatsappUrl = `https://wa.me/6283823290281?text=${encodeURIComponent(formattedData)}`;

    // Arahkan pengguna ke URL WhatsApp
    window.location.href = whatsappUrl;
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Donasi</h2>
      <p className="text-gray-700 mb-4">
        Bantu kami dengan donasi Anda untuk terus mendukung Pembangunan Yayasan Nurul Iman.
      </p>
      <form >
        <label className="block mb-2" htmlFor="name">
          Nama:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </label>
        <label className="block mb-2" htmlFor="amount">
          Jumlah Donasi (IDR):
          <input
            type="number"
            id="amount"
            value={amount === 0 ? '' : amount}
            onChange={(e) => {
                const newValue = Number(e.target.value);
                if (!isNaN(newValue)) {
                  setAmount(newValue);
                }
              }}
            className="border p-2 w-full"
            required
            min="1"
          />
        </label>
        <label className="block mb-2" htmlFor="paymentMethod">
          Metode Pembayaran:
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="">Pilih Metode Pembayaran</option>
            <option value="langsung">Langsung</option>
            <option value="transfer">Transfer Bank</option>
            <option value="credit_card">Kartu Kredit</option>
          </select>
        </label>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-indigo-600 text-white rounded-md hover:bg-indigo-500 px-4 py-2"
        >
          Donasi Sekarang
        </button>
      </form>
    </div>
  );
};

export default Donation;
