import React from "react";
import LottieView from "lottie-react-native";
import loadingSource from "../../assets/ploovies-loading.json";
import { View } from "react-native";

interface Props {
  size?: number;
}

export const Loading = ({ size = 32 }: Props) => {
  return (
    <LottieView
      autoPlay
      loop
      style={{
        width: size,
        height: size,
      }}
      source={loadingSource}
    />
  );
};
