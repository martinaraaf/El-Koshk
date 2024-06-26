export interface VideoCounts {
  'All Videos': number;
  'Pending Count': number;
  'Approved Count': number;
  'Denied Count': number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  phone_number: number;
}

export interface Video {
  id: number;
  video_id: string;
  title: string;
  user_id: number;
  thumbnail_url: string;
  status: 'pending' | 'approved' | 'denied';
  user: User; // Nested User object
}

export interface VideosResponse {
  results: Video[]; // Array of Video objects
}
