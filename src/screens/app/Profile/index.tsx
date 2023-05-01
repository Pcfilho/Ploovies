import Feather from "@expo/vector-icons/Feather";
import {
  Container,
  Header,
  Title,
  IconContainer,
  Content,
  InfoContainer,
  InfoTitle,
  InfoText,
  InfoGroupContainer,
  SubTitle,
  ConfigContainer,
  ConfigTitle,
  ConfigHeader,
  PreferenceTitleContainer,
  Separator,
  LanguageText,
  ConfigLanguageContainer,
} from "./styles";
import { useTheme } from "styled-components/native";
import { updateUser } from "../../../store/reducers/userReducer";
import { useDispatch } from "react-redux";
import { useUserDataQuery } from "../../../hooks/queries/useUserDataQuery";
import { Platform, Switch } from "react-native";
import {
  updateDarkMode,
  useDarkModeSelector,
} from "../../../store/reducers/darkModeReducer";
import { Skeleton } from "../../../components/Skeleton";
import { PickerIOS, Picker } from "@react-native-picker/picker";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../hooks/locale/useLanguage";
import { ActionSheetIOS } from "react-native";

export const Profile = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { changeLanguage, getCurrentLanguage, getMessage } = useLanguage();
  const { data, isLoading } = useUserDataQuery();
  const isDarkMode = useDarkModeSelector();
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "pt-BR">(
    getCurrentLanguage()
  );

  const pickerRef = useRef<Picker<"en" | "pt-BR">>();

  function handleChangeLanguage() {
    if (Platform.OS === "android") {
      pickerRef?.current?.focus();
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancelar", "Português", "English"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            setSelectedLanguage("pt-BR");
          } else if (buttonIndex === 2) {
            setSelectedLanguage("en");
          }
        }
      );
    }
  }

  useEffect(() => {
    changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    setSelectedLanguage(getCurrentLanguage());
  }, []);

  const renderLanguagesPickers = () => {
    if (Platform.OS === "android") {
      return (
        <Picker
          ref={pickerRef as unknown as undefined}
          style={{
            width: "50%",
          }}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="Português" value="pt-BR" />
          <Picker.Item label="English" value="en" />
        </Picker>
      );
    } else {
      const getCurrentLanguageName = () => selectedLanguage === 'en' ? 'English' : 'Português';
      return (
        <LanguageText>{getCurrentLanguageName()}</LanguageText>
      )
    }
  };
  return (
    <Container>
      <Header>
        <Title numberOfLines={1} ellipsizeMode="clip">
          {getMessage("profile")}
        </Title>
        <IconContainer
          onPress={() => {
            dispatch(
              updateUser({
                id: "",
              })
            );
          }}
        >
          <Feather name="log-out" size={32} color={theme.colors.main_text} />
        </IconContainer>
      </Header>
      <Content>
        <InfoGroupContainer>
          <InfoContainer>
            <InfoTitle>{getMessage("name")}</InfoTitle>
            <Skeleton
              isLoading={isLoading}
              style={{
                width: "80%",
              }}
            >
              <InfoText>{data?.name}</InfoText>
            </Skeleton>
          </InfoContainer>

          <InfoContainer>
            <InfoTitle>Email</InfoTitle>
            <Skeleton
              isLoading={isLoading}
              style={{
                width: "80%",
              }}
            >
              <InfoText>{data?.email}</InfoText>
            </Skeleton>
          </InfoContainer>
        </InfoGroupContainer>

        <InfoGroupContainer>
          <ConfigHeader>
            <Feather name="settings" size={32} color={theme.colors.main_text} />
            <SubTitle>{getMessage("preferences")}</SubTitle>
          </ConfigHeader>
          <ConfigContainer>
            <PreferenceTitleContainer>
              <Feather name="moon" size={24} color={theme.colors.main_text} />
              <ConfigTitle>{getMessage("darkMode")}</ConfigTitle>
            </PreferenceTitleContainer>
            <Switch
              thumbColor={theme.colors.main}
              trackColor={{
                false: theme.colors.text_details,
                true: theme.colors.main_text,
              }}
              value={isDarkMode}
              onValueChange={(value) => {
                dispatch(
                  updateDarkMode({
                    isDarkMode: value,
                  })
                );
              }}
            />
          </ConfigContainer>
          <Separator />
          <ConfigLanguageContainer onPress={handleChangeLanguage}>
            <PreferenceTitleContainer>
              <Feather name="globe" size={24} color={theme.colors.main_text} />
              <ConfigTitle>{getMessage("language")}</ConfigTitle>
            </PreferenceTitleContainer>
            {renderLanguagesPickers()}
          </ConfigLanguageContainer>
        </InfoGroupContainer>
      </Content>
    </Container>
  );
};
