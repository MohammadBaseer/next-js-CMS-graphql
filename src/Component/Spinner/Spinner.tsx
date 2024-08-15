import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div> {/* You can replace this with any loader */}
    </div>
  );
};

export default Spinner;
