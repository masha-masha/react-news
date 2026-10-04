import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import NewsBanner from "../../components/NewsBanner/NewsBanner";
import NewsList from "../../components/NewsList/NewsList";
import { getNews } from "../../api/apiNews";

const Main = () => {

  const [news, setNews] = useState([])
 useEffect(() => {
  const fetchNews = async () => {
   try {
    const response = await getNews();
    setNews(response.news)
   } catch (error) {
    console.log(error);
   }
  };
  fetchNews();
 }, []);

 return (
  <div className={styles.main}>
   {news.length > 0 ? <NewsBanner item={news[0]}/> : null}
   {news.length > 0 ? <NewsList news={news}/> : null}
  </div>
 );
};

export default Main;
