export type GetAllVideoBlogsTypes = {
  videoBlogContexts: VideoBlogContextTypes[];
};

export type GetSingleVideoBlogType = {
  videoBlogContext: VideoBlogContextTypes;
};
export type VideoBlogContextTypes = {
  _id: string;
  title: string;
  url: string;
  createdBy: {
    username: string;
  };
  createdAt: string | number;
};
