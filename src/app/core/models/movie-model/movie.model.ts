import { MovieOverview } from "../model-response/movie-overview.model";
import { Company } from "./company.model";
import { Country } from "./country.model";
import { Genre } from "./genre.model";
import { Language } from "./language.model";
import { MovieImages } from "./movie.images.model";

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    backdrops: MovieImages[];
    belongs_to_collection: any; 
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Company[];
    production_countries: Country[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Language[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    results: MovieOverview[];
  }