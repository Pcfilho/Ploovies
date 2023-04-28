const iconBaseUrl = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/"
const getIconUrl = (endPoint: string) => iconBaseUrl + endPoint;

const iconTypes = {
  28: getIconUrl("Smilies/Collision.png"),
  12: getIconUrl("Smilies/Cowboy%20Hat%20Face.png"),
  16: getIconUrl("Smilies/Grinning%20Cat.png"),
  35: getIconUrl("Smilies/Face%20with%20Tears%20of%20Joy.png"),
  80: getIconUrl("People/Man%20Police%20Officer.png"),
  99: getIconUrl("Objects/Camera.png"),
  18: getIconUrl("Smilies/Downcast%20Face%20with%20Sweat.png"),
  10751: getIconUrl("People/Family%20Man%2C%20Woman%2C%20Boy.png"),
  14: getIconUrl("People/Elf.png"),
  36: getIconUrl("Objects/Scroll.png"),
  27: getIconUrl("Smilies/Ghost.png"),
  10402: getIconUrl("Objects/Microphone.png"),
  9648: getIconUrl("People/Detective.png"),
  10749: getIconUrl("Smilies/Heart%20with%20Arrow.png"),
  878: getIconUrl("Smilies/Alien.png"),
  10770: getIconUrl("Objects/Television.png"),
  53: getIconUrl("Smilies/Anguished%20Face.png"),
  10752: getIconUrl("Objects/Military%20Helmet.png"),
  37: getIconUrl("Objects/Banjo.png"),
};

export const getIconById = (id: number): string => {
  return iconTypes[id as keyof typeof iconTypes];
};