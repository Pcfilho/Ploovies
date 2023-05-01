import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity<Props>`
  min-width: ${RFValue(64)}px;
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

export const Title = styled.Text<Props>`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(8)}px;
  
  color: ${({ theme, isSelected }) => isSelected ? theme.colors.background_primary : theme.colors.main_text};
`;

export const ImageContainer = styled.View`
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  align-items: center;
  justify-content: center;

`;
