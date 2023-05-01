import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const RegisterErrorMessage = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(12)}px;
  
  color: ${({ theme }) => theme.colors.error};
  align-self: center;
  margin: ${RFValue(8)}px 0;
`;
