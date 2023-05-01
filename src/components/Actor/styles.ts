import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: ${RFValue(120)}px;
  width: ${RFValue(80)}px;
  margin: 0 ${RFValue(12)}px;
`;

export const InfoContainer = styled.View`
  padding: ${RFValue(5)}px 0;
  width: 100%;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.main_text};
`;

export const RoleTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(8)}px;
  color: ${({ theme }) => theme.colors.text};

  padding: ${RFValue(6)}px 0;
`;
