import { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

interface Props {
  inputRange: number[],
  outputRange: number[],
}

export const useScrollHeightAnimation = ({
  inputRange,
  outputRange,
}: Props) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      ),
    };
  });

  return {
    scrollHandler,
    animatedHeightStyle,
  }
}