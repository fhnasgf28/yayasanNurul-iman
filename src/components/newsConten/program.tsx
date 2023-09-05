import React, { useState } from 'react';
import CardList from '../ArticleCards/cardList';
import { cards, Card} from "../ArticleCards/cards";
import {
  PageLayout,
  Text,
  LinkTo,
  Image,
} from "../../components";
import { kemanusiaanCard } from '../ArticleCards/kemanusiaan';
import { keagamaan } from '../ArticleCards/keagamaan';
// import Slider from '../src/components/Slider/index'

const ProgramYayasan: React.FC = () => {
  return (
      <section id="blog" className="bg-slate-100 pt-20 pb-24 dark:bg-dark">
      <div className="container">
        <div className="w-full px-4">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <h6 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl lg:text-5xl">Program Yayasan</h6>
            <h3 className="text-md font-medium text-secondary md:text-lg">Program Umum</h3>
          </div>
        </div>
        <h3 className="text-md pb-4 font-medium text-secondary md:text-lg">Bidang Pendidikan Sosial</h3>
          <CardList data={cards}/>
        <h3 className="text-md pb-4 font-medium text-secondary md:text-lg">Bidang Kemanusiaan</h3>
        <CardList data={kemanusiaanCard}/>
        <h3 className="text-md pb-4 font-medium text-secondary md:text-lg">Bidang Keagamaan</h3>
        <CardList data={keagamaan}/>
        </div>
    </section>
  );
};

export default ProgramYayasan;
