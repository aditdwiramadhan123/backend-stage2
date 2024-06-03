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
