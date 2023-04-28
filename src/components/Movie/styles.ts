import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  height: ${RFValue(200)}px;
  width: 50%;
  padding: ${RFValue(20)}px;
  justify-content: center;
`;

export const InfoContainer = styled.View`
  padding: ${RFValue(5)}px 0;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(12)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.main_text};
`;

export const GenreTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.text};

  padding: ${RFValue(6)}px 0;
`;
