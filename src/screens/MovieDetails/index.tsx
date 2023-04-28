import React from "react";

import { 
  Container, 
  ImageContainer, 
  Content,
  Header,
  Title,
  RatingContainer,
  Rating,
  Star,
  OverviewContainer,
  OverviewText,
  CompaniesContainer,
  CompaniesTitle,

} from "./styles";
import { Image } from "expo-image";
import { moviesApi } from "../../service/moviesApi";
import { FlatList } from "react-native";
import { Company } from "../../components/Company";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const movie = {
  adult: false,
  backdrop_path: "/iJQIbOPm81fPEGKt5BPuZmfnA54.jpg",
  belongs_to_collection: null,
  budget: 100000000,
  genres: [
    {
      id: 16,
      name: "Animação",
    },
    {
      id: 12,
      name: "Aventura",
    },
    {
      id: 10751,
      name: "Família",
    },
    {
      id: 14,
      name: "Fantasia",
    },
    {
      id: 35,
      name: "Comédia",
    },
  ],
  homepage: "https://cuevana3.it/pelicula/the-super-mario-bros-movie-2023/",
  id: 502356,
  imdb_id: "tt6718170",
  original_language: "en",
  original_title: "The Super Mario Bros. Movie",
  overview:
    "Mario é um encanador junto com seu irmão Luigi. Um dia, eles vão parar no reino dos cogumelos, governado pela Princesa Peach, mas ameaçado pelo rei dos Koopas, que faz de tudo para conseguir reinar em todos os lugares.",
  popularity: 7212.464,
  poster_path: "/i9XdxHsFrcqLkRWSF1coOHo4R39.jpg",
  production_companies: [
    {
      id: 33,
      logo_path: "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
      name: "Universal Pictures",
      origin_country: "US",
    },
    {
      id: 6704,
      logo_path: "/fOG2oY4m1YuYTQh4bMqqZkmgOAI.png",
      name: "Illumination",
      origin_country: "US",
    },
    {
      id: 12288,
      logo_path: "/e4dQAqZD374H5EuM0W1ljEBWTKy.png",
      name: "Nintendo",
      origin_country: "JP",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "JP",
      name: "Japan",
    },
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  release_date: "2023-04-05",
  revenue: 891438061,
  runtime: 92,
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
  ],
  status: "Released",
  tagline: "",
  title: "Super Mario Bros.: O Filme",
  video: false,
  vote_average: 7.507,
  vote_count: 1454,
};

export const MovieDetails = () => {
  const imageSource = moviesApi.getMovieImageOriginal(movie.backdrop_path);

  return (
    <Container>
      <ImageContainer>
        <Image
          source={imageSource}
          style={{
            height: "100%",
          }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
      </ImageContainer>
      <Content>
        <Header>
          <Title>{movie.title}</Title>

          <RatingContainer>
            <Star
              name="star"
              size={12}
            />
            <Rating>{movie.vote_average.toFixed(1)}</Rating>
          </RatingContainer>
        </Header>
        <OverviewContainer>
          <OverviewText>{movie.overview}</OverviewText>
        </OverviewContainer>
        
        <CompaniesContainer>
          <CompaniesTitle>Empresas produtoras</CompaniesTitle>
          <FlatList 
            keyExtractor={(item) => String(item.id)}
            data={movie.production_companies}
            renderItem={({ item }) => <Company companyName={item.name} imageEndpoint={item.logo_path} />}
            horizontal
            contentContainerStyle={{
              width: '100%',
              justifyContent: 'space-between',
            }}
          />
        </CompaniesContainer>
      </Content>
    </Container>
  );
};
