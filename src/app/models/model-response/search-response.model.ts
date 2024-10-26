import { MovieOverview } from "./movie-overview.model";
import { PersonOverview } from "./person-overview.model";

export interface SearchResponse {
  page: number;
  results: MovieOverview[] | PersonOverview[];
  total_pages: number;
  total_results: number;
}