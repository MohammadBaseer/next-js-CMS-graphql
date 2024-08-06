export type GetAllBlogContextType = {
  blogContexts: BlogContext[];
};
export type GetSingleBlogContextType = {
  blogContext: BlogContext;
};

export type BlogContext = {
  _id: string;
  title: string;
  description: string;
  photo: {
    url: string;
  };
};
