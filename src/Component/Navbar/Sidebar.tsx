import Link from "next/link";
import styles from "./Sidebar.module.scss";
import "primeicons/primeicons.css";

const Sidebar = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.navbar}>
        <h1>CMS</h1>
        <div className={styles.nav_elements}>
          <ul className={styles.ul_main}>
            <li className={styles.li_main}>
              <span className="pi pi-home">&nbsp;Dashboard</span>
            </li>
            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <Link href="home">
                  <span className="pi pi-angle-right">&nbsp;Home</span>
                </Link>
              </li>
            </ul>
            <li className={styles.li_main}>
              <span className="pi pi-book">&nbsp;Context</span>
            </li>
            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <Link href="postcontext">
                  <span className="pi pi-angle-right">&nbsp;Post Context</span>
                </Link>
                <Link href="mediacontext">
                  <span className="pi pi-angle-right">&nbsp;Media Context</span>
                </Link>
              </li>
            </ul>

            <li className={styles.li_main}>
              <span className="pi pi-cog">&nbsp;Rolls Config</span>
            </li>

            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <Link href="/messages">
                  <span className="pi pi-angle-right">&nbsp;Rolls</span>
                </Link>
              </li>
            </ul>

            <li className={styles.li_main}>
              <Link href="/settings">
                <span className="pi pi-cog">&nbsp;Settings</span>
              </Link>
            </li>

            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <Link href="/users">
                  <span className="pi pi-angle-right">&nbsp;Users</span>
                </Link>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
