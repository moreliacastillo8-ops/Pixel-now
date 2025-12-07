export interface Pin {
  id: string;
  title: string;
  imageUrl: string;
  author: string;
  description?: string;
  aspectRatio?: string; // e.g., "3/4" or "1/1"
  tags?: string[];
  isGenerated?: boolean;
}

export enum AspectRatio {
  Square = "1:1",
  Portrait = "3:4",
  Landscape = "16:9",
  Tall = "9:16"
}

export interface GeneratedImageResult {
  imageUrl: string;
  prompt: string;
}
