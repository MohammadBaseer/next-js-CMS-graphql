"use client";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
import "primeicons/primeicons.css";
import withAuth from "../RoutesProtect/withAuth";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { useSuspenseQuery } from "@apollo/client";
import { GetSingleUsersType } from "@/types/customTypes/UsersCustomTypes";
import { GET_USERS_BY_ID } from "@/queries/userQuery";

const Sidebar = () => {
  const { userProfile } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);

  const { data: userData } = useSuspenseQuery<GetSingleUsersType>(GET_USERS_BY_ID, {
    variables: {
      userId: userProfile.id,
    },
  });
  const userRole = userData.user.role;

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={`${styles.hamburger} ${isActive ? styles.toggle : ""}`} onClick={handleToggle} style={isActive ? { position: "absolute", left: "155px", top: "10px" } : { position: "absolute", left: "5px", top: "10px" }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.main_container} style={isActive === true ? { display: "block" } : {}}>
        <div className={styles.navbar}>
          <h1 style={{ borderBottom: "solid" }}>CMS</h1>
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

              {userRole === "Admin" ? (
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
    </>
  );
};

export default withAuth(Sidebar);
