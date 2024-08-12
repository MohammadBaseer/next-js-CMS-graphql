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
  createdBy: {
    username: string;
  };
  photo: {
    url: string;
  };
  createdAt: string | number;
};
