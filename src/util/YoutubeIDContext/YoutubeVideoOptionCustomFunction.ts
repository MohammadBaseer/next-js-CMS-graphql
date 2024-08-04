export const opts = {
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
export const opts_small_size = {
  height: "90",
  width: "160",

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
export const onReady = (event: any) => {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
};
export const onError = (event: any) => {
  console.error("Error occurred while loading the video:", event.data);
};
