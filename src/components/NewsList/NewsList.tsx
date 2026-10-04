import styles from "./styles.module.css";
import type { INewsItem } from "../NewsBanner/NewsBanner";
import NewsItem from "../NewsItem/NewsItem";

interface NewsListProps {
    news: INewsItem[]
}

const NewsList = ({ news }: NewsListProps) => {
 return <ul className={styles.list}>
    {news.map((item) => <NewsItem key={item.id} item={item}/>)}
 </ul>;
};

export default NewsList;
