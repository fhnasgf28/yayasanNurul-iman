import React, { useState } from 'react';
import Donation from '../src/components/DataSiswa/donation';
import {
  PageLayout,
  Text,
  LinkTo,
  Image,
} from "../src/components";
// import Slider from '../src/components/Slider/index'

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
     {/* <PencarianData></PencarianData> */}
      <section id="blog" className="bg-slate-100 pt-36 pb-32 dark:bg-dark">
      <div className="container">

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800 transform transition-transform hover:-translate-y-1 hover:shadow-xl">
              <Image src="/images/yayasan/sejarah1.jpg" alt="Programming" className="w-full" />
              <div className="py-8 px-6">
                <h3>
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Pengurus Yayasan</a>
                </h3>
                <p className="mb-6 text-base font-medium text-secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat officia beatae quisquam?</p>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800 transform transition-transform hover:-translate-y-1 hover:shadow-xl">
              <Image src="/images/yayasan/1 (2).jpg" alt="Mechanical Keyboard" className="w-full" />
              <div className="py-8 px-6">
                <h3>
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Pengajian Rutin </a>
                </h3>
                <p className="mb-6 text-base font-medium text-secondary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi facilis illum in.</p>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800 transform transition-transform hover:-translate-y-1 hover:shadow-xl">
              {/* <Image src="/images/yayasan/1 (1).jpg" alt="Coffee" className="w-full" /> */}
              <div className="py-8 px-6">
                <h3>
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Pembangunan TPQ</a>
                </h3>
                <p className="mb-6 text-base font-medium text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, totam ipsum ea quam sequi velit sunt.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
     <section className="container mx-auto p-4 px-3 pb-10 md:pt-20 pt-[80px]">
     <div>
      <h1 className="text-3xl font-semibold mb-4">Donasi Pembangunan Yayasan Nurul Iman</h1>
      <Donation />
    </div>
    </section>
    </PageLayout>
  );
};

export default DonationPage;
