// tutorial.js
import React, { useState } from 'react';
import TambahBerita from './tambahBerita';


const Tutorial = () => {
  const [berita, setBerita] = useState([]);
  const [sejarah, setSejarah] = useState([]);

  const tambahBerita = (beritaBaru) => {
    setBerita([...berita, beritaBaru]);
  };

  return (
    <div>
    <div className='container'>
      <TambahBerita tambahBerita={tambahBerita} />
    </div>
    </div>
  );
};

export default Tutorial;
