import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.lds_ripple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
