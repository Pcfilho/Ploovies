import { TouchableOpacity } from "react-native-gesture-handler";
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
`;

export const Content = styled.View`
  flex: 1;
  padding: ${RFValue(20)}px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${RFValue(32)}px;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.main_text};
  font-size: ${RFValue(28)}px;
  font-family: ${({ theme }) => theme.fonts.primary_900};
`;

export const InfoGroupContainer = styled.View`
  gap: ${RFValue(32)}px;
  width: 100%;
`;

export const InfoContainer = styled.View`
  gap: ${RFValue(12)}px;
  align-items: flex-start;
  justify-content: center;
`;

export const InfoTitle = styled.Text`
    color: ${({ theme }) => theme.colors.main_text};
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const InfoText = styled.Text`
    color: ${({ theme }) => theme.colors.main_text};
    font-size: ${RFValue(21)}px;
    font-family: ${({ theme }) => theme.fonts.primary_700};
`;


export const IconContainer = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const ConfigContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: ${RFValue(24)}px;
`;


export const ConfigLanguageContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ConfigTitle = styled.Text`
    color: ${({ theme }) => theme.colors.main_text};
    font-size: ${RFValue(21)}px;
    font-family: ${({ theme }) => theme.fonts.primary_700};
`;

export const ConfigHeader = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: ${RFValue(12)}px;
`;

export const PreferenceTitleContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${RFValue(12)}px;
`;

export const Separator = styled.View`
  width: 95%;
  align-self: center;
  border: 1px solid ${({ theme }) => theme.colors.text_details};
`;

export const LanguageContainer = styled.TouchableOpacity`
`;

export const LanguageText = styled.Text`
  color: ${({ theme }) => theme.colors.main_text};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;