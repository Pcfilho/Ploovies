import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: ${RFValue(64)}px;
  height: ${RFValue(64)}px;
  justify-content: center;
  margin: 0 ${RFValue(8)}px;
`;

export const CompanyTitle = styled.Text`
    margin-top: ${RFValue(4)}px;
    color: ${({ theme }) => theme.colors.main_text};
    font-size: ${RFValue(8)}px;
    font-family: ${({ theme }) => theme.fonts.primary_900};
    text-align: center;
`;