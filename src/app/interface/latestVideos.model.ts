export interface VideoThumbnail {
  height: number;
  url: string;
  width: number;
}
export interface VideoThumbnails {
  default: VideoThumbnail;
  medium: VideoThumbnail;
  high: VideoThumbnail;
  standard: VideoThumbnail;
  maxres: VideoThumbnail;
}
export interface Snippet {
  categoryId: number;
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  title: string;
  thumbnails: VideoThumbnails;
}
export interface Video {
  id: string;
  kind: string;
  snippet: Snippet;
}

// latest videos server response
export type LatestVideos = Video[];
