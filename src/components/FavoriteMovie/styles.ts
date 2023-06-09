import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated from 'react-native-reanimated';


export const ContainerButton = styled.TouchableOpacity`
  flex: 1;
`;

export const Container = styled(Animated.View)`
  height: ${RFValue(300)}px;
  width: 50%;
  padding: ${RFValue(20)}px;
  justify-content: center;
`;

export const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const InfoContainer = styled.View`
  padding: ${RFValue(5)}px 0;
  height: 20%;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.main_text};
`;

export const GenreTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.text};

  padding: ${RFValue(6)}px 0;
`;

export const DeleteContainer = styled(Animated.View)`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const IconContainer = styled.View``;
