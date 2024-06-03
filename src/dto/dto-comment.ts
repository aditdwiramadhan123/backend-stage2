export interface CreateCommentDTO {
    content: string;
    imageUrl?: string;
    authorId: number;
    threadId : number;
  }
  
  export interface UpdateCommentDTO {
    content?: string;
    imageUrl?: string;
  }