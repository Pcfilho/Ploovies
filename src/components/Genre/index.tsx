import React from "react";
import { Container, Title } from "./styles";
import { Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateGenre } from "../../store/reducers/genreReducer";

interface IGenre {
  id: number;
  name: string;
}

interface Props {
  item: IGenre;
}

const iconTypes = {
  28: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Collision.png",
  12: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Cowboy%20Hat%20Face.png",
  16: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Cat.png",
  35: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Tears%20of%20Joy.png",
  80: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Police%20Officer.png",
  99: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Camera.png",
  18: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Downcast%20Face%20with%20Sweat.png",
  10751:
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Family%20Man%2C%20Woman%2C%20Boy.png",
  14: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Elf.png",
  36: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Scroll.png",
  27: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Ghost.png",
  10402:
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Microphone.png",
  9648: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Detective.png",
  10749:
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20with%20Arrow.png",
  878: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Alien.png",
  10770:
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Television.png",
  53: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Anguished%20Face.png",
  10752:
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Military%20Helmet.png",
  37: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Banjo.png",
};

export const Genre = ({ item }: Props) => {
  const genreSelected = useSelector((storeState) => storeState.genre);
  const dispatch = useDispatch();
  const isSelected = () => genreSelected === item.id;

  const getIconById = (id: number): string => {
    return iconTypes[id as keyof typeof iconTypes];
  };

  function handleGenreSelect() {
    if (isSelected()) {
      dispatch(updateGenre(''));
      return;
    }
    dispatch(updateGenre(item.id));
  }

  return (
    <Container
      onPress={handleGenreSelect}
      isSelected={isSelected()}
    >
      <Image
        source={{ uri: getIconById(item.id) }}
        style={{
          height: 35,
          width: 35,
        }}
      />
      <Title isSelected={isSelected()}>{item.name}</Title>
    </Container>
  );
};
