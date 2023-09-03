import React from 'react';

const GoogleMap = () => (
  <div className='mx-auto text-center'>
    <h2 className='text-2xl font-semibold mb-2'>Lokasi Kami</h2>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5198977272457!2d107.30602667453255!3d-6.326605661904802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6976347b7c0b49%3A0x31809b5844f365ba!2sMasjid%20Nurul%20Iman!5e0!3m2!1sid!2sid!4v1693713053687!5m2!1sid!2sid"
      width="800"
      height="300"
      className="mx-auto"
      style={{
        border: '2px solid #007BFF',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        background: '#f2f2f2',
      }}
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen={true}
      loading="lazy"
    ></iframe>
  </div>
);

export default GoogleMap;
