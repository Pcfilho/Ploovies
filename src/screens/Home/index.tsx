import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import {
  Container,
  Header,
  Title,
  SubTitle,
  SearchWrapper,
  IconContainer,
  Input,
  Content,
  GenreContainer,
  MoviesContainer,
} from "./styles";
import { useTheme } from "styled-components/native";
import { Movie } from "../../components/Movie";
import { Genre } from "../../components/Genre";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { moviesApi } from "../../service/moviesApi";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";

interface IGenre {
  id: number;
  name: string;
}

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const Home = () => {
  const theme = useTheme();
  const genreSelected = useSelector((storeState) => storeState.genre);
  const [genres, setGenres] = useState<IGenre[]>([] as IGenre[]);
  const [movies, setMovies] = useState<IMovie[]>([] as IMovie[]);
  const [moviesFiltered, setMoviesFiltered] = useState<IMovie[]>(
    [] as IMovie[]
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState("");

  const titleAnimatedWidth = useSharedValue(0);

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const interpolatedWidth = interpolate(
      titleAnimatedWidth.value,
      [0, 1],
      [60, 0]
    );

    const interpolateOpacity = interpolate(
      titleAnimatedWidth.value,
      [0, 1],
      [1, 0],
      { extrapolateRight: Extrapolation.CLAMP }
    );
    return {
      width: withTiming(`${interpolatedWidth}%`, {
        duration: 1000,
      }),
      opacity: withTiming(interpolateOpacity, { duration: 1500 }),
    };
  });

  useEffect(() => {
    if (searchingText) {
      const filteredMovies = movies.filter((movie) =>
        movie.title.includes(searchingText)
      );
      setMoviesFiltered(filteredMovies);
      console.log(filteredMovies);
    } else {
      setMoviesFiltered(movies);
    }
  }, [searchingText]);

  useEffect(() => {
    const getFilteredMovies = () => {
      if (genreSelected) {
        return movies.filter((movie) =>
          movie.genre_ids.includes(Number(genreSelected))
        );
      }
      return movies;
    };
    setMoviesFiltered(getFilteredMovies());
  }, [genreSelected, movies]);

  useEffect(() => {
    const getGenresList = async () => {
      const { data } = await moviesApi.getGenresList();
      setGenres([...data.genres]);
    };

    const getMoviesList = async () => {
      const { data } = await moviesApi.getMoviesList("popular");
      setMovies([...data.results]);
    };

    getGenresList();
    getMoviesList();
    return () => {
      getGenresList();
      getMoviesList();
    };
  }, []);

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
                titleAnimatedWidth.value = 0;
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
              titleAnimatedWidth.value = 1;
              setIsSearching(true);
            }}
          >
            <Feather
              name="search"
              size={24}
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
            renderItem={({ item }) => <Movie item={item} />}
            data={moviesFiltered}
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
