export type GetAllUsersType = {
  users: Users[];
};
export type GetSingleUsersType = {
  users: Users;
};

export type Users = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: {
    url: string;
  };
  createdAt: string;
};
