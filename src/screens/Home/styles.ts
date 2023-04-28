import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
  padding-top: ${RFValue(20)}px;
`;

export const Header = styled.View`
    flex-direction: row;
    width: 100%;
    padding: ${RFValue(20)}px ${RFValue(20)}px 0;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${RFValue(15)}px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.main};
    font-size: ${RFValue(32)}px;
    font-family: ${({ theme }) => theme.fonts.primary_900};
    text-align: center;
`;

export const SubTitle = styled.Text`
    color: ${({ theme }) => theme.colors.main_text};
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const SearchWrapper = styled.View`
    width: 60%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    padding: ${RFValue(5)}px ${RFValue(5)}px;
    margin: 0 ${RFValue(20)}px;

    border: 1px solid ${({ theme }) => theme.colors.title};
    border-radius: ${RFValue(10)}px;
`;

export const IconContainer = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const Input = styled.TextInput`
  flex: 1;
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
`;

export const MoviesContainer = styled.View`
  flex: 1;
  padding: 0 ${RFValue(10)}px;
  align-items: center;
  justify-content: center;
`;
