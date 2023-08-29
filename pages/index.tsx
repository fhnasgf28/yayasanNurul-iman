/**These are necessary imports / components for the page */
import { PageLayout, Text, List,LinkTo } from "../src/components";
import { ListType } from "../src/shared/enums";
import React, { useEffect, useRef, useState } from 'react';
import ArticleCard from '../src/components/ArticleCards/ArticleCard';
import { SORTED_ARTICLES_BY_DATE } from '../BLOG_CONSTANTS/_ARTICLES_LIST';
import Link from 'next/link';
import { DEFAULT_SEO } from "../BLOG_CONSTANTS/_BLOG_SETUP";
import FeaturedArticleSection from "../src/components/Misc/FeaturedArticleSection";
import HomeNonFeatureArticles from "../src/components/Misc/HomeNonFeatureAricles";
import Image from "../src/components/ArticleImage";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProgramYayasan from "../src/components/newsConten/program";
import VisiMisi from "../src/components/VisiMisi/visiMisi"

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,         // Aktifkan penggeseran otomatis
    autoplaySpeed: 3000,
  };

  return (
    <PageLayout home PAGE_SEO={DEFAULT_SEO}>
    
    <section className="relative container mx-auto px-4 sm:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
     
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">Yayasan Nurul Iman <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Singaperbangsa</span></h1>
            <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
              Lembaga ini didirikan di atas pondasi kepedulian dan semangat keberpihakan terhadap masa depan pendidikan{""}
              <span className="text-primary font-bold">"Membangun Harapan, Mencerdaskan Generasi"</span>
            </p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
              <div>
              <Link href="/donationPage" >
                <a className="inline-block py-3 px-6 bg-gradient-to-r from-blue-600 to-teal-400 rounded-md shadow-lg text-white font-semibold text-lg hover:from-blue-800 hover:to-teal-600 hover:text-opacity-100 hover:text-shadow-md transition duration-300">
                  Donasi Pembangunan
                </a>
              </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <Slider {...settings} className="container px-6 py-8">
        <div className="bg-gray-100 h-50 rounded-lg overflow-hidden">
          <Image
            src="/images/yayasanContoh.jpg"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="bg-gray-100 h-50 rounded-lg overflow-hidden">
          <Image
            src="/images/yayasanContoh.jpg"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-gray-100 h-50 rounded-lg overflow-hidden">
          <Image
            src="/images/yayasanContoh.jpg"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </div>
      </Slider>
      <VisiMisi/>

        <ProgramYayasan/>

    </section>
      <div className="container mx-auto lg:px-[15px] px-0">
        <div className={'flex flex-wrap'}>
          <FeaturedArticleSection />
          <h1 className='px-3 w-full mb-5 text-xl md:text-3xl font-medium'>Cek Berita Lainnya</h1>
          <hr className='border-1 mb-5 w-[98%] mx-auto' />
          <HomeNonFeatureArticles />
        </div>
      </div>
    </PageLayout>
  )
}

export default Home