import { useState } from "react";
import styles from "./styles.module.css";

interface ImageProps {
  src?: string;
  alt?: string;
}

const Image = ({ src, alt = "news" }: ImageProps) => {
  const [hasError, setHasError] = useState(false);


  if (!src || hasError) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.placeholder}>
          <span>📷 Нет фото</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <img
        src={src}
        alt={alt}
        className={styles.image}
        loading="lazy"
        onError={() => setHasError(true)} // Переключаем стейт при битой картинке
      />
    </div>
  );
};

export default Image;