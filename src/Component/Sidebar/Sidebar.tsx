"use client";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
import "primeicons/primeicons.css";
import withAuth from "../RoutesProtect/withAuth";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const Sidebar = () => {
  const { userProfile } = useContext(AuthContext);
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
                <Link className={styles.link} href="/home">
                  <span className="pi pi-angle-right">&nbsp;Home</span>
                </Link>
              </li>
            </ul>
            <li className={styles.li_main}>
              <span className="pi pi-book">&nbsp;Context</span>
            </li>
            <ul className={styles.ul_sub}>
              <li className={styles.li_sub}>
                <Link className={styles.link} href="/blogcontext">
                  <span className="pi pi-angle-right">&nbsp;Blog Context</span>
                </Link>
                <Link className={styles.link} href="/mediacontext">
                  <span className="pi pi-angle-right">&nbsp;Media Context</span>
                </Link>
              </li>
            </ul>

            {userProfile.role === "Admin" ? (
              <>
                <li className={styles.li_main}>
                  <span className="pi pi-cog">&nbsp;Roles Config</span>
                </li>

                <ul className={styles.ul_sub}>
                  <li className={styles.li_sub}>
                    <Link className={styles.link} href="/role_Config">
                      <span className="pi pi-angle-right">&nbsp;Roles</span>
                    </Link>
                  </li>
                </ul>

                <li className={styles.li_main}>
                  <span className="pi">
                    <i className="pi pi-spin pi-cog"></i>&nbsp;Settings
                  </span>
                </li>

                <ul className={styles.ul_sub}>
                  <li className={styles.li_sub}>
                    <Link className={styles.link} href="/users">
                      <span className="pi pi-angle-right">&nbsp;Users</span>
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Sidebar);
