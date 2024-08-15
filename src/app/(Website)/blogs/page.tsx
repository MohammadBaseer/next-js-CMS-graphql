"use client";
import styles from "./Blogs.module.scss";
import { GET_POST_CONTEXT } from "@/queries/postContextQuery";
import { VIDEO_BLOG_CONTEXT } from "@/queries/videoBlogContextQuery";
import { GetAllBlogContextType } from "@/types/customTypes/PostBlogCustomTypes";
import { GetAllVideoBlogsTypes } from "@/types/customTypes/VideoCustomTypes";
import { useSuspenseQuery } from "@apollo/client";
import getYouTubeID from "get-youtube-id";

const Blogs = () => {
  const { data } = useSuspenseQuery<GetAllBlogContextType>(GET_POST_CONTEXT);

  const { data: videoBlog, error } = useSuspenseQuery<GetAllVideoBlogsTypes>(VIDEO_BLOG_CONTEXT);

  return (
    <>
      {/* <section className={styles.blogs}>
        <h1 className={styles.title}>Our Latest Blogs</h1>
        <div className={styles.blogGrid}>
          {data.blogContexts.map((post, index) => (
            <div className={styles.blogCard} key={index}>
              <img src={post.photo.url} alt={post.title} className={styles.blogImage} />
              <Link href={`/blogs/${post._id}`} key={post._id} passHref>
                <h2 className={styles.blogTitle}>{post.title}</h2>
              </Link>
              <p className={styles.blogDescription}>{post.description}</p>
              <div className={styles.likeContainer}>
                <button className={styles.likeButton}>❤️ </button>
              </div>
            </div>
          ))}
        </div>
      </section> */}
      <hr />

      <h1 className={styles.title}>Our Latest Blogs</h1>
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
                    <button>
                      <span className="Like_icon"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sidebar_blogs_news}>
          {/* {videoBlog.videoBlogContexts.map((video, index) => {
            const videoId = getYouTubeID(video.url);
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            return (
              <div className={styles.blog_item} key={index}>
                <div className={styles.blog_image}>
                  <img className={styles.news_image} src={thumbnailUrl} alt={thumbnailUrl} />
                </div>
                <div className={styles.blog_context}>
                  <div className={styles.title_box}>
                    <div className={styles.title}>
                      <h3>{video.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </>
  );
};

export default Blogs;
