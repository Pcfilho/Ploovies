import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps {
  isSelected: boolean;
}

export const Container = styled(TouchableOpacity)<IProps>`
  width: ${RFValue(64)}px;
  height: ${RFValue(64)}px;
  padding: ${RFValue(5)}px;
  margin: ${RFValue(5)}px;
  align-items: center;
  justify-content: space-around;
  border-radius: ${RFValue(12)}px;
  border: 1px solid;
  border-color:  ${({ theme }) => theme.colors.main};

  background-color: ${({ theme, isSelected }) => isSelected ? theme.colors.main : theme.colors.background_primary};
`;

export const Title = styled.Text<IProps>`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(8)}px;
  
  color: ${({ theme, isSelected }) => isSelected ? theme.colors.background_primary : theme.colors.main_text};
`;
