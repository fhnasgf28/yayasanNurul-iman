import React, { useState } from 'react';
import { PageLayout } from "../src/components";

const DonationPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [phone, setPhone] = useState<string>('083823290281');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const WhatsappURL = `https://wa.me/${phone}?$text=Assalamualaikum, saya ${name} ingin melakukan donasi sebesar ${amount}.`;
    window.location.href = WhatsappURL;
  }

  return (
    <PageLayout>
     <form onSubmit={handleSubmit}>
      <label>
        Nama:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Jumlah Donasi:
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label>
        Nomor WhatsApp:
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <button type="submit">Donasi</button>
    </form>
    </PageLayout>
  );
};

export default DonationPage;
