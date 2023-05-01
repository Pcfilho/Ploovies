import React from "react";
import { Container, ImageContainer, Title } from "./styles";
import { GenreIcon } from "../GenreIcon";
import { useGenreContext } from "../../context/genreSelected";
import { GenreModel } from "../../models/genre";
interface Props {
  item: GenreModel;
}

export const Genre = ({ item }: Props) => {
  const {genreSelected, updateGenreSelected} = useGenreContext(); 
  const isSelected = () => genreSelected === item.id

  const handleGenreSelect = async () => {
    updateGenreSelected(item.id);
  }

  return (
    <Container onPress={handleGenreSelect} isSelected={isSelected()}>
      <ImageContainer>
        <GenreIcon iconId={item.id} />
      </ImageContainer>
      <Title isSelected={isSelected()}>{item.name}</Title>
    </Container>
  );
};
