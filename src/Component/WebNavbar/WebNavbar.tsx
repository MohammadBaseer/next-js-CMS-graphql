"use client";
import Link from "next/link";
import styles from "./WebNavbar.module.scss";
import { useContext, useState } from "react";

import "primeicons/primeicons.css";
import { AuthContext } from "@/context/authContext";

const WebNavbar = () => {
  const { userProfile, logOutUser } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);
  const [profileNavbarToggle, setProfileNavbarToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const toggle = () => {
    if (profileNavbarToggle) {
      setProfileNavbarToggle(false);
    } else {
      setProfileNavbarToggle(true);
    }
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="#">Logo</Link>
        </div>
        <ul className={`${styles.navLinks} ${isActive ? styles.active : ""}`}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          <li>
            <Link href="/video_blogs">Video Blog</Link>
          </li>
          {/* <li>
            <Link href="/contact">Contact</Link>
          </li> */}
        </ul>
        <div>
          <div className={styles.box_2}>
            {userProfile ? (
              <div className={styles.profile_image_box}>
                <img className={styles.profile_image} src={userProfile?.avatar} alt="" onClick={toggle} />

                <div className={styles.user_tab_navbar_element_box} style={profileNavbarToggle === true ? { display: "block" } : { display: "none" }}>
                  <div className={styles.user_tab_navbar_element}>
                    <img className={styles.user_photo} src="" alt="" onClick={toggle} />
                  </div>

                  <div className={styles.user_tab_navbar_element}>
                    <Link className={styles.href} href="/profile" onClick={toggle}>
                      <span className="pi pi-user"> My Profile</span>
                    </Link>
                  </div>
                  <div className={styles.user_tab_navbar_element}>
                    <Link className={styles.href} href="/home">
                      {" "}
                      <span className="pi pi-shop"> Dashboard</span>{" "}
                    </Link>
                  </div>
                  {/* <div className={styles.user_tab_navbar_element}>
                      <Link className={styles.href} href="/register">
                        <span className="pi pi-cog"> Settings</span>
                      </Link>
                    </div> */}
                  <div className={styles.user_tab_navbar_element}>
                    <Link className={styles.href} href="#" onClick={logOutUser}>
                      <span className="pi pi-sign-out"> Logout</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                {" "}
                <Link href={"/login"}>
                  <span className={`pi pi-user ${styles.pi}`}></span>
                </Link>
              </div>
            )}
            <div className={`${styles.hamburger} ${isActive ? styles.toggle : ""}`} onClick={handleToggle}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default WebNavbar;
