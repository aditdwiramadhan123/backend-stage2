import { User } from "@prisma/client";

export interface CreateAccountDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  quote?: string;
  profilePictureUrl?: string;
  coverPictureUrl?: string;
}

export interface UpdateAccountDTO {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  quote?: string;
  profilePictureUrl?: string;
  coverPictureUrl?: string;
}

export interface LoginAccountDTO {
  email: string;
  password: string;
}

type Follower = {
  followingId: number;
};

type Following = {
  followerId: number;
};

export interface MyTypeUser extends User {
  followers: Follower[];
  following: Following[];
  _count: {
    followers: number;
    following: number;
  };
}
