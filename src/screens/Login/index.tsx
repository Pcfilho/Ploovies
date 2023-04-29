import { Container, Header, HeaderTitle, Content } from "./styles";
import {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useState } from "react";
import { Dimensions } from "react-native";
import { SignInForm } from "../../components/SignInForm";
import { SignUpForm } from "../../components/SignUpForm";
import { useTopAnimation } from "../../hooks/animation/useTopAnimation";

const { height } = Dimensions.get("screen");

type Screens = "Login" | "Register";

export const Login = () => {
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
    <Container>
      <Header>
        <HeaderTitle>{"Seja\nBem-vindo!"}</HeaderTitle>
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
