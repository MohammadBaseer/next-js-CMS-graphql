export type GetAllVideoBlogsTypes = {
  videoBlogContexts: VideoBlogContextTypes[];
};

export type GetSingleVideoBlogType = {
  videoBlogContext: VideoBlogContextTypes;
};
export type VideoBlogContextTypes = {
  id: string;
  title: string;
  url: string;
};
