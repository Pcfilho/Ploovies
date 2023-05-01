interface CompanyModel {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface MovieDataModel {
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  production_companies: CompanyModel[];
  release_date: string;
  title: string;
  vote_average: number;
  imageSource: string;
  realeseDate: string;
}