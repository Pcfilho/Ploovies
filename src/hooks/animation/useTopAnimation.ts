import { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export const useTopAnimation = (
  inputRange : number[],
  outputRange : number[],
  onAnimation: () => void,
) => {
  const contentTop = useSharedValue(100);

  const contentTopStyle = useAnimatedStyle(() => {
    const interpolateHeight = interpolate(
      contentTop.value,
      inputRange,
      outputRange,
      Extrapolate.CLAMP
    );

    return {
      top: interpolateHeight,
    };
  });

  const startAnimation = () => {
    contentTop.value = withTiming(
      0,
      {
        duration: 500,
        easing: Easing.ease,
      },
      () => {
        runOnJS(onAnimation)();

        contentTop.value = withTiming(100, {
          duration: 800,
          easing: Easing.ease,
        });
      }
    );
  };

  return {
    contentTopStyle,
    startAnimation
  }
}