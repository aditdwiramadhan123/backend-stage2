import {  Thread } from "@prisma/client";

// Define interfaces for each included model
export interface UserType {
    name: string;
    username: string;
    profilePictureUrl: string;
  }
  
  export interface CommentType {
    author: UserType;
  }
  
  export interface LikeType {
    user: UserType;
  }
  
  export interface MyThreadType extends Thread {
    author: UserType;
    comments: CommentType[];
    likes: LikeType[];
    _count: {
      comments: number;
      likes: number;
    };
  }
  
  export interface NewThreadType extends UserType {
    id: number;
    caption: string;
    imageUrl: string | null;
    duration: string;
    comments: number;
    likes: number;
  }
  