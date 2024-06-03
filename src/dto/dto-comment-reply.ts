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