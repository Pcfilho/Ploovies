import { useEffect } from "react";
import { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


export const useWidthAnimation = (animate: boolean, deps : any[]) => {
  const width = useSharedValue(0);

  const widthAnimatedStyle = useAnimatedStyle(() => {
    const interpolatedWidth = interpolate(
      width.value,
      [0, 1],
      [60, 0],
      Extrapolate.CLAMP
    );

    const interpolateOpacity = interpolate(
      width.value,
      [0, 1],
      [1, 0]
    );

    return {
      width: withTiming(`${interpolatedWidth}%`, {
        duration: 1000,
      }),
      opacity: withTiming(interpolateOpacity, {
        duration: 1500,
      }),
    };
  });


  useEffect(() => {
    width.value = Number(animate);
  }, [...deps]);

  return {
    widthAnimatedStyle,
  }
}