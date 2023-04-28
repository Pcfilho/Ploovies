import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
  padding-top: ${RFValue(20)}px;
`;

export const Header = styled.View`
    width: 100%;
    padding: ${RFValue(20)}px ${RFValue(20)}px ${RFValue(10)}px;
    justify-content: center;
    align-items: flex-start;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.main};
    font-size: ${RFValue(32)}px;
    font-family: ${({ theme }) => theme.fonts.primary_900};
    margin-bottom: ${RFValue(15)}px;
`;

export const SubTitle = styled.Text`
    color: ${({ theme }) => theme.colors.main_text};
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const SearchWrapper = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    padding: ${RFValue(5)}px ${RFValue(5)}px;
    margin: 0 ${RFValue(20)}px;

    border: 1px solid ${({ theme }) => theme.colors.title};
    border-radius: ${RFValue(10)}px;
`;

export const IconContainer = styled.View`
  padding: ${RFValue(5)}px;
`;

export const Input = styled.TextInput`
  width: 100%;
  margin-left: ${RFValue(5)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(14)}px;
  
  color: ${({ theme }) => theme.colors.main_text};
`;


export const Content = styled.View`
  flex: 1;
`;

export const GenreContainer = styled.View`
  width: 100%;
  margin-top: ${RFValue(10)}px;
`;

export const MoviesContainer = styled.View`
  flex: 1;
  padding: 0 ${RFValue(10)}px;
  align-items: center;
  justify-content: center;
`;
