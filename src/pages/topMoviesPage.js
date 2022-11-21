import React, { useState, useEffect } from "react";
import { getTopMovies } from "../api/tmdb-api";
import MovieListPageTemplate from '../components/templateMovieListPage'
import Spinner from '../components/spinner';
import PlaylistAddIcon from '../components/cardIcons/addToWatchlist';
import { useQuery } from 'react-query';

const TopMoviesPage = (props) => {
    const { isLoading, isError, error, data } = useQuery( 'topMovies', getTopMovies)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    const movie = data.results;
    console.log(movie)

    // Redundant, but necessary to avoid app crashing.
    const watchlist = movie.filter(m => m.watchlist)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))

   

    return (
        <>
            <MovieListPageTemplate
                title="Top Rated Movies"
                movies={movie}
                action={(movie) => {
                    return <PlaylistAddIcon movie={movie} />
                }}
            />
        </>
    );
};
export default TopMoviesPage;