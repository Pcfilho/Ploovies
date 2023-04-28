import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
} from "./styles";
import { useTheme } from "styled-components/native";
import { MovieMemo } from "../../components/Movie";
import { Genre } from "../../components/Genre";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useMovies } from "../../hooks/queries/useMovies";
import { IMovie } from "../../@types/movie";
import { useGenres } from "../../hooks/queries/useGenres";
import { useGenreSelector } from "../../store/reducers/genreReducer";

export const Home = () => {
  const theme = useTheme();
  const genreSelected = useGenreSelector();
  const { movies } = useMovies();
  const { genres } = useGenres();
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);

  const titleAnimatedWidth = useSharedValue(0);

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const interpolatedWidth = interpolate(
      titleAnimatedWidth.value,
      [0, 1],
      [60, 0],
      Extrapolate.CLAMP
    );

    const interpolateOpacity = interpolate(
      titleAnimatedWidth.value,
      [0, 1],
      [1, 0]
    );

    return {
      width: withTiming(`${interpolatedWidth}%`, {
        duration: 1000,
      }),
      opacity: withTiming(interpolateOpacity, {
        duration: 1500,
      }),
    };
  });

  useEffect(() => {
    const getFilteredMovies = () => {
      let filteredMovies: typeof movies = movies || [];
      if (genreSelected && filteredMovies) {
        filteredMovies = movies?.filter((movie) =>
          movie.genre_ids.includes(Number(genreSelected))
        );
      }
      if (searchingText && filteredMovies) {
        filteredMovies = filteredMovies.filter((movie) =>
          movie.title.includes(searchingText)
        );
      }
      return filteredMovies;
    };

    setFilteredMovies(getFilteredMovies() || []);
  }, [genreSelected, searchingText, movies]);

  useEffect(() => {
    titleAnimatedWidth.value = Number(isSearching);
  }, [isSearching]);

  return (
    <Container>
      <Header>
        <Title
          style={[titleAnimatedStyle]}
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
              placeholder="Procurar filme"
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
            data={genres}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </GenreContainer>
        <MoviesContainer>
          <FlatList
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <MovieMemo item={item} />}
            data={filteredMovies}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            style={{
              width: "100%",
            }}
          />
        </MoviesContainer>
      </Content>
    </Container>
  );
};
