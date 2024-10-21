import { MovieOverview } from "./movie-overview.model";

export interface MovieResponse {
    page: number;
    results: MovieOverview[];
    total_pages: number;
    total_results: number;
  }