import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export const Container = styled.View`
  flex: 1;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 50%;
`;

export const Content = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background_primary};
  margin-top: -80px;
  border-radius: 24px;
  padding: 20px;
`;


export const Header = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.main_text};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.primary_900};
    text-align: center;
`;

export const RatingContainer = styled.View` 
  flex-direction: row;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const Rating = styled.Text`
    color: ${({ theme }) => theme.colors.background_primary};
    font-size: ${RFValue(12)}px;
    font-family: ${({ theme }) => theme.fonts.primary_900};
    text-align: center;
`;

export const Star = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.background_primary};
`;

export const OverviewContainer = styled.View`
  margin-top: 18px;
`;

export const OverviewText = styled.Text`
  color: ${({ theme }) => theme.colors.main_text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const CompaniesContainer = styled.View`
  height: 200px;
  width: 100%;
  margin-top: 32px;
`;

export const CompaniesTitle = styled.Text`
  color: ${({ theme }) => theme.colors.main_text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_900};
  margin-bottom: 16px;
`;