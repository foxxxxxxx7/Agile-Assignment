import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcoming } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { useQuery } from 'react-query';
import PlaylistAddIcon from '../components/cardIcons/addToWatchlist';


const UpcomingPage = (props) => {
    const { data, error, isLoading, isError } = useQuery('upcoming', getUpcoming)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;

    const watchlist = movies.filter(m => m.watchlist)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))

    return (
        <PageTemplate
            title='Upcoming Movies'
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <AddToFavoritesIcon movie={movie} />
                        <PlaylistAddIcon movie={movie} />
                    </>
                );

            }}
        />
    );
};
export default UpcomingPage;
