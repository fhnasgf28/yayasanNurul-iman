import React, { useState } from 'react';
import {
  PageLayout,
  Text,
  LinkTo,
  Image,
} from "../../components";
// import Slider from '../src/components/Slider/index'

const ProgramYayasan: React.FC = () => {

  return (
      <section id="blog" className="bg-slate-100 pt-36 pb-32 dark:bg-dark">
      <div className="container">
        <div className="w-full px-4">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <h6 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl lg:text-5xl">Program Yayasan</h6>
            <p className="text-md font-medium text-secondary md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quisquam perspiciatis blanditiis dolores?</p>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2 xl:w-1/3">
            <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800 transform transition-transform hover:-translate-y-1 hover:shadow-xl">
              <Image src="/images/yayasan/sejarah1.jpg" alt="Programming" className="w-full" />
              <div className="py-8 px-6">
                <h3>
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Program Yayasan</a>
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
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Pembangunan TPQ </a>
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
                  <a href="#" className="mb-3 block truncate text-xl font-semibold text-dark hover:text-primary dark:text-white">Pengajian Mingguan</a>
                </h3>
                <p className="mb-6 text-base font-medium text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, totam ipsum ea quam sequi velit sunt.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramYayasan;
