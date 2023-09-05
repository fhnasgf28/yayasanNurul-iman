import React, { useState } from 'react';
import Donation from '../src/components/DataSiswa/donation';
import {
  PageLayout,
  Text,
  LinkTo,
  Image,
} from "../src/components";
// import Slider from '../src/components/Slider/index'
import ProgramYayasan from "../src/components/newsConten/program";

const DonationPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [phone, setPhone] = useState<string>('+6283823290281');

  const images = [
    '/images/iduladha.jpg'
    // Tambahkan URL gambar lainnya sesuai kebutuhan
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const WhatsappURL = `https://wa.me/${phone}?$text=Assalamualaikum,saya ${name} ingin melakukan donasi sebesar ${amount}.`;
    window.location.href = WhatsappURL;
  }
  return (
    <PageLayout>
      <ProgramYayasan/>
     <section className="container mx-auto p-4 px-3 pb-6 md:pt-6 pt-[60px]">
     <div>
      <h1 className="text-3xl font-semibold mb-4">Donasi Pembangunan Yayasan Nurul Iman</h1>
      <Donation />
    </div>
    </section>
    </PageLayout>
  );
};

export default DonationPage;
