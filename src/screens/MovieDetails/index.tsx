import React from "react";
import {
  Container,
  Header,
  Title,
  RatingContainer,
  Rating,
  Star,
  OverviewContainer,
  OverviewText,
  CompaniesContainer,
  CompaniesTitle,
  ActorsContainer,
  ActorsTitle,
  ButtonsContainer,
  FavoriteButton,
  ShareButton,
  HeaderWrapper,
  LeftButtonsContainer,
  RightButtonsContainer,
  BackButton,
  ScreenFooter,
} from "./styles";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
  Image,
} from "react-native";
import { Company } from "../../components/Company";
import { Actor } from "../../components/Actor";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { Review } from "../../components/Review";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMovieDetails } from "../../hooks/queries/useMovieDetails";
import { IMovieDetailsParams } from "../../routes/home.routes";
const { height } = Dimensions.get("screen");
const inputRange = [0, height * 1.5];
const outputRange = [height * 0.5, height * 0.22];

export const MovieDetails = () => {
  const theme = useTheme();
  const route = useRoute<IMovieDetailsParams>();
  const navigate = useNavigation();      
  const { movieDetails, reviews, actors } = useMovieDetails(route.params.item.id);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: movieDetails?.imageSource,
        url: movieDetails?.imageSource || "",
        title: `Compartilhar poster de ${movieDetails?.title}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const imageContainerHeightStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        inputRange,
        outputRange,
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View
        style={[imageContainerHeightStyleAnimation, styles.imageContainer]}
      >
        {movieDetails?.imageSource ? (
          <Image
            source={{ uri: movieDetails?.imageSource }}
            resizeMode="cover"
            style={{
              height: "100%",
            }}
          />
        ) : null}

        <ButtonsContainer>
          <LeftButtonsContainer>
            <TouchableOpacity onPress={() => { navigate.goBack() }}>
              <BackButton name="chevron-left" size={32} />
            </TouchableOpacity>
          </LeftButtonsContainer>
          <RightButtonsContainer>
            <TouchableOpacity>
              <FavoriteButton name="star" size={28} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onShare()}>
              <ShareButton name="share" size={28} />
            </TouchableOpacity>
          </RightButtonsContainer>
        </ButtonsContainer>
      </Animated.View>

      <Animated.ScrollView
        style={{
          backgroundColor: theme.colors.background_primary,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 20,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Header>
          <HeaderWrapper>
            <Title>{movieDetails?.title}</Title>
            <OverviewText>{movieDetails?.realeseDate}</OverviewText>
          </HeaderWrapper>

          <RatingContainer>
            <Star name="star" size={12} />
            <Rating>{movieDetails?.vote_average?.toFixed(1)}</Rating>
          </RatingContainer>
        </Header>
        <OverviewContainer>
          <OverviewText>{movieDetails?.overview}</OverviewText>
        </OverviewContainer>

        <CompaniesContainer>
          <CompaniesTitle>Empresas produtoras</CompaniesTitle>
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={movieDetails?.production_companies}
            renderItem={({ item }) => (
              <Company companyName={item.name} imageEndpoint={item.logo_path} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </CompaniesContainer>

        <ActorsContainer>
          <ActorsTitle>Atores</ActorsTitle>
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={actors}
            renderItem={({ item }) => (
              <Actor
                name={item.name}
                character={item.character}
                imageEndPoint={item.profile_path}
              />
            )}
            bounces
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </ActorsContainer>

        <ActorsContainer>
          <ActorsTitle>Avaliações</ActorsTitle>
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={reviews}
            renderItem={({ item }) => <Review item={item} />}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <ScreenFooter />
            }
          />
        </ActorsContainer>
      </Animated.ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "50%",
    marginBottom: -80,
  },
});
