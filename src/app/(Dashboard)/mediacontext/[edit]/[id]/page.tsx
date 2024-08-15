"use client";
import styles from "./EditVideo.module.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import YouTube from "react-youtube";
import { GetSingleVideoBlogType } from "@/types/customTypes/VideoCustomTypes";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { GET_VIDEO_BLOG_BY_ID, UPDATE_VIDEO_CONTEXT, VIDEO_BLOG_CONTEXT } from "@/queries/videoBlogContextQuery";
import { onError, onReady, opts } from "@/util/YoutubeIDContext/YoutubeVideoOptionCustomFunction";
import withAuth from "@/Component/RoutesProtect/withAuth";
import { useRouter } from "next/navigation";
var getYouTubeID = require("get-youtube-id");
type ParamsType = {
  params: {
    id: string;
  };
};
const EditVideoContext = ({ params: { id } }: ParamsType) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [urlId, setUrlId] = useState<string | null>(null);

  //! To Get the Data From DB
  const { data } = useSuspenseQuery<GetSingleVideoBlogType>(GET_VIDEO_BLOG_BY_ID, {
    variables: {
      videoId: id,
    },
  });
  //!

  //! To Update/Edit The Data by ID
  const [editVideo, { loading }] = useMutation(UPDATE_VIDEO_CONTEXT, {
    onCompleted: (data) => {
      // console.log(":::", data);
    },
    onError: (error) => {
      setError(`Submission error! ${error.message}`);
    },
  });

  const [videoInput, setVideoInput] = useState({
    title: data.videoBlogContext.title,
    url: data.videoBlogContext.url,
  });

  const getInputValues = (e: ChangeEvent<HTMLInputElement> | any) => {
    setVideoInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const addBlogFunction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await editVideo({
        variables: {
          editVideoContextId: id,
          edits: videoInput,
        },
        refetchQueries: [
          {
            query: VIDEO_BLOG_CONTEXT,
          },
        ],
        onCompleted: () => router.push("/mediacontext"),
      });

      if (result.data) {
        setError("");
        return;
      }
    } catch (GraphQLError) {
      console.error("Error during mutation:", GraphQLError);
    }
  };

  useEffect(() => {
    setUrlId(getYouTubeID(videoInput.url));
  }, [videoInput.url]);

  return (
    <div className={styles.main}>
      <div className={styles.page_title}>
        <p>
          <span className="pi pi-home">&nbsp;</span>
          <Link href={"/home"} className={styles.title_href}>
            Home
          </Link>
          /Context/
          <Link href={"/mediacontext"} className={styles.title_href}>
            Media context
          </Link>
          /Edit Video
        </p>
      </div>

      <div className={styles.head_title}>
        <h1>Edit Video</h1>
        <div className={styles.hr}></div>
        <form className={styles.form} onSubmit={addBlogFunction}>
          <div className="video-container">
            <label className={styles.file} htmlFor="addBlogFile">
              {urlId && <YouTube videoId={urlId} opts={opts} onReady={onReady} onError={onError} />}
            </label>
          </div>
          <div>
            <label htmlFor="title">Video Title</label>
            <input className={styles.input_field} type="title" id="title" name="title" value={videoInput.title} onChange={getInputValues} placeholder="Enter Video Title" />
          </div>

          <div>
            <label htmlFor="url">Video URL</label>
            <input className={styles.input_field} type="text" id="url" name="url" value={videoInput.url} onChange={getInputValues} placeholder="Enter Video URL" />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(EditVideoContext);
