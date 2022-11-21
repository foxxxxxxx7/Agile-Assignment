import React from "react";
import { getTopTV } from "../api/tmdb-api";
import TVListPageTemplate from '../components/templateTVListPage'
import Spinner from '../components/spinner';
import PlaylistAddIcon from '../components/cardIcons/addToTVWatchlist';
import { useQuery } from 'react-query';

const TopTVPage = (props) => {
    const { isLoading, isError, error, data, } = useQuery( 'topTV', getTopTV)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const tv = data.results;
    console.log(tv)

    // Redundant, but necessary to avoid app crashing.
    const watchlistTV = tv.filter(m => m.watchlist)
    localStorage.setItem('watchlistTV', JSON.stringify(watchlistTV))

    return (
        <>
            <TVListPageTemplate
                name="Top Rated TV Shows"
                tv={tv}
                action={(tv) => {
                    return <PlaylistAddIcon tv={tv} />
                }}
            />
        </>
    );
};
export default TopTVPage;