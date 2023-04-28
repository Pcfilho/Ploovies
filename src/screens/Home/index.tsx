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
        <Title>Ploovies</Title>
        {isSearching ? (
          <SearchWrapper>
            <Input placeholder="Procurar filme" />
            <TouchableOpacity onPress={() => setIsSearching(false)}>
              <Feather
                name="x"
                size={18}
                color={theme.colors.text_details}
              />
            </TouchableOpacity>
          </SearchWrapper>
        ) : (
            <IconContainer onPress={() => setIsSearching(true)}>
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
          />
        </MoviesContainer>
      </Content>
    </Container>
  );
};
