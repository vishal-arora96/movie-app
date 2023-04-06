import React from 'react'

import RemoveFavourites from './RemoveFavourites';
import AddFavourites from './AddFavourites';

function MovieList({movies,handleFavouritesClick,favouriteComponent}) {
  return (
    <>
      {movies.map( (movie,index) => (
        <div className="image-container d-flex justify-content-start m3" key={movie.imdbID}>
            <img src={movie.Poster} alt="movie" />
            <div onClick={()=>handleFavouritesClick(movie)} 
            className='overlay d-flex align-items-center justify-content-center'>
              {favouriteComponent ? <AddFavourites/> : <RemoveFavourites/>}
            </div>
        </div>
      ))}
    </>
  )
}

export default MovieList
