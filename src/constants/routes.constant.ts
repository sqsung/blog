export const ROUTES = {
  home: () => "/",
  post: (postId: string) => `/post/${postId}`,
  posts: (page: number = 1) => `/posts/${page}`,
  about: () => "/about",
  tags: () => "/tags",
  tagged: (tag: string, page: number) => `/tagged/${tag.toLowerCase()}/${page}`,
} as const;
