import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([])
    const [myReviews, setMyReviews] = useState({})
    const [watchlist, setWatchlist] = useState([])

    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)) {
            newFavorites = [...favorites, movie.id];
        }
        else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };

    const addReview = (movie, review) => {
        setMyReviews({ ...myReviews, [movie.id]: review })
    };
    //console.log(myReviews);

    // We will use this function in a later section
    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
    };

    const addToWatchlist = (movie) => {
        let newEntry = [];
        if (!watchlist.includes(movie.id)) {
            newEntry = [...watchlist, movie.id];
        }
        else {
            newEntry = [...watchlist];
        }
        setWatchlist(newEntry)
        console.log(newEntry)
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                watchlist,
                addToFavorites,
                removeFromFavorites,
                addReview,
                addToWatchlist
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;