import React from 'react';

import { Container, GenreTitle, InfoContainer, Title } from './styles';
import { moviesApi } from '../../service/moviesApi';
import { Image } from 'react-native';

interface IProps {
  name: string;
  character: string;
  imageEndPoint: string;
}

export const Actor = ({ name, character, imageEndPoint} : IProps) => {
  const imageSource = moviesApi.getMovieImageW500(imageEndPoint);

  return (
    <Container>
      <Image
        source={{ uri: imageSource }}
        resizeMode="cover"
        style={{
          height: 80,
          borderRadius: 8,
        }}
      />
      <InfoContainer>
        <Title ellipsizeMode='tail' numberOfLines={1}>{name}</Title>
        <GenreTitle>{character}</GenreTitle>
      </InfoContainer>
    </Container>
  );
}