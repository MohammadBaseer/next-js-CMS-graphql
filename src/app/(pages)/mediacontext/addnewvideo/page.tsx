"use client";
import styles from "./AddVideo.module.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import YouTube from "react-youtube";
var getYouTubeID = require("get-youtube-id");

const AddNewVideo = () => {
  const [error, setError] = useState<string>("");
  // const [videoTitle, setVideoTitle] = useState<string>("");
  const [urlId, setUrlId] = useState<string | null>(null);
  const [videoInput, setVideoInput] = useState({
    title: "",
    urlId: "",
  });

  const getInputValues = (e: ChangeEvent<HTMLInputElement> | any) => {
    setVideoInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const addBlogFunction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("User Created");
  };
  //!SECTION

  const opts = {
    height: "300",
    width: "600",
    // playerVars: {
    //   autoplay: 0,
    // },
    playerVars: {
      autoplay: 0,
      modestbranding: 0,
      rel: 0,
      fs: 1,
      iv_load_policy: 3,
      disablekb: 0,
      controls: 0, // This is to show the minimal controls
      // mute: 1 // Uncomment to start the video muted
    },
  };
  const onReady = (event: any) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const onError = (event: any) => {
    console.error("Error occurred while loading the video:", event.data);
  };
  useEffect(() => {
    setUrlId(getYouTubeID(videoInput.urlId));
  }, [videoInput.urlId]);

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
            <input className={styles.input_field} type="text" id="url" name="urlId" value={videoInput.urlId} onChange={getInputValues} placeholder="Enter Video URL" />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.sub_btn_box}>
            <button className={styles.form_btn} type="submit">
              Add New Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewVideo;
