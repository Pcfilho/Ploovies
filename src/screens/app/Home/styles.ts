import Animated from "react-native-reanimated";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
  padding-top: ${RFValue(20)}px;
`;

export const Header = styled(Animated.View)`
    flex-direction: row;
    width: 100%;
    padding: ${RFValue(20)}px ${RFValue(20)}px 0;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${RFValue(15)}px;
`;

export const Title = styled(Animated.Text)`
    color: ${({ theme }) => theme.colors.main};
    font-size: ${RFValue(32)}px;
    font-family: ${({ theme }) => theme.fonts.primary_900};
`;

export const SubTitle = styled(Animated.Text)`
    color: ${({ theme }) => theme.colors.main_text};
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const SearchWrapper = styled.View`
    max-width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    padding: ${RFValue(5)}px ${RFValue(5)}px;
    margin: 0 ${RFValue(5)}px;

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

export const EmptyContainer = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding-top: ${RFPercentage(5)}%;
  gap: ${RFValue(8)}px;
`

export const ImageContainer = styled.View`
  height: 25%;
  width: 25%;
`;

export const EmptyText = styled.Text`
  color: ${({ theme }) => theme.colors.main_text};
  font-size: ${RFValue(21)}px;
  font-family: ${({ theme }) => theme.fonts.primary_900};
  text-align: center;
`;

export const LoadMoreContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;


export const LoadMoreText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(12)}px;
  
  color: ${({ theme }) => theme.colors.main};
`;

