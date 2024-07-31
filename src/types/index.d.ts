export interface IUser {
  createdAt: Date;
  username: string;
  email: string;
  name: string;
  profileImage: string;
  coverImage: string;
  updatedAt: Date;
  _id: string;
  bio: string;
  location: string;
  followers: string[];
  following: string[];
  hasNewNotifications: boolean;
  notifications: string[];
  isFollowing: boolean;
  hasNewNotifications: boolean;
  notifications: string[];
}

export interface IPost {
  body: string;
  user: IUser;
  likes: string | number;
  comments: string | number;
  updatedAt: string;
  createdAt: string;
  _id: string;
  hasLiked: boolean;
}