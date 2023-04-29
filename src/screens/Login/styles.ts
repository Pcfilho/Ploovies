import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.main};
`;

export const Header = styled.View`
  height: 30%;
  justify-content: center;
  padding: 0 ${RFValue(12)}px;
`;

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_900};
  font-size: ${RFValue(32)}px;
  
  color: ${({ theme }) => theme.colors.background_primary};
`;

export const Content = styled(Animated.View)`
  height: 70%;
  border-top-right-radius: ${RFValue(18)}px;
  border-top-left-radius: ${RFValue(18)}px;
  background-color: ${({ theme }) => theme.colors.background_primary};
  justify-content: space-between;
`;