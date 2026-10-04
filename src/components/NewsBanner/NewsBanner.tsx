import styles from "./styles.module.css";
import { formatTimeAgo } from "../../helpers/formatTimeAgo";
import Image from "../Image/Image";

export interface INewsItem {
 id: string;
 title: string;
 description: string;
 author: string;
 image?: string;
 language: string;
 published: string;
 url: string;
}

export interface NewsBannerProps {
 item: INewsItem;
}

const NewsBanner = ({ item }: NewsBannerProps) => {
 return (
  <div className={styles.banner}>
   <Image src={item.image} />
   <h1 className={styles.title}>{item.title}</h1>
      <p className={styles.extra}>{formatTimeAgo(item.published)} by {item.author}</p> 
      <p>{item.description}</p>
  </div>
 );
};

export default NewsBanner;
