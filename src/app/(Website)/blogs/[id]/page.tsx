"use client";

import Link from "next/link";
import styles from "./BlogDetail.module.scss"; // Adjust the path as necessary
import { useSuspenseQuery } from "@apollo/client";
import { GetSingleBlogContextType } from "@/types/customTypes/PostBlogCustomTypes";
import { GET_POST_CONTEXT_BY_ID } from "@/queries/postContextQuery";
import { useEffect } from "react";
import { useParams } from "next/navigation";

type ParamsPropTypes = {
  searchParams: {
    view: string;
  };
};

export default function BlogDetail() {
  // export default function BlogDetail({ searchParams: { view } }: ParamsPropTypes) {

  const params = useParams<{ id: string }>();
  const { id } = params;

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

      {/* <div className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>Comments</h2>
        <ul className={styles.commentsList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <strong>{comment.name}:</strong> {comment.content}
            </li>
          ))}
        </ul>

        <div className={styles.commentForm}>
          <textarea className={styles.commentInput} value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..."></textarea>
          <button className={styles.commentButton} onClick={handleAddComment}>
            Post Comment
          </button>
        </div>
      </div> */}
    </div>
  );
}
