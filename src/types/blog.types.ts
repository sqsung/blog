export interface BlogMetadata {
  id: string;
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

export interface BlogIndex {
  sortedPosts: BlogMetadata[];
  tagToId: Record<string, string[]>;
  tagCounts: Record<string, number>;
  idToPost: Record<string, BlogMetadata>;
  totalPosts: number;
  totalTags: number;
  lastBuilt: string;
}
