import styles from "./styles.module.css";
import { formatTimeAgo } from "../../helpers/formatTimeAgo";
import type { INewsItem } from "../NewsBanner/NewsBanner";

export interface NewsItemProps {
 item: INewsItem;
}
const NewsItem = ({ item }: NewsItemProps) => {
 return (
  <li className={styles.banner}>
   <div className={styles.wrapper} style={{ backgroundImage: `url(${item.image})`}}>
   </div>
   <div className={styles.info}>
    <h3 className={styles.title}>{item.title}</h3>
    <p className={styles.extra}>
     {formatTimeAgo(item.published)} by {item.author}
    </p>
   </div>
  </li>
 );
};

export default NewsItem;
