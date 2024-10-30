import { Genre } from "../movie-model/genre.model";

export interface MovieOverview {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    genres: Genre[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }