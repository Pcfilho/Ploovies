import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { ViewStyle } from "react-native";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

interface Props {
  children?: ReactNode;
  isLoading: boolean;
  style?: ViewStyle;
}

export const Skeleton = ({ children, isLoading, style }: Props) => (
  <ShimmerPlaceholder visible={!isLoading} shimmerStyle={[style, { borderRadius: 8 }]}>
    {children}
  </ShimmerPlaceholder>
);
