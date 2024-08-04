"use client";
import Link from "next/link";
import styles from "./MediaContext.module.scss";
import { DELETEVIDECONTEXT, VIDEOBLOGCONTEXT } from "@/queries/videoBlogContextQuery";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { getClient } from "@/lib/client";
import { GetAllVideoBlogsTypes } from "@/types/customTypes/customTypes";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import { onError, onReady, opts, opts_small_size } from "@/util/YoutubeIDContext/YoutubeVideoOptionCustomFunction";
import { useEffect } from "react";

const MediaPost = () => {
  const { data, error, refetch } = useSuspenseQuery<GetAllVideoBlogsTypes>(VIDEOBLOGCONTEXT);
  //!
  console.log(":::::::::::::", data.videoBlogContexts.length);
  const [deleteVideContext, { error: GraphQLError, loading }] = useMutation(DELETEVIDECONTEXT);

  const deleteVideoBlogHandler = (id: string) => async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    try {
      await deleteVideContext({
        variables: {
          deleteVideoContextId: id,
        },
      });
      refetch();
      // Handle success, e.g., update state or show a notification
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Failed to delete video context", error);
    }
  };

  // useEffect(() => {
  //   refetch();
  // }, []);

  return (
    <div className={styles.main}>
      <div className={styles.page_title}>
        <p>
          <span className="pi pi-home">&nbsp;</span>
          <Link href={"/home"} className={styles.title_href}>
            Home
          </Link>
          /Context/Media Context
        </p>
      </div>

      <div className={styles.post_context_table_box}>
        <h1>Video Context List</h1>

        <div className={styles.add_button}>
          <Link href={"/mediacontext/addnewvideo"} className={styles.button}>
            <span className="pi pi-plus">&nbsp;</span>Add New Video
          </Link>
        </div>

        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>#</th>
              <th className={styles.th}>Video</th>
              <th className={styles.th}>Title</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {data?.videoBlogContexts.map((video, index) => {
              return (
                <tr className={styles.tr} key={index}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>
                    <div className={styles.image}>{<YouTube videoId={getYouTubeID(video.url)} opts={opts_small_size} onReady={onReady} onError={onError} />}</div>
                  </td>
                  <td className={styles.td}>{video.title}</td>
                  <td className={styles.td}>20.5.2024</td>
                  <td className={styles.td}>
                    <Link href={`mediacontext/edit/${video.id}`} className={styles.ref}>
                      <i className={`pi pi-file-edit ${styles.edit_icon}`}> </i>
                    </Link>
                    &nbsp;
                    <Link href={`mediacontext/edit=${video.id}`} className={styles.ref} onClick={deleteVideoBlogHandler(video.id)}>
                      <i className={`pi pi-trash ${styles.delete_icon}`}></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {data.videoBlogContexts.length === 0 ? <h1>Not Found</h1> : ""}
      </div>
    </div>
  );
};

export default MediaPost;
