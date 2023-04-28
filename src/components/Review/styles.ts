import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: ${RFValue(12)}px 0;
  gap: ${RFValue(8)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AuthorTitle = styled.Text`
    color: ${({ theme }) => theme.colors.main_text};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.primary_900};
`;

export const CreatedTitle = styled.Text`
  color: ${({ theme }) => theme.colors.main_text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const Content = styled.View`
  width: 100%;
  gap: ${RFValue(8)}px;
`;

export const ReviewContent = styled.Text`
  color: ${({ theme }) => theme.colors.main_text};
  text-align: justify;
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const ReviewUrl = styled.Text`
  color: ${({ theme }) => theme.colors.main};
  text-align: justify;
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;
