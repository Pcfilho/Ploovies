import {
  Container,
  Header,
  HeaderTitle,
  Content,
  ConfigsContainer,
  LanguageText,
} from "./styles";
import { useState } from "react";
import { Dimensions, Platform, TouchableOpacity } from "react-native";
import { SignInForm } from "../../../components/SignInForm";
import { SignUpForm } from "../../../components/SignUpForm";
import { useTopAnimation } from "../../../hooks/animation/useTopAnimation";
import { useLanguage } from "../../../hooks/locale/useLanguage";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import {
  updateDarkMode,
  useDarkModeSelector,
} from "../../../store/reducers/darkModeReducer";
import { useDispatch } from "react-redux";
const { height } = Dimensions.get("screen");

type Screens = "Login" | "Register";

export const Login = () => {
  const { getMessage } = useLanguage();
  const [formScreens, setFormScreens] = useState<Screens>("Login");
  const isLogin = () => formScreens === "Login";
  const inputRange = [0, 100];
  const outputRange = [height * 0.7, 0];
  const onContentChange = () => {
    setFormScreens(isLogin() ? "Register" : "Login");
  };
  const theme = useTheme();
  const isDarkMode = useDarkModeSelector();
  const dispatch = useDispatch();
  const { changeLanguage, isEn } = useLanguage();

  const { contentTopStyle, startAnimation } = useTopAnimation(
    inputRange,
    outputRange,
    onContentChange
  );

  const handleLanguagePress = () => {
    if (isEn()) {
      changeLanguage("pt-BR");
    } else {
      changeLanguage("en");
    }
  };

  const handleDarkModePress = () => {
    if (isDarkMode) {
      dispatch(updateDarkMode({ isDarkMode: false }));
    } else {
      dispatch(updateDarkMode({ isDarkMode: true }));
    }
  };

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Header>
        <HeaderTitle>{getMessage("welcome")}</HeaderTitle>
        <ConfigsContainer>
          <TouchableOpacity onPress={handleDarkModePress}>
            {isDarkMode ? (
              <Feather
                name="sun"
                size={24}
                color={theme.colors.background_primary}
              />
            ) : (
              <Feather
                name="moon"
                size={24}
                color={theme.colors.background_primary}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLanguagePress}>
            <LanguageText>{isEn() ? "🇺🇸" : "🇧🇷"} </LanguageText>
          </TouchableOpacity>
        </ConfigsContainer>
      </Header>
      <Content style={[contentTopStyle]}>
        {isLogin() ? (
          <SignInForm handleChangeScreens={startAnimation} />
        ) : (
          <SignUpForm handleChangeScreens={startAnimation} />
        )}
      </Content>
    </Container>
  );
};
