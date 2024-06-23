import {  Comment } from "@prisma/client";

// Define interfaces for each included model
export interface UserType {
    name: string;
    username: string;
    profilePictureUrl: string;
  }

  
  export interface LikeType {
    user: UserType;
  }
  
  export interface MyCommentsType extends Comment {
    author: UserType;
    likes: LikeType[];
    _count: {
      likes: number;
    };
  }
  
  export interface NewThreadType extends UserType {
    id: number;
    caption: string;
    imageUrl: string | null;
    duration: string;
    likes: number;
  }
  