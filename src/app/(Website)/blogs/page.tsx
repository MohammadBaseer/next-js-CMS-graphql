import { useState } from "react";
import styles from "./Blogs.module.scss";
import Link from "next/link";
import { getClient, query } from "@/lib/client";
import { GET_POST_CONTEXT } from "@/queries/postContextQuery";
import { GetAllBlogContextType } from "@/types/customTypes/PostBlogCustomTypes";

const Blogs = async () => {
  const { data, loading, error } = await getClient().query<GetAllBlogContextType>({ query: GET_POST_CONTEXT });

  return (
    <section className={styles.blogs}>
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
    </section>
  );
};

export default Blogs;
