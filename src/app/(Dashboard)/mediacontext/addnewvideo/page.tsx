"use client";
import styles from "./AddVideo.module.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import YouTube from "react-youtube";
import { useMutation } from "@apollo/client";
import { INSERT_VIDEO_CONTEXT, VIDEO_BLOG_CONTEXT } from "@/queries/videoBlogContextQuery";
import { onError, onReady, opts } from "@/util/YoutubeIDContext/YoutubeVideoOptionCustomFunction";
import getYouTubeID from "get-youtube-id";
import withAuth from "@/Component/RoutesProtect/withAuth";
import { useRouter } from "next/navigation";

const AddNewVideo = () => {
  const router = useRouter();

  const [error, setError] = useState<string>("");
  const [urlId, setUrlId] = useState<string | null>(null);
  const [videoInput, setVideoInput] = useState({
    title: "",
    url: "",
  });

  const [InsertVideoBlog, { loading, error: GraphQLError }] = useMutation(INSERT_VIDEO_CONTEXT, {
    onCompleted: (data) => {
      console.log(data ? "success" : "Failed");
    },
    onError: (error) => {
      setError(`Submission error! ${error.message}`);
    },
  });

  const getInputValues = (e: ChangeEvent<HTMLInputElement> | any) => {
    setVideoInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const addBlogFunction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await InsertVideoBlog({
        variables: {
          newVideoBlogContextData: videoInput,
        },
        refetchQueries: [
          {
            query: VIDEO_BLOG_CONTEXT,
          },
        ],
        onCompleted: () => router.push("/mediacontext"),
      });

      if (result) {
        setError("");
        setVideoInput({ title: "", url: "" });
        return;
      }
    } catch (error) {
      console.error("Error during mutation:", GraphQLError);
    }
  };

  useEffect(() => {
    setUrlId(getYouTubeID(videoInput.url));
  }, [videoInput.url]);

  useEffect(() => {
    document.title = "Add New Video Blog";
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.page_title}>
        <p>
          <span className="pi pi-home">&nbsp;</span>
          <Link href={"/dashboard"} className={styles.title_href}>
            Dashboard
          </Link>
          /Context/
          <Link href={"/mediacontext"} className={styles.title_href}>
            Media context
          </Link>
          /Add New Video
        </p>
      </div>

      <div className={styles.head_title}>
        <h1>Add New Video</h1>
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
              {loading ? "Adding..." : "Add Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(AddNewVideo);
