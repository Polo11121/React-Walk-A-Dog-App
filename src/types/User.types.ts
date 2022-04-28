export type AuthTokensType = {
  access: string;
  refresh: string;
};

export type UserType = {
  id: number;
  username: string;
  email: string;
  avatar: string;
  phone_number: number;
  is_trainer: boolean;
};
