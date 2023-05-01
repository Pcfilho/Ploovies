import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';


interface Props {
  size: number;
}

export function AndroidLoading({ size } : Props) {
  const theme = useTheme();
  const correctAndroidSize = size/2;

  return (
    <ActivityIndicator 
      size={correctAndroidSize}
      color={theme.colors.main}
    /> 
  )
}