
import { Platform } from "react-native";
import { IosLoading } from "./IosLoading";
import { AndroidLoading } from "./AndroidLoading";

interface Props {
  size?: number;
}

export const Loading = ({ size = 32 }: Props) => {
  const isIos = Platform.OS === "ios";

  if (isIos) {
    return (
      <IosLoading size={ size } />
    )
  }

  return (
    <AndroidLoading size={size} />
  )
};
