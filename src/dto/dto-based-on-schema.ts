export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  quote?: string | null;
  profilePictureUrl?: string | null;
  coverPictureUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Thread = {
  id: number;
  caption: string;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  id: number;
  content: string;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  threadId: number;
  authorId: number;
};

export type ThreadLike = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  threadId: number;
};

export type CommentLike = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  commentId: number;
};

export type ReplyComment = {
  id: number;
  content: string;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  commentId: number;
  authorId: number;
};

export type ReplyCommentLike = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  replyCommentId: number;
};

export type Follow = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  followerId: number;
  followingId: number;
};
