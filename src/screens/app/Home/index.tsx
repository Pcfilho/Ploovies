import { useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import {
  Container,
  Header,
  Title,
  SearchWrapper,
  IconContainer,
  Input,
  Content,
  GenreContainer,
  MoviesContainer,
  EmptyContainer,
  EmptyText,
  ImageContainer,
  LoadMoreText,
  LoadMoreContainer,
} from "./styles";
import { useTheme } from "styled-components/native";
import { Movie } from "../../../components/Movie";
import { Genre } from "../../../components/Genre";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { useMoviesQuery } from "../../../hooks/queries/useMoviesQuery";
import { useWidthAnimation } from "../../../hooks/animation/useWidthAnimation";
import { GenreIcon } from "../../../components/GenreIcon";
import { Loading } from "../../../components/Loading";
import { useGenreContext } from "../../../context/genreSelected";
import { useGenreType } from "../../../hooks/locale/useGenreTypes";
import { useScrollToTop } from "@react-navigation/native";

export const Home = () => {
  const theme = useTheme();
  const { getMessage, genreTypes } = useGenreType();
  const { genreSelected } = useGenreContext();
  const { movies, isFetchingNextPage, nextPageHandler, isLoadingMovies } =
    useMoviesQuery();
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState("");
  const { widthAnimatedStyle } = useWidthAnimation(isSearching, [isSearching]);
  const listRef = useRef(null);

  useScrollToTop(listRef);
  const renderMoviesList = () => {
    function getFilteredMovies() {
      let filteredMovies: typeof movies = movies || [];
      const isSearchingAndNotEmpty = isSearching && !!searchingText;
      if (genreSelected || isSearchingAndNotEmpty) {
        filteredMovies = movies?.filter((movie) => {
          return (
            (!!genreSelected &&
              !!movie.genre_ids.length &&
              movie.genre_ids[0] === genreSelected) ||
            (isSearchingAndNotEmpty &&
              movie.title.toLowerCase().includes(searchingText.toLowerCase()))
          );
        });
      }

      return filteredMovies;
    }

    const filteredMovies = getFilteredMovies();

    if (isLoadingMovies) {
      return <Loading size={124} />;
    }

    if (filteredMovies.length) {
      return (
        <FlatList
          ref={listRef}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Movie item={item} />}
          data={filteredMovies}
          initialNumToRender={4}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          style={{
            width: "100%",
            height: "100%",
          }}
          ListFooterComponent={
            <LoadMoreContainer>
              {isFetchingNextPage ? (
                <Loading />
              ) : (
                <LoadMoreText onPress={nextPageHandler}>
                  {getMessage("loadMoreMovies")}
                </LoadMoreText>
              )}
            </LoadMoreContainer>
          }
          ListFooterComponentStyle={{
            alignItems: "center",
            marginTop: 12,
            marginBottom: 48,
          }}
        />
      );
    }

    return (
      <EmptyContainer>
        <ImageContainer>
          <GenreIcon iconId={1000} size={32} />
        </ImageContainer>
        <EmptyText>{getMessage("noMovieFound")}</EmptyText>
        <LoadMoreContainer>
          {isFetchingNextPage ? (
            <Loading />
          ) : (
            <LoadMoreText onPress={nextPageHandler}>
              Carregue mais filmes!
            </LoadMoreText>
          )}
        </LoadMoreContainer>
      </EmptyContainer>
    );
  };

  return (
    <Container>
      <Header>
        <Title
          style={[widthAnimatedStyle]}
          numberOfLines={1}
          ellipsizeMode="clip"
        >
          Ploovies
        </Title>
        {isSearching ? (
          <SearchWrapper>
            <Feather
              name="search"
              size={24}
              color={theme.colors.text_details}
            />
            <Input
              placeholder={getMessage("searchMovies")}
              onChangeText={setSearchingText}
              value={searchingText}
            />
            <TouchableOpacity
              onPress={() => {
                setIsSearching(false);
                setSearchingText("");
              }}
            >
              <Feather name="x" size={18} color={theme.colors.text_details} />
            </TouchableOpacity>
          </SearchWrapper>
        ) : (
          <IconContainer
            onPress={() => {
              setIsSearching(true);
            }}
          >
            <Feather
              name="search"
              size={32}
              color={theme.colors.text_details}
            />
          </IconContainer>
        )}
      </Header>
      <Content>
        <GenreContainer>
          <FlatList
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <Genre item={item} />}
            data={genreTypes}
            initialNumToRender={8}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </GenreContainer>
        <MoviesContainer>{renderMoviesList()}</MoviesContainer>
      </Content>
    </Container>
  );
};
