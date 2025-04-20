export interface BaseUser {
  _id: string | undefined;
  name: string;
  email: string;
  role: UserRole;
  password: string | undefined;
}

export interface UsersResponse extends BaseUser {
  status: boolean;
  lastLogin: string;
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}