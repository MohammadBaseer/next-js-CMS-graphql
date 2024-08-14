"use client";

import Link from "next/link";
import styles from "./VideoBlogs.module.scss"; // Adjust the path as necessary
import { useSuspenseQuery } from "@apollo/client";
import { GetAllVideoBlogsTypes } from "@/types/customTypes/VideoCustomTypes";
import { VIDEO_BLOG_CONTEXT } from "@/queries/videoBlogContextQuery";
import getYouTubeID from "get-youtube-id";

export default function VideoBlogs() {
  const { data, error } = useSuspenseQuery<GetAllVideoBlogsTypes>(VIDEO_BLOG_CONTEXT);

  if (error) {
    return <p>Error loading video blogs.</p>;
  }

  if (!data || !data.videoBlogContexts) {
    return <p>Loading...</p>;
  }

  return (
    <section className={styles.videoBlogs}>
      <h1 className={styles.title}>Our Latest Video Blogs</h1>
      <div className={styles.videoGrid}>
        {data.videoBlogContexts.map((post) => {
          const videoId = getYouTubeID(post.url);
          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

          return (
            <div key={post._id} className={styles.videoCard}>
              <Link href={`/video_blogs/${post._id}`}>
                <div className={styles.thumbnailWrapper}>
                  <img src={thumbnailUrl} alt={post.title} className={styles.videoImage} />
                  <div className={styles.playButton}></div>
                </div>
              </Link>
              <h2 className={styles.videoTitle}>{post.title}</h2>
            </div>
          );
        })}
      </div>
    </section>
  );
}
