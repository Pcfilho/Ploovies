import React, { useState } from "react";
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
} from "react-native";
import { CompanyMemo } from "../../../components/Company";
import { ActorMemo } from "../../../components/Actor";
import Animated from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { ReviewMemo } from "../../../components/Review";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDetailsQuery } from "../../../hooks/queries/useDetailsQuery";
import { IMovieDetailsParams } from "../../../routes/home.stack.routes";
import { useScrollHeightAnimation } from "../../../hooks/animation/useScrollHeightAnimation";
import { Image } from "../../../components/Image";
import { Skeleton } from "../../../components/Skeleton";
import { useFavoriteMutation } from "../../../hooks/mutations/useFavoriteMutation";
import { useFavoritesQuery } from "../../../hooks/queries/useFavoritesQuery";
import { useFavoriteDeleteMutation } from "../../../hooks/mutations/useFavoriteDeleteMutation";
import { Loading } from "../../../components/Loading";
import { useRefreshOnFocus } from "../../../hooks/queries/useRefreshOnFocus";
import { useLanguage } from "../../../hooks/locale/useLanguage";

const { height } = Dimensions.get("screen");
const inputRange = [0, height * 1.5];
const outputRange = [height * 0.5, height * 0.22];

export const MovieDetails = () => {
  const theme = useTheme();
  const { getMessage } = useLanguage();
  const { favorites, refetch, isLoading } = useFavoritesQuery();
  const route = useRoute<IMovieDetailsParams>();
  const navigate = useNavigation();
  const mutation = useFavoriteMutation(onAddSuccess);
  const { mutation: deleteMutation } =
    useFavoriteDeleteMutation(onRemoveSuccess);
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(favorites.includes(item));
  const {
    movieDetails,
    reviews,
    actors,
    isLoadingMovieDetails,
    isLoadingActors,
    isLoadingReviews,
  } = useDetailsQuery(item.id);
  const { animatedHeightStyle, scrollHandler } = useScrollHeightAnimation(
    inputRange,
    outputRange
  );

  useRefreshOnFocus(isMovieInFavorites);

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

  async function isMovieInFavorites() {
    setIsFavorite(!!favorites.find((f) => f.id === item.id));
  }

  function onAddSuccess() {
    setIsFavorite(true);
    refetch();
  }

  function onRemoveSuccess() {
    setIsFavorite(false);
    refetch();
  }

  async function favoriteMovie() {
    if (!mutation.isLoading) {
      await mutation.mutateAsync(item);
    }
  }

  async function removeFromFavorites() {
    if (!deleteMutation.isLoading) {
      await deleteMutation.mutateAsync(item);
    }
  }

  async function handleFavoriteMovie() {
    if (isFavorite) {
      await removeFromFavorites();
    } else {
      await favoriteMovie();
    }
  }

  const renderFavoriteButton = () => {
    if (mutation.isLoading || deleteMutation.isLoading || isLoading) {
      return <Loading />;
    }

    return (
      <TouchableOpacity onPress={handleFavoriteMovie}>
        <FavoriteButton name={isFavorite ? "star" : "star-border"} size={28} />
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[animatedHeightStyle, styles.imageContainer]}>
        <Image imageSource={movieDetails?.imageSource} size={64} />
        <ButtonsContainer>
          <LeftButtonsContainer>
            <TouchableOpacity
              onPress={() => {
                navigate.goBack();
              }}
            >
              <BackButton name="chevron-left" size={32} />
            </TouchableOpacity>
          </LeftButtonsContainer>
          <RightButtonsContainer>
            {renderFavoriteButton()}
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
        scrollEnabled={
          !isLoadingMovieDetails && !isLoadingActors && !isLoadingReviews
        }
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Header>
          <HeaderWrapper>
            <Skeleton isLoading={isLoadingMovieDetails}>
              <Title>{movieDetails?.title}</Title>
            </Skeleton>
            <Skeleton
              isLoading={isLoadingMovieDetails}
              style={{ width: "40%" }}
            >
              <OverviewText>{movieDetails?.realeseDate}</OverviewText>
            </Skeleton>
          </HeaderWrapper>
          <Skeleton
            isLoading={isLoadingMovieDetails}
            style={{
              width: "20%",
              height: "30%",
            }}
          >
            <RatingContainer>
              <Star name="star" size={12} />
              <Rating>{movieDetails?.vote_average?.toFixed(1)}</Rating>
            </RatingContainer>
          </Skeleton>
        </Header>
        <OverviewContainer>
          <Skeleton
            isLoading={isLoadingMovieDetails}
            style={{
              height: 200,
              width: "100%",
            }}
          >
            <OverviewText>{movieDetails?.overview}</OverviewText>
          </Skeleton>
        </OverviewContainer>

        <CompaniesContainer>
          <CompaniesTitle>{getMessage("companies")}</CompaniesTitle>
          {isLoadingMovieDetails ? (
            <FlatList
              keyExtractor={(item) => String(item)}
              data={[...Array(10).keys()]}
              renderItem={() => (
                <Skeleton
                  isLoading
                  style={{
                    height: 80,
                    width: 120,
                    marginHorizontal: 12,
                  }}
                />
              )}
              initialNumToRender={3}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={movieDetails?.production_companies}
              renderItem={({ item }) => (
                <CompanyMemo
                  companyName={item.name}
                  imageEndpoint={item.logo_path}
                />
              )}
              initialNumToRender={3}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </CompaniesContainer>

        <ActorsContainer>
          <ActorsTitle>{getMessage("actors")}</ActorsTitle>
          {isLoadingActors ? (
            <FlatList
              keyExtractor={(item) => String(item)}
              data={[...Array(10).keys()]}
              renderItem={() => (
                <Skeleton
                  isLoading
                  style={{
                    height: 80,
                    width: 120,
                    marginHorizontal: 12,
                  }}
                />
              )}
              initialNumToRender={3}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={actors}
              renderItem={({ item }) => (
                <ActorMemo
                  name={item.name}
                  character={item.character}
                  imageEndPoint={item.profile_path}
                />
              )}
              initialNumToRender={5}
              bounces
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </ActorsContainer>

        <ActorsContainer>
          <ActorsTitle>{getMessage("avaliations")}</ActorsTitle>
          <FlatList
            keyExtractor={(item) => String(item.id)}
            data={reviews}
            renderItem={({ item }) => <ReviewMemo item={item} />}
            showsVerticalScrollIndicator={false}
            initialNumToRender={2}
            ListFooterComponent={<ScreenFooter />}
            scrollEnabled={false}
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
