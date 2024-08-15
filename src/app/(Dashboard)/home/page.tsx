"use client";
import withAuth from "@/Component/RoutesProtect/withAuth";
import styles from "./Home.module.scss";
import { useSuspenseQuery } from "@apollo/client";
import { GetAllUsersType } from "@/types/customTypes/UsersCustomTypes";
import { GetAllBlogContextType } from "@/types/customTypes/PostBlogCustomTypes";
import { GetAllVideoBlogsTypes } from "@/types/customTypes/VideoCustomTypes";
import { GET_USERS } from "@/queries/userQuery";
import { GET_POST_CONTEXT } from "@/queries/postContextQuery";
import { VIDEO_BLOG_CONTEXT } from "@/queries/videoBlogContextQuery";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const HomePage = () => {
  const { userProfile } = useContext(AuthContext);

  const { data: users } = useSuspenseQuery<GetAllUsersType>(GET_USERS);
  const { data: post } = useSuspenseQuery<GetAllBlogContextType>(GET_POST_CONTEXT);
  const { data: videos } = useSuspenseQuery<GetAllVideoBlogsTypes>(VIDEO_BLOG_CONTEXT);

  const usersCount1 = users.users.filter((users) => users.role === "Admin").length;
  const usersCount2 = users.users.filter((users) => users.role === "Editor").length;
  const usersCount3 = users.users.filter((users) => users.role === "User").length;

  const allPost = post.blogContexts.length;
  const myPost = post.blogContexts.filter((post) => post.createdBy.id === userProfile.id).length;

  const allVideo = videos.videoBlogContexts.length;
  const myVideo = videos.videoBlogContexts.filter((video) => video.createdBy.id === userProfile.id).length;

  return (
    <div className={styles.main}>
      <div className={styles.containerBox}>
        {userProfile.role === "Admin" ? (
          <div className={styles.users}>
            <div className={styles.userType}>
              <p className={styles.count}>
                <span className="pi pi-user"></span> Admins: {usersCount1}
              </p>
            </div>
            <div className={styles.userType}>
              <p className={styles.count}>
                <span className="pi pi-user"></span> Editors: {usersCount2}
              </p>
            </div>
            <div className={styles.userType}>
              <p className={styles.count}>
                <span className="pi pi-user"></span> Other Users: {usersCount3}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={styles.blogs}>
          <p className={styles.blogCount}>
            <span className="pi pi-images"></span> Blogs: {userProfile.role === "Admin" ? allPost : myPost}
          </p>
        </div>
        <div className={styles.videoBlogs}>
          <span className="pi pi-youtube"></span>
          <p className={styles.videoCount}>
            <span className="pi pi-youtube"></span> Video Blogs: {userProfile.role === "Admin" ? allVideo : myVideo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(HomePage);
