export interface Video {
    id: string;
    key: string; // This is the YouTube key for the video
    name: string;
    site: string; // Usually "YouTube"
    type: string; // e.g., "Trailer"
  }