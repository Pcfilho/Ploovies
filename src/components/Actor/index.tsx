import React, { memo } from 'react';

import { Container, RoleTitle, InfoContainer, Title } from './styles';
import { moviesApi } from '../../service/axios/moviesApi';
import { Image } from 'react-native';

interface Props {
  name: string;
  character: string;
  imageEndPoint: string;
}

export const Actor = ({ name, character, imageEndPoint} : Props) => {
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
        <RoleTitle>{character}</RoleTitle>
      </InfoContainer>
    </Container>
  );
}

export const ActorMemo = memo(Actor);