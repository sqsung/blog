declare module "global" {
  export interface PostData {
    title: string;
    date: string;
    thumbnail: string;
    description: string;
    tags: string[];
    id: string;
    category: string;
  }
}
