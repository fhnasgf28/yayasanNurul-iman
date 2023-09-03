import Image from "../ArticleImage";
import React from 'react';
import Separator from '../Seperator';

interface Card {
    // mendifinisikan struktur data card sesuai dengan kebutuhan

    title : string;
    description: string;
    imageSrc: string;
}

interface CardListProps {
    data: Card[];
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  return (
    <div className="flex flex-wrap -mx-4">
      {data.map((card, index) => (
        <div key={index} className="w-full sm:w-1/2 px-4 lg:w-1/5 xl:w-1/3">
          <div className="mb-10 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800 transform transition-transform hover:-translate-y-1 hover:shadow-xl">
            <Image src={card.imageSrc} alt={card.title} className="w-full"  // Sesuaikan dengan lebar gambar asli
            />
            <div className="py-8 px-6">
              <h2 className="mb-3 block overflow-hidden text-xl font-semibold text-dark hover:text-primary dark:text-white">
                  {card.title}
              </h2>
              <p className="mb-4 text-base font-medium text-secondary">{card.description}</p>
            </div>
          </div>
        </div>
      ))}
      <Separator/>
    </div>
  );
};

export default CardList;
