import withAuth from "@/Component/RoutesProtect/withAuth";
import styles from "./Setting.module.scss";

const Settings = () => {
  return (
    <div className={styles.main}>
      <h1>Settings</h1>
    </div>
  );
};

export default withAuth(Settings);
