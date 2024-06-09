export interface CreateThreadDTO {
  caption: string;
  imageUrl?: string;
}

export interface UpdateThreadDTO {
  caption?: string;
  imageUrl?: string;
}
