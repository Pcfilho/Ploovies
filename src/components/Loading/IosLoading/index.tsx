import LottieView from "lottie-react-native";
import loadingSource from "../../../assets/foovies-loading.json";

interface Props {
  size: number;
}

export function IosLoading({ size } : Props) {
  return (
    <LottieView
        autoPlay
        loop
        source={loadingSource}
        style={{
          height: size,
          width: size,
        }}
      />
  )
}