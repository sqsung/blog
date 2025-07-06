export interface BlogMetadata {
  id: string;
  category: string;
  tags: string[];
  title: string;
  summary: string;
  createdAt: string;
  isPublished: boolean;
}

export interface Blog {
  metadata: BlogMetadata;
  content: string;
}
