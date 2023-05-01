import React, { memo } from "react";

import {
  Container,
  InfoContainer,
  Title,
  GenreTitle,
  ContainerButton,
  ImageContainer,
  DeleteContainer,
  IconContainer,
} from "./styles";
import { Stars } from "../Stars";
import { moviesApi } from "../../service/axios/moviesApi";
import { useNavigation } from "@react-navigation/native";
import { Image } from "../Image";
import { FadeIn, ZoomIn } from "react-native-reanimated";
import { FavoriteRoutesNavigationProp } from "../../routes/favorite.stack.routes";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import { useNetInfo } from "@react-native-community/netinfo";
import { useFavoriteDeleteMutation } from "../../hooks/mutations/useFavoriteDeleteMutation";
import { useGenreType } from "../../hooks/locale/useGenreTypes";

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
  isDeleteMode: boolean;
  onRemoveSuccess: () => void;
}

export const FavoriteMovie = ({ item, isDeleteMode, onRemoveSuccess }: Props) => {
  const { navigate } = useNavigation<FavoriteRoutesNavigationProp>();
  const { genreTypes } = useGenreType();
  const { isConnected } = useNetInfo();
  const theme = useTheme();
  const { mutation } = useFavoriteDeleteMutation(onRemoveSuccess);
  const movieImage = moviesApi.getMovieImageOriginal(item.backdrop_path);
  const getGenreById = (id: number) => {
    return genreTypes.find((genre) => genre.id === id)?.name;
  };

  const renderDeleteButton = () => (
    isDeleteMode ? 
    <DeleteContainer>
      <IconContainer>
        <Feather
          name="trash"
          size={32}
          color={theme.colors.icon_color}
        />
      </IconContainer>
    </DeleteContainer>
    : null
  );

  const handleOnPress = () => {
    if (isDeleteMode) {
      mutation.mutate(item)
      return;
    }


    if (isConnected) {
      navigate('FavoriteMovieDetails', { item });
    }
  }

  return (
    <Container entering={FadeIn.duration(500)}>
      <ContainerButton
        onPress={handleOnPress}
      >
        <ImageContainer>
          <Image imageSource={movieImage} size={98} borderRadius={8} />
          {renderDeleteButton()}
        </ImageContainer>
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
