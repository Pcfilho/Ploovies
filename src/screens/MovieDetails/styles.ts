import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.background_primary};
  margin-top: -${RFValue(80)}px;
  border-radius: ${RFValue(24)}px;
  padding: ${RFValue(20)}px;
`;

export const Header = styled.View`
  margin-top: ${RFValue(20)}px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderWrapper = styled.View`
  gap: ${RFValue(8)}px;
  width: 60%;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.main_text};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.primary_900};
`;

export const RatingContainer = styled.View` 
  flex-direction: row;
  padding: ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: ${RFValue(8)}px;
  align-items: center;
  justify-content: space-between;
  gap: ${RFValue(8)}px;
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
  margin-top: ${RFValue(18)}px;
`;

export const OverviewText = styled.Text`
  color: ${({ theme }) => theme.colors.main_text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const CompaniesContainer = styled.View`
  margin-top: ${RFValue(32)}px;
`;

export const CompaniesTitle = styled.Text`
  color: ${({ theme }) => theme.colors.main_text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_900};
  margin-bottom: ${RFValue(16)}px;
`;

export const ActorsContainer = styled.View`
  margin-top: ${RFValue(32)}px;
`;

export const ActorsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.main_text};
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.primary_900};
  margin-bottom: ${RFValue(16)}px;
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  top: ${RFValue(50)}px;

  flex-direction: row;
  width: 100%;
  padding: 0 ${RFValue(20)}px;
  align-items: center;
  justify-content: space-between;
`;

export const FavoriteButton = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.background_primary};
`;

export const ShareButton = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.background_primary};
`;

export const LeftButtonsContainer = styled.View`

`

export const RightButtonsContainer = styled.View`
  flex-direction: row;
  gap: ${RFValue(8)}px;
`

export const BackButton = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.background_primary};
`

export const ScreenFooter = styled.View`
  height: ${RFValue(1)}px;
  padding: ${RFValue(8)}px;
  margin-bottom: ${RFValue(18)}px;
`;