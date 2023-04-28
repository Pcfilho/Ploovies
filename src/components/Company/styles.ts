import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: ${RFValue(64)}px;
  height: ${RFValue(64)}px;
  justify-content: space-around;
`;

export const CompanyTitle = styled.Text`
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.main_text};
    font-size: ${RFValue(8)}px;
    font-family: ${({ theme }) => theme.fonts.primary_900};
    text-align: center;
`;