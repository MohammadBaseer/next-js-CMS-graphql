"use client";

import Link from "next/link";
import styles from "./BlogDetail.module.scss"; // Adjust the path as necessary
import { useSuspenseQuery } from "@apollo/client";
import { GetSingleBlogContextType } from "@/types/customTypes/PostBlogCustomTypes";
import { GET_POST_CONTEXT_BY_ID } from "@/queries/postContextQuery";
import { useEffect } from "react";

type ParamsPropTypes = {
  params: {
    id: string;
  };
};

export default function BlogDetail({ params: { id } }: ParamsPropTypes) {
  const { data: fetchData } = useSuspenseQuery<GetSingleBlogContextType>(GET_POST_CONTEXT_BY_ID, {
    variables: {
      blogContextId: id,
    },
  });

  useEffect(() => {
    document.title = "Post Blog Add";
  }, []);

  return (
    <div className={styles.blogDetail}>
      <Link href="/blogs" className={styles.backLink}>
        ← Back to Blogs
      </Link>
      <h1 className={styles.title}>{fetchData.blogContext.title}</h1>
      <img src={fetchData.blogContext.photo.url} alt={fetchData.blogContext.title} className={styles.blogImage} />
      <p className={styles.content}>{fetchData.blogContext.description}</p>
    </div>
  );
}
