import { Button } from "./Button";

import '../styles/sidebar.scss'
import {useGenre } from "../hooks";

export function SideBar() {

  const {genres,selectedGenreId,handleClickButton} = useGenre();
  
  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          id={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

  </nav>
  )
};