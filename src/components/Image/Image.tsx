import styles from "./styles.module.css";

interface ImageProps {
  src?: string;
  alt?: string;
}

const Image = ({ src, alt = "news" }: ImageProps) => {
  return (
    <div className={styles.wrapper}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} loading="lazy" />
      ) : (
        <div className={styles.placeholder}>Нет изображения</div>
      )}
    </div>
  );
};

export default Image;
