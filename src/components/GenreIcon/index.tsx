import React from "react";
import { Container } from "./styles";
import { Image } from "expo-image";

interface Props {
  borderRadius?: number;
  size?: number;
  iconId: keyof typeof iconTypes;
}

export const iconTypes: { [key: number]: any; }= {
  28: require("../../assets/EmojisIcons/Collision.png"),
  12: require("../../assets/EmojisIcons/Cowboy.png"),
  16: require("../../assets/EmojisIcons/GrinningCat.png"),
  35: require("../../assets/EmojisIcons/FaceWithTearsOfJoy.png"),
  80: require("../../assets/EmojisIcons/ManPoliceOfficer.png"),
  99: require("../../assets/EmojisIcons/Camera.png"),
  18: require("../../assets/EmojisIcons/DowncastFace.png"),
  10751: require("../../assets/EmojisIcons/FamilyManWomanBoy.png"),
  14: require("../../assets/EmojisIcons/Elf.png"),
  36: require("../../assets/EmojisIcons/Scroll.png"),
  27: require("../../assets/EmojisIcons/Ghost.png"),
  10402: require("../../assets/EmojisIcons/Microphone.png"),
  9648: require("../../assets/EmojisIcons/Detective.png"),
  10749: require("../../assets/EmojisIcons/HeartWithArrow.png"),
  878: require("../../assets/EmojisIcons/Alien.png"),
  10770: require("../../assets/EmojisIcons/Television.png"),
  53: require("../../assets/EmojisIcons/AnguishedFace.png"),
  10752: require("../../assets/EmojisIcons/MilitaryHelmet.png"),
  37: require("../../assets/EmojisIcons/Banjo.png"),
  1000: require("../../assets/EmojisIcons/EmptyDataEmoji.png")
};


export function GenreIcon({
  borderRadius = 0,
  size = 32,
  iconId,
}: Props) {
  const getIconPath = () => iconTypes[iconId];

  return (
    <Container>
      <Image
        source={getIconPath()}
        contentFit="contain"
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          borderRadius: borderRadius,
        }}

      />
    </Container>
  );
}
