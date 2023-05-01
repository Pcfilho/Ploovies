export interface theme {
  colors: {
    background_primary: string;
    main_text: string;
    text: string;
    text_details: string;
    title: string;
    main: string;
    error: string;
    icon_color: string;
    companyText: string;
  },
  fonts: {
    primary_400: string;
    primary_700: string;
    primary_900: string;
  },
}

export const lightTheme: theme = {
  colors: {
    background_primary: '#FAFAFA',
    main_text: '#1B1B1F',
    text: '#7A7A80',
    text_details: '#AEAEB3',
    title: '#47474D',
    main: '#6759C0',
    error: '#DC1637',
    icon_color: '#FFFF',
    companyText: '#1B1B1F',
  },

  fonts: {
    primary_400: 'Lato_400Regular',
    primary_700: 'Lato_700Bold',
    primary_900: 'Lato_900Black',
  },
}

export const darkTheme: theme = {
  colors: {
    background_primary: '#121212',
    main_text: '#FAFAFA',
    text: '#BCBCBC',
    text_details: '#CACACA',
    title: '#47474D',
    main: '#6759C0',
    error: '#DC1637',
    icon_color: '#FFFF',
    companyText: '#1B1B1F',
  },

  fonts: {
    primary_400: 'Lato_400Regular',
    primary_700: 'Lato_700Bold',
    primary_900: 'Lato_900Black',
  },
}