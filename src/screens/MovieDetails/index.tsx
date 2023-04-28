import React, { useState, useEffect } from "react";
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
import { moviesApi } from "../../service/moviesApi";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
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
interface IActor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface IReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface ICompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
interface IMovieData {
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  production_companies: ICompany[];
  release_date: string;
  title: string;
  vote_average: number;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const { height } = Dimensions.get("screen");
const inputRange = [0, height * 1.5];
const outputRange = [height * 0.5, height * 0.22];

export const MovieDetails = () => {
  const theme = useTheme();
  const route = useRoute();
  const navigate = useNavigation();
  const [movieData, setMovieData] = useState<IMovieData>({} as IMovieData);
  const [imageSource, setImageSource] = useState("");
  const realeseDate = new Date(movieData.release_date).toLocaleDateString();
  const [actors, setActors] = useState<IActor[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: imageSource,
        url: imageSource,
        title: `Compartilhar poster de ${movieData.title}`,
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
    console.log(event.contentOffset.y);
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

  useEffect(() => {
    const getActorsList = async () => {
      try {
        const { data } = await moviesApi.getCreditsByMovieId(movieData.id);
        const filteredActors = data.cast.filter(
          (actor: IActor) => actor["known_for_department"] === "Acting"
        );

        setActors(filteredActors);
      } catch (error) {}
    };
    const getReviewsList = async () => {
      try {
        const { data } = await moviesApi.getReviewsByMovieId(movieData.id);
        setReviews(data.results);
      } catch (error) {}
    };

    setImageSource(
      movieData?.backdrop_path
        ? moviesApi.getMovieImageOriginal(movieData.backdrop_path)
        : ""
    );
    if (movieData.id) {
      getReviewsList();
      getActorsList();
    }
  }, [movieData]);

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const { data } = await moviesApi.getMovieById(
          route.params.item.id.toString()
        );
        setMovieData(data);
      } catch (error) {}
    };

    getMovieData();
  }, []);

  if (!movieData) return null;

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
        {imageSource ? (
          <Animated.Image
            source={{ uri: imageSource }}
            resizeMode="cover"
            style={{
              height: "100%",
            }}
          />
        ) : null}

        <ButtonsContainer>
          <LeftButtonsContainer>
            <TouchableOpacity onPress={() => { navigate.goBack() }}>
              <BackButton name="chevron-left" size={28} />
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
            <Title>{movieData.title}</Title>
            <OverviewText>{realeseDate}</OverviewText>
          </HeaderWrapper>

          <RatingContainer>
            <Star name="star" size={12} />
            <Rating>{movieData.vote_average?.toFixed(1)}</Rating>
          </RatingContainer>
        </Header>
        <OverviewContainer>
          <OverviewText>{movieData.overview}</OverviewText>
        </OverviewContainer>

        <CompaniesContainer>
          <CompaniesTitle>Empresas produtoras</CompaniesTitle>
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={movieData.production_companies}
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
