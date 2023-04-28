import React, { memo } from "react";

import { Container, InfoContainer, Title, GenreTitle } from "./styles";
import { Image } from "react-native";
import { Stars } from "../Stars";
import { moviesApi } from "../../service/moviesApi";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../routes/home.routes";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
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

interface Props {
  item: IMovie;
}

const genreTypes = [
  {
    id: 28,
    name: "Ação",
  },
  {
    id: 12,
    name: "Aventura",
  },
  {
    id: 16,
    name: "Animação",
  },
  {
    id: 35,
    name: "Comédia",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentário",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Família",
  },
  {
    id: 14,
    name: "Fantasia",
  },
  {
    id: 36,
    name: "História",
  },
  {
    id: 27,
    name: "Terror",
  },
  {
    id: 10402,
    name: "Música",
  },
  {
    id: 9648,
    name: "Mistério",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Ficção científica",
  },
  {
    id: 10770,
    name: "Cinema TV",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "Guerra",
  },
  {
    id: 37,
    name: "Faroeste",
  },
];

export const Movie = ({ item }: Props) => {
  const { navigate } = useNavigation<HomeScreenNavigationProp>();
  const movieImage = moviesApi.getMovieImageOriginal(item.backdrop_path);
  const getGenreById = (id: number) => {
    return genreTypes.find((genre) => genre.id === id)?.name;
  };

  return (
    <Container onPress={() => navigate("MovieDetails", { item })}>
        <Image
          source={{ uri: movieImage }}
          resizeMode="cover"
          style={{
            height: "80%",
            borderRadius: 8,
          }}
        />
      <InfoContainer>
        <Title numberOfLines={1} ellipsizeMode="tail">{item.title}</Title>
        <GenreTitle>{getGenreById(item.genre_ids[0])}</GenreTitle>
        <Stars vote_average={item.vote_average} />
      </InfoContainer>
    </Container>
  );
};


export const MovieMemo = memo(Movie, (prevProps, nextProps) => Object.is(prevProps, nextProps))