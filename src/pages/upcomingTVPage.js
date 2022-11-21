import React from "react";
import TemplateTVPage from '../components/templateTVListPage'
import { getUpcomingTV } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToTVFavoritesIcon from '../components/cardIcons/addToTVFavorites'
import { useQuery } from 'react-query';
import PlaylistAddIcon from '../components/cardIcons/addToTVWatchlist';


const UpcomingTVPage = (props) => {
    const { data, error, isLoading, isError } = useQuery('upcomingTV', getUpcomingTV)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const tv = data.results;

    const watchlist = tv.filter(m => m.watchlist)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))

    return (
        <TemplateTVPage
            title='Upcoming TV Shows'
            tv={tv}
            action={(tv) => {
                return (
                    <>
                        <AddToTVFavoritesIcon tv={tv} />
                        <PlaylistAddIcon tv={tv} />
                    </>
                );

            }}
        />
    );
};
export default UpcomingTVPage;
