export type GetAllUsersType = {
  users: Users[];
};
export type GetSingleUsersType = {
  user: Users;
};

export type Users = {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: {
    url: string;
  };
  createdAt: string;
};
