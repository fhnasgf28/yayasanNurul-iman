import React, { useState } from 'react';
import { PageLayout,  } from "../src/components";
import MyPage from '../src/components/DataSiswa/siswa';
import firebaseSdk from '../src/utils/firebase';

const DonationPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [phone, setPhone] = useState<string>('+6283823290281');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const WhatsappURL = `https://wa.me/${phone}?$text=Assalamualaikum,saya ${name} ingin melakukan donasi sebesar ${amount}.`;
    window.location.href = WhatsappURL;
  }

  return (
    <PageLayout>
      <MyPage></MyPage>
       <section className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-64">
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold">Nama:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-2 py-1 border" />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block font-bold">Jumlah Donasi:</label>
          <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-2 py-1 border" />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-bold">Nomor WhatsApp:</label>
          <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-2 py-1 border" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">Donasi</button>
      </form>
    </section>
    </PageLayout>
  );
};

export default DonationPage;
