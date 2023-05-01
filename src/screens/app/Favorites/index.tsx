import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import {
  Container,
  Header,
  Title,
  IconContainer,
  Content,
  MoviesContainer,
  EmptyContainer,
  EmptyText,
  ImageContainer,
} from "./styles";
import { useTheme } from "styled-components/native";
import { FlatList } from "react-native";
import { useFavoritesQuery } from "../../../hooks/queries/useFavoritesQuery";
import { FavoriteMovie } from "../../../components/FavoriteMovie";
import { Loading } from "../../../components/Loading";
import { useLanguage } from "../../../hooks/locale/useLanguage";

export const Favorite = () => {
  const theme = useTheme();
  const { favorites, isLoading, refetch } = useFavoritesQuery();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const { getMessage } = useLanguage();

  const renderFavoritesList = () => {
    if (isLoading) {
      return <Loading size={128} />;
    }

    return (
      <FlatList
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FavoriteMovie
            item={item}
            isDeleteMode={isDeleteMode}
            onRemoveSuccess={refetch}
          />
        )}
        data={favorites}
        initialNumToRender={4}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        style={{
          width: "100%",
          height: "100%",
        }}
        ListEmptyComponent={
          <EmptyContainer>
            <EmptyText>{getMessage("emptyFavorites")}</EmptyText>
          </EmptyContainer>
        }
      />
    );
  };

  return (
    <Container>
      <Header>
        <Title numberOfLines={1} ellipsizeMode="clip">
          {getMessage("favorites")}
        </Title>
        {isDeleteMode ? (
          <IconContainer
            onPress={() => {
              setIsDeleteMode(false);
            }}
          >
            <Feather name="x" size={32} color={theme.colors.main_text} />
          </IconContainer>
        ) : (
          <IconContainer
            onPress={() => {
              setIsDeleteMode(true);
            }}
          >
            <Feather name="trash" size={32} color={theme.colors.main_text} />
          </IconContainer>
        )}
      </Header>
      <Content>
        <MoviesContainer>{renderFavoritesList()}</MoviesContainer>
      </Content>
    </Container>
  );
};
