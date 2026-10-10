import styles from "./styles.module.css";

type Type = "banner" | "item";

export interface SkeletonProps {
 count: number;
 type: Type;
}

const Skeleton = ({ count = 1, type = "banner" }: SkeletonProps) => {
 return (
  <>
   {count > 1 ? (
    <ul>
     {[...Array(count)].map((_, index) => (
      <li
       key={index}
       className={type === "banner" ? `${styles.banner} ${styles.common}` : `${styles.item} ${styles.common}`}
      ></li>
     ))}
    </ul>
   ) : (
    <div className={type === "banner" ? `${styles.banner} ${styles.common}` : `${styles.item} ${styles.common}`}></div>
   )}
  </>
 );
};

export default Skeleton;
