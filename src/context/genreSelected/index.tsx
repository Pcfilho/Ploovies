import React, { ReactNode, createContext, useContext, useState } from "react";

interface GenreProviderProps {
  children: ReactNode;
}

interface GenreContextInterface {
  genreSelected: number;
  updateGenreSelected: (genre: number) => void;
}

const GenreContext = createContext<GenreContextInterface>(
  {} as GenreContextInterface
);
export const GenreProvider = ({ children }: GenreProviderProps) => {
  const [genreSelected, setGenreSelected] = useState(0);

  const updateGenreSelected = (newGenreSelected: number) => {
    if (genreSelected === newGenreSelected) {
      setGenreSelected(0);
    } else {
      setGenreSelected(newGenreSelected);
    }
  };
  return (
    <GenreContext.Provider
      value={{
        genreSelected,
        updateGenreSelected,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};

export const useGenreContext = () => {
  const genreContext = useContext(GenreContext);
  return genreContext;
};
