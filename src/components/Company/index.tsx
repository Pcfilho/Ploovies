import React, { memo } from "react";

import { Container, CompanyTitle } from "./styles";
import { moviesApi } from "../../service/axios/moviesApi";
import { Image } from "react-native";

interface Props {
  imageEndpoint: string;
  companyName: string;
}

export const Company = ({ imageEndpoint, companyName }: Props) => {
  const imageSource = moviesApi.getMovieImageW500(imageEndpoint);

  return (
    <Container>
      {imageSource ? (
        <Image
          source={{ uri: imageSource }}
          resizeMode="contain"
          style={{
            height: 32,
            borderRadius: 8,
          }}
        />
      ) : null}
      <CompanyTitle>{companyName}</CompanyTitle>
    </Container>
  );
};

export const CompanyMemo = memo(Company);