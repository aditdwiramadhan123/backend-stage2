export interface CreateCommentReplyDTO {
    content: string;
    imageUrl?: string;
    authorId: number;
    commentId : number;
  }
  
  export interface UpdateCommentReplyDTO {
    content?: string;
    imageUrl?: string;
  }

  export interface ReplyCommentType  {
    id: number;
    content: string;
    imageUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
    commentId: number;
    authorId: number;
  };
  