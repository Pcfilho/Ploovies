import "dotenv/config";

const apiKey = process.env.API_KEY;

export default {
  expo: {
    name: "Foovies",
    slug: "Foovies",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.pcfilho.Ploovies"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.pcfilho.Ploovies"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "edfb178e-06e1-409d-a045-4839a35e29d3"
      },
      apiUrl: process.env.API_URL ?? 'https://api.themoviedb.org/3',
      apiKey: apiKey,
    }
  }
};
