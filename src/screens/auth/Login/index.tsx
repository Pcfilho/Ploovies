import { Container, Header, HeaderTitle, Content } from "./styles";
import { useState } from "react";
import { Dimensions, Platform } from "react-native";
import { SignInForm } from "../../../components/SignInForm";
import { SignUpForm } from "../../../components/SignUpForm";
import { useTopAnimation } from "../../../hooks/animation/useTopAnimation";
import { useLanguage } from "../../../hooks/locale/useLanguage";

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

  const { contentTopStyle, startAnimation } = useTopAnimation(
    inputRange,
    outputRange,
    onContentChange
  );

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Header>
        <HeaderTitle>{getMessage('welcome')}</HeaderTitle>
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
