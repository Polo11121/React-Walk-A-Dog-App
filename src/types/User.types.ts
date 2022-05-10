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

export type SlotType = {
  status: string;
  id: number;
  trainer: number;
  date: string;
  time_from: string;
  time_to: string;
  dog1: number;
  dog2: number;
  dog3: number;
};
