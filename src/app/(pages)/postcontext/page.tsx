import styles from "./PostContext.module.scss";

const PostContext = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Post Content</h1>
      </div>
    </div>
  );
};

export default PostContext;
