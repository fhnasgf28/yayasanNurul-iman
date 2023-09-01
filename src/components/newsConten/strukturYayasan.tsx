import React, { useState } from 'react';
import {
  PageLayout,
  Text,
  LinkTo,
  Image,
} from "../../components";
// import Slider from '../src/components/Slider/index'

interface MemberCardProps {
    name: string;
    photoSrc: string;
    jabatan: string;
}
const StrukturYayasan: React.FC<MemberCardProps> = ({name, photoSrc, jabatan}) => {
    
  return (
      <section id="blog" className="bg-slate-100 pt-4 pb-4 dark:bg-dark">
      <div className="container">
            <div className="mb-4 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800 transform transition-transform hover:-translate-y-1 hover:shadow-xl">
              <Image src={photoSrc} alt="Farhan Assegaf" className="w-full h-40 object-cover" />
              <div className="py-4 px-6">
                <h2 className="font-medium mb-2 text-center">{jabatan}</h2>
                <p className="mb-4 text-center text-base font-medium text-secondary">{name}</p>
              </div>
            </div>
      </div>
    </section>
  );
};

export default StrukturYayasan;
