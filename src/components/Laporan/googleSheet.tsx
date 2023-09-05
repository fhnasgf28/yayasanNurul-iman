// Contoh komponen Next.js
import React from 'react';

const GoogleSheetsEmbed = () => {
  return (
    <div className="max-w-10xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Laporan Keuangan</h2>
      <div className=" bg-white p-4 rounded-lg shadow-md">
        <div className="aspect-w-16 aspect-h-9 w-full h-full ">
      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTNFEm6ip1OWDF-8iV-cc1M_yOFMc8zfHla_ugasADJPe259pTeDOG07ulNJFbXdp6wxnF1dNM_KDe6/pubhtml?widget=true&amp;headers=false"
        width="100%"  // Sesuaikan dengan lebar yang Anda inginkan
        height="500px" // Sesuaikan dengan tinggi yang Anda inginkan
        frameBorder="0"
        allowFullScreen
        className='overflow-x-auto'
      ></iframe>
            </div>
        </div>
    </div>
  );
};

export default GoogleSheetsEmbed;
