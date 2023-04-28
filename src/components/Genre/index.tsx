import React, { memo, useCallback, useEffect, useState } from "react";
import { Container, Title } from "./styles";
import { Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateGenre, useGenreSelector } from "../../store/reducers/genreReducer";
import { getIconById } from "./utils/iconTypes";

interface IGenre {
  id: number;
  name: string;
}

interface Props {
  item: IGenre;
}

export const Genre = ({ item }: Props) => {
  const genreSelected = useGenreSelector();
  const dispatch = useDispatch();
  const isSelected = () => genreSelected === String(item.id);
  const [iconSource, setIconSource] = useState("");

  const handleGenreSelect = useCallback(() => {
    if (isSelected()) {
      dispatch(updateGenre(""));
      return;
    }
    dispatch(updateGenre(item.id.toString()));
  }, [genreSelected]);

  useEffect(() => {
    setIconSource(getIconById(item.id));
  }, []);

  return (
    <Container onPress={handleGenreSelect} isSelected={isSelected()}>
      <Image
        source={{ uri: iconSource }}
        style={{
          height: 35,
          width: 35,
        }}
      />
      <Title isSelected={isSelected()}>{item.name}</Title>
    </Container>
  );
};
