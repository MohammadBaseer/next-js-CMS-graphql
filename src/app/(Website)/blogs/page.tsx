"use client";
import styles from "./Blogs.module.scss";
import { GET_POST_CONTEXT } from "@/queries/postContextQuery";
import { VIDEO_BLOG_CONTEXT } from "@/queries/videoBlogContextQuery";
import { GetAllBlogContextType } from "@/types/customTypes/PostBlogCustomTypes";
import { GetAllVideoBlogsTypes } from "@/types/customTypes/VideoCustomTypes";
import { useSuspenseQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect } from "react";

const Blogs = () => {
  const { data } = useSuspenseQuery<GetAllBlogContextType>(GET_POST_CONTEXT);

  const { data: videoBlog, error } = useSuspenseQuery<GetAllVideoBlogsTypes>(VIDEO_BLOG_CONTEXT);

  useEffect(() => {
    document.title = "Post Blogs";
  }, []);
  return (
    <>
      <div className={styles.blog} style={{ textAlign: "center" }}>
        <h1 className={styles.title}>Our Latest Blogs</h1>
      </div>
      <div className={styles.main_container}>
        <div className={styles.blogs_container}>
          {data.blogContexts.map((post, index) => (
            <div className={styles.blog_item} key={index}>
              <div className={styles.blog_image}>
                <img className={styles.blog_image} src={post.photo.url} alt={post.photo.url} />
              </div>
              <div className={styles.blog_context}>
                <div className={styles.title_box}>
                  <div className={styles.title}>
                    <h3>{post.title}</h3>
                  </div>
                  <div className={styles.description}>
                    <p>{post.description.slice(0, 190) + "..."}</p>
                  </div>
                  <div className={styles.button}>
                    <Link href={`/blogs/${post._id}`}>
                      <span className="Like_icon">More</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sidebar_blogs_news}></div>
      </div>
    </>
  );
};

export default Blogs;
