import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?apikey=4d7b2a89&s=${searchValue}`;

    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(()=>{
    const favouritesStored = JSON.parse(localStorage.getItem("react-movie-app-favourites"));
    if(favouritesStored) setFavourites(favouritesStored);
},[]);

  const saveToLocalStorage = (items) =>{
    localStorage.setItem("react-movie-app-favourites",JSON.stringify(items));
  }
  const AddFavouriteMovie = (movie) => {
    const isNewMovie = favourites.find((mo) => {
      return mo.imdbID === movie.imdbID;
    });
    if (!isNewMovie) {
      saveToLocalStorage([...favourites, movie]);
      setFavourites([...favourites, movie]);
    } else {
      toast.warn("Movie already added to favourites");
    }
  };

  const RemoveFavouriteMovie = movie => {
    const modifiedArray = favourites.filter(favourite=>{
      return favourite.imdbID !== movie.imdbID;
    })
    setFavourites(modifiedArray);
    saveToLocalStorage(modifiedArray);
  };

  return (
    <div className="container-fluid movie-app">
      <ToastContainer autoClose={3000}position="top-center"></ToastContainer>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading={"Movies"} />
        <SearchBox value={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={AddFavouriteMovie}
          favouriteComponent={true}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading={"Favourites"} />
      </div>
      <div className="row">
        <MovieList movies={favourites} 
        handleFavouritesClick={RemoveFavouriteMovie}
        handleFavourite={RemoveFavouriteMovie} />
      </div>
    </div>
  );
}

export default App;
