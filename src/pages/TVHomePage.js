import React from "react";
import { getTVs } from "../api/tmdb-api";
import TemplateTVPage from '../components/templateTVListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToTVFavoritesIcon from '../components/cardIcons/addToTVFavorites'

const TVHomePage = (props) => {

    const { data, error, isLoading, isError } = useQuery('discoverTV', getTVs)

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const tv = data.results;

    // Redundant, but necessary to avoid app crashing.
    const tvfavorites = tv.filter(m => m.tvfavorite)
    localStorage.setItem('tvfavorites', JSON.stringify(tvfavorites))

console.log(tvfavorites)

    return (
        <TemplateTVPage
            name="Discover TV Shows"
            tv={tv}
            action={(tv) => {
                return <AddToTVFavoritesIcon tv={tv} />
            }}
        />
    );
};
export default TVHomePage;