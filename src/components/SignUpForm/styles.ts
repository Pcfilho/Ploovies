import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const RegisterContainer = styled.ScrollView`
  flex: 1;
`

export const InputsContainer = styled.View`
  flex: 2;
  margin: ${RFValue(24)}px ${RFValue(25)}px;
  gap: ${RFValue(12)}px;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${RFValue(32)}px ${RFValue(25)}px 0;
`;

export const ContentHeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_900};
  font-size: ${RFValue(32)}px;
  
  color: ${({ theme }) => theme.colors.main_text};
`;

export const ButtonsContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  padding: ${RFValue(15)}px ${RFValue(20)}px;
  background-color: ${({ theme }) => theme.colors.main};
  width: 80%;
  border-radius: ${RFValue(8)}px;
  align-items: center;
`;

export const ButtonTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_900};
  font-size: ${RFValue(14)}px;
  
  color: ${({ theme }) => theme.colors.background_primary};
`;

export const RegisterTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(12)}px;
  
  color: ${({ theme }) => theme.colors.main_text};
`;

export const RegisterButton = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(12)}px;
  
  color: ${({ theme }) => theme.colors.main};
`;

export const RegisterErrorMessage = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(12)}px;
  
  color: ${({ theme }) => theme.colors.error};
  align-self: center;
  margin: ${RFValue(8)}px 0a;
`;


