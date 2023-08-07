import React from "react";
import Image from "../ArticleImage";

interface Article {
    title: string;
    imageUrl: string;
    content: string;
  }
  
  const NewsContent: React.FC<{ article: Article }> = ({ article }) => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
        <Image src={article.imageUrl} alt={article.title} className="mb-4" />
        <p className="text-gray-600">{article.content}</p>
      </div>
    );
  };
  
  export default NewsContent;
  