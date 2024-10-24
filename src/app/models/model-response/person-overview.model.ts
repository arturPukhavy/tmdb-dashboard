import { MovieOverview } from "./movie-overview.model";

export interface PersonOverview {
    id: number;
    name: string;
    profile_path: string;
    known_for: MovieOverview[]; 
    popularity: number;
  }