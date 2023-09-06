// tutorial.js
import React, { useState } from 'react';
import TambahBerita from './tambahBerita';
import TambahSejarah from './sejarahYayasan';


const Tutorial = () => {
  const [berita, setBerita] = useState([]);
  const [sejarah, setSejarah] = useState([]);

  const tambahBerita = (beritaBaru) => {
    setBerita([...berita, beritaBaru]);
  };

  const tambahSejarah = (beritaBaru) => {
    setBerita([...berita, beritaBaru]);
  };

  return (
    <div>
    <div className='container'>
      <TambahBerita tambahBerita={tambahBerita} />
    </div>

    <div className='container'>
      <TambahSejarah tambahBerita={tambahBerita} />
    </div>
    </div>
  );
};

export default Tutorial;
