import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import NewsBanner from "../../components/NewsBanner/NewsBanner";
import NewsList from "../../components/NewsList/NewsList";
import Skeleton from "../../components/Skeleton/Skeleton";
import { getNews } from "../../api/apiNews";

const Main = () => {
 const [news, setNews] = useState([]);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const fetchNews = async () => {
   try {
    setIsLoading(true);
    const response = await getNews();
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
 }, []);

 return (
  <div className={styles.main}>
   {isLoading ? (
    <Skeleton count={1} type="banner" />
   ) : (
    news.length > 0 && <NewsBanner item={news[0]} />
   )}

   {isLoading ? <Skeleton count={10} type="item"/> : <NewsList news={news} />}
  </div>
 );
};

export default Main;
