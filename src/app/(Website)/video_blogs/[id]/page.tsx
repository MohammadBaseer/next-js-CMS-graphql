"use client";

import { useSuspenseQuery } from "@apollo/client";
import Link from "next/link";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import styles from "./VideoDetail.module.scss"; // Adjust the path as necessary
import { GetSingleVideoBlogType } from "@/types/customTypes/VideoCustomTypes";
import { GET_VIDEO_BLOG_BY_ID } from "@/queries/videoBlogContextQuery";
import { useEffect } from "react";

type ParamsType = {
  params: {
    id: string;
  };
};

export default function VideoDetail({ params: { id } }: ParamsType) {
  const { data } = useSuspenseQuery<GetSingleVideoBlogType>(GET_VIDEO_BLOG_BY_ID, {
    variables: {
      videoId: id,
    },
  });

  const videoUrl = data.videoBlogContext.url;
  const youtubeId = getYouTubeID(videoUrl);

  useEffect(() => {
    document.title = "Video Blogs Add";
  }, []);

  return (
    <div className={styles.videoDetail}>
      <Link href="/video_blogs" className={styles.backLink}>
        ← Back to Video Blogs
      </Link>
      <h1 className={styles.title}>{data.videoBlogContext.title}</h1>

      {youtubeId ? (
        <YouTube videoId={youtubeId} className={styles.videoPlayer} />
      ) : (
        <video className={styles.videoPlayer} controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
