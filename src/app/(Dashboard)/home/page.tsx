"use client";
import withAuth from "@/Component/RoutesProtect/withAuth";
import styles from "./Home.module.scss";

const HomePage = () => {
  return (
    <div className={styles.main}>
          <div className={styles.containerBox}>
      <div className={styles.users}>
        <div className={styles.userType}>
          
          <p className={styles.count}><span className="pi pi-user"></span> Admins: 3</p>
        </div>
        <div className={styles.userType}>
          
          <p className={styles.count}><span className="pi pi-user"></span> Editors: 39</p>
        </div>
        <div className={styles.userType}>
          
          <p className={styles.count}><span className="pi pi-user"></span> Other Users: 63</p>
        </div>
      </div>
      <div className={styles.blogs}>
        
        <p className={styles.blogCount}><span className="pi pi-images"></span> Blogs: 40</p>
      </div>
      <div className={styles.videoBlogs}>
        <span className="pi pi-youtube"></span>
        <p className={styles.videoCount}><span className="pi pi-youtube"></span> Video Blogs: 40</p>
      </div>
    </div>
    </div>
  );
};

export default withAuth(HomePage);
