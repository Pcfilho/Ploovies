import React from "react";

import { Container, CompanyTitle } from "./styles";
import { moviesApi } from "../../service/moviesApi";
import { Image } from "expo-image";

interface Props {
  imageEndpoint: string;
  companyName: string;
}

export const Company = ({ imageEndpoint, companyName }: Props) => {
  const imageSource = moviesApi.getMovieImageW500(imageEndpoint);

  return (
    <Container>
      <Image 
        source={imageSource}
        contentFit="contain"
        style={{
          height: 32,
          borderRadius: 8,
        }}
      />
      <CompanyTitle>{companyName}</CompanyTitle>
    </Container>
  );
};
