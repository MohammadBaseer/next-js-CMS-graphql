export type GetAllBlogContextType = {
  BlogContext: BlogContext[];
};
export type GetSingleBlogContextType = {
  BlogContext: BlogContext;
};

export type BlogContext = {
  id: string;
  title: string;
  description: string;
  photo:{
    url:string;
  } 
};
