import React, { useState } from "react";
import { Container, LoadContainer } from "./styles";
import { Loading } from "../Loading";
import {
  Image as RNImage,
  ImageResizeMode
} from "react-native";

interface Props {
  imageSource: string | undefined;
  borderRadius?: number;
  size?: number;
  resizeMode?: ImageResizeMode
}

export function Image({ imageSource, borderRadius = 0, size = 32, resizeMode = "cover" }: Props) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Container>
      {imageSource ? (
        <RNImage
          source={{
            uri: imageSource,
          }}
          resizeMode={resizeMode}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            borderRadius: borderRadius,
          }}
          onLoadEnd={() => {
            setImageLoading(false);
          }}
        />
      ) : null}
      {imageLoading ? (
        <LoadContainer>
          <Loading size={size} />
        </LoadContainer>
      ) : null}
    </Container>
  );
}
