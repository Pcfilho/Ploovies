import { FlatList } from "react-native";
import { Container, Star } from "./styles";

interface Props {
  vote_average: number;
}

export const Stars = ({ vote_average }: Props) => {
  return (
    <Container>
      <FlatList
        keyExtractor={(item) => item.toString()}
        data={[...Array(5).keys()]}
        renderItem={({ item }) => {
          const isSelected = vote_average > item * 2;
          return (
          <Star
            name={isSelected ? "star" : "star-border"}
            size={16}
          />
        )}}
        horizontal
      />
    </Container>
  );
};
