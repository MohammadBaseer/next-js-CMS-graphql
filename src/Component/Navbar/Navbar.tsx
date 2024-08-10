"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";

const Navbar = () => {
  const { userProfile, logOutUser } = useContext(AuthContext);
  const [profileNavbarToggle, setProfileNavbarToggle] = useState<boolean>(false);

  const toggle = () => {
    if (profileNavbarToggle) {
      setProfileNavbarToggle(false);
    } else {
      setProfileNavbarToggle(true);
    }
  };

  return (
    <div className={styles.navbar_main}>
      {userProfile ? (
        <div className={styles.nav_container}>
          <div className={styles.box_1}>
            <h3>{userProfile.username}</h3>
          </div>

          <div className={styles.box_2}>
            <div className=""></div>

            <div className={styles.profile_image_box}>
              <img className={styles.profile_image} src={userProfile.avatar} alt="" onClick={toggle} />

              <div className={styles.user_tab_navbar_element_box} style={profileNavbarToggle === true ? { display: "block" } : { display: "none" }}>
                <div className={styles.user_tab_navbar_element}>
                  <img className={styles.user_photo} src="" alt="" onClick={toggle} />
                </div>

                <div className={styles.user_tab_navbar_element}>
                  <Link className={styles.href} href="/">
                    <span className="pi pi-user"> My Profile</span>
                  </Link>
                </div>
                {/* <div className={styles.user_tab_navbar_element}>
                <Link className={styles.href} href="/dashboard">
                  {" "}
                  <span className="pi pi-shop"> Admin Panel</span>{" "}
                </Link>
              </div> */}
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
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
