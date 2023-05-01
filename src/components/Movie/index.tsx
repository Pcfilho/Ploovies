import React, { memo } from "react";

import {
  Container,
  InfoContainer,
  Title,
  GenreTitle,
  ContainerButton,
} from "./styles";
import { Stars } from "../Stars";
import { moviesApi } from "../../service/axios/moviesApi";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../routes/home.stack.routes";
import { Image } from "../Image";
import { FadeIn } from "react-native-reanimated";
import { useGenreType } from "../../hooks/locale/useGenreTypes";
import { MovieModel } from "../../models/movie";


interface Props {
  item: MovieModel;
}

export const Movie = ({ item }: Props) => {
  const { genreTypes } = useGenreType();
  const { navigate } = useNavigation<HomeScreenNavigationProp>();
  const movieImage = moviesApi.getMovieImageOriginal(item.backdrop_path);
  const getGenreById = (id: number) => {
    return genreTypes.find((genre) => genre.id === id)?.name;
  };

  return (
    <Container entering={FadeIn.duration(500)}>
      <ContainerButton onPress={() => navigate("MovieDetails", { item })}>
        <Image imageSource={movieImage} size={98} borderRadius={8} />
        <InfoContainer>
          <Title numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Title>
          <GenreTitle>{getGenreById(item.genre_ids[0])}</GenreTitle>
          <Stars vote_average={item.vote_average} />
        </InfoContainer>
      </ContainerButton>
    </Container>
  );
};

export const MovieMemo = memo(Movie, (prevProps, nextProps) =>
  Object.is(prevProps, nextProps)
);
