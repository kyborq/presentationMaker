import Image from "../../assets/cat.png";
import styles from "./Empty.module.css";

type EmptyProps = {
  text?: string;
};

export const Empty = ({ text }: EmptyProps) => {
  return (
    <div className={styles.empty}>
      <img src={Image} className={styles.image} />
      <p className={styles.text}>{text}</p>
    </div>
  );
};
