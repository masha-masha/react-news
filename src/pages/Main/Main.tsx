import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import NewsBanner from "../../components/NewsBanner/NewsBanner";
import NewsList from "../../components/NewsList/NewsList";
import Skeleton from "../../components/Skeleton/Skeleton";
import Pagination from "../../components/Pagination/Pagination";
import { getNews } from "../../api/apiNews";

const Main = () => {
 const [news, setNews] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [currentPage, setCurrentPage] = useState(1);
 const totalPages = 10;
 const pageSize = 10;

 useEffect(() => {
  const fetchNews = async () => {
   try {
    setIsLoading(true);
    const response = await getNews(currentPage, pageSize);
    if (response && response.news) {
     setNews(response.news);
    }
   } catch (error) {
    console.error("Ошибка", error);
   } finally {
    setIsLoading(false);
   }
  };

  fetchNews();
 }, [currentPage]);

 const handleNextPage = () => {
    if(currentPage < totalPages) {
        setCurrentPage(currentPage + 1)
    }
 }

  const handlePrevPage = () => {
    if(currentPage > 1) {
        setCurrentPage(currentPage - 1)
    }
 }

  const handlePageClick = (pageNumber : number) => {
   setCurrentPage(pageNumber)
 }
 return (
  <div className={styles.main}>
   {isLoading ? (
    <Skeleton count={1} type="banner" />
   ) : (
    news.length > 0 && <NewsBanner item={news[0]} />
   )}

  <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} handlePageClick={handlePageClick} currentPage={currentPage} totalPages={10}/>


   {isLoading ? <Skeleton count={10} type="item"/> : <NewsList news={news} />}

   <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} handlePageClick={handlePageClick} currentPage={currentPage} totalPages={10}/>
  </div>
 );
};

export default Main;
