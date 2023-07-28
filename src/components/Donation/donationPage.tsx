import React from 'react';
import { PageLayout } from "../../components";

const DonationPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">Donasi untuk Yayasan Nurul Iman</h1>
        <p className="mb-6 text-lg">
          Terima kasih atas kepedulian Anda untuk mendukung misi Yayasan Nurul Iman dalam membangun
          harapan dan mencerdaskan generasi. Donasi Anda akan digunakan untuk berbagai program
          pendidikan dan kemanusiaan yang kami selenggarakan.
        </p>
        <p className="mb-6 text-lg">
          Silakan pilih metode donasi yang Anda inginkan dan ikuti instruksi di bawah ini:
        </p>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">1. Transfer Bank</h2>
          <p className="mb-2">
            Nama Bank: Bank ABC
          </p>
          <p className="mb-2">
            Nama Penerima: Yayasan Nurul Iman
          </p>
          <p className="mb-2">
            Nomor Rekening: 1234-5678-9012
          </p>
          <p className="mb-2">
            Cabang: Jakarta
          </p>
          <p className="mb-4">
            Silakan transfer donasi Anda ke nomor rekening di atas, dan jangan lupa untuk mencantumkan
            "Donasi Yayasan Nurul Iman" pada keterangan transfer.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg mt-4">
          <h2 className="text-xl font-semibold mb-4">2. Donasi Online</h2>
          <p className="mb-2">
            Kami juga menyediakan layanan donasi online melalui platform pembayaran berikut:
          </p>
          <ul className="list-disc ml-6">
            <li className="mb-2">
              <a href="https://www.example-payment.com" className="text-blue-600 underline">
                Example Payment Gateway
              </a>
            </li>
            {/* Tambahkan platform pembayaran lainnya jika ada */}
          </ul>
          <p className="mt-4">
            Silakan klik link di atas untuk menuju ke platform pembayaran yang Anda pilih dan ikuti
            instruksi untuk proses donasi online.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default DonationPage;
