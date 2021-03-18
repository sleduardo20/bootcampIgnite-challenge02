import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface GenreContextData {
  genres: GenreResponseProps[];
  movies: MovieProps[];
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  handleClickButton:(id: number) => void;
}

const GenreContext = createContext<GenreContextData>({} as GenreContextData);

const GenreProvider: React.FC = ({children}) => {
  
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  return (
    <GenreContext.Provider value={{
        genres,
        movies,
        selectedGenreId,
        selectedGenre,
        handleClickButton
        }}>
      {children}
    </GenreContext.Provider>
  )
}

function useGenre(): GenreContextData {
  const context = useContext(GenreContext);

  if (!context) {
    throw new Error('useGenre not gereded')
  }
  return context;
}

export {GenreProvider, useGenre,};
