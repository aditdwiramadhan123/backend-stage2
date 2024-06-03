export interface CreateThreadDTO {
  caption: string;
  imageUrl?: string;
  authorId: number;
}

export interface UpdateThreadDTO {
  caption?: string;
  imageUrl?: string;
}
