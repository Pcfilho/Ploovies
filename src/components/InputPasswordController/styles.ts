import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { MaterialIcons, Feather } from '@expo/vector-icons';


export const Container = styled.View``;

export const Input = styled.View`
  flex-direction: row;
  border: 1px solid ${({ theme }) => theme.colors.main};
  border-radius: 8px;
  padding: ${RFValue(13)}px ${RFValue(20)}px ${RFValue(13)}px ${RFValue(12)}px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const InputText = styled.TextInput`
  flex: 1;
  margin-left: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(14)}px;
  
  color: ${({ theme }) => theme.colors.main_text};
`;

export const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(MaterialIcons)``;

export const ErrorMessage = styled.Text`
  margin: ${RFValue(4)}px 0;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(12)}px;
  
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
`;

export const PasswordIconButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const PasswordIcon = styled(Feather)``;
