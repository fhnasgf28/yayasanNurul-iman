import { useState } from "react";
import { combineClasses } from "../../utils/utils";
import classes from './Search.module.scss';
import SearchArticleCard from "../ArticleCards/SearchArticleCard";
import { SORTED_ARTICLES_BY_DATE } from '../../../BLOG_CONSTANTS/_ARTICLES_LIST';
import { MdOutlineClose } from "react-icons/md";

interface ISearch {
    closeSearch: () => void
}
// Algoritma sequential search
const sequentialSearch = (arr: string | any[], target: string) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].preview.tags.toLowerCase().indexOf(target.toLowerCase()) >= 0 ||
          arr[i].preview.articleTitle.toLowerCase().indexOf(target.toLowerCase()) >= 0) {
        return arr[i];
      }
    }
    return null;
  };

const Search = ({ closeSearch }: ISearch) => {
    const [searchStr, setSearchStr] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const handleSearch = () => {
        const results = sequentialSearch(SORTED_ARTICLES_BY_DATE, searchStr);
        setSearchResults(results ? [results] : []);
      };

    return (
        <div className={combineClasses('bg-slate-100 text-black dark:bg-slate-900 dark:text-white', classes?.search_container)}>
            <div className="container mx-auto">
                <div className="px-3">
                    <div className='flex justify-between items-center md:pt-10 pt-5'>
                        <h1 className={'text-[45px] font-bold'}>Search</h1>
                        <button name="search-button" aria-label="search button" type="button" className={classes.search_close_icon} onClick={closeSearch}>
                        <MdOutlineClose className='text-slate-800 dark:text-white text-4xl' />
                        </button>
                    </div>
                    <div className="mb-[40px] mt-3">
                        <input
                            className='text-[20px] w-full bg-inherit border-b border-gray-400 p-2 dark:text-white text-black'
                            placeholder="Enter keywords and seperate with commas"
                            value={searchStr}
                            onChange={(e) => setSearchStr(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                </div>

                {searchResults?.length > 0 && <div className='flex flex-wrap'>
                    {
                        searchResults?.map((article, i) => (
                        <SearchArticleCard article={article.preview} key={i} path={article.path} />
                        ))
                    }
                    </div>}

            </div>
        </div>
    )
};

export default Search;