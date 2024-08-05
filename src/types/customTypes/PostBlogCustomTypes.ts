export type GetAllBlogContextType = {
  blogContexts: BlogContext[];
};
export type GetSingleBlogContextType = {
  blogContexts: BlogContext;
};

export type BlogContext = {
  _id: string;
  title: string;
  description: string;
  photo: {
    url: string;
    public_id: string;
  };
};
