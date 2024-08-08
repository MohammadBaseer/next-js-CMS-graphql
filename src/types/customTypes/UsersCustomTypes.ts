export type GetAllUsersType = {
  Users: Users[];
};
export type GetSingleUsersType = {
  Users: Users;
};

export type Users = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
};
