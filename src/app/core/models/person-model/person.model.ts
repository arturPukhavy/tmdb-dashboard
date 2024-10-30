import { PersonImages } from "./person.images.model";

export interface Person {
    adult: boolean;
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
    profiles: PersonImages[];
  }