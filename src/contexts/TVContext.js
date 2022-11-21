import React, { useState } from "react";

export const TVContext = React.createContext(null);

const TVContextProvider = (props) => {
    const [tvfavorites, setTVFavorites] = useState([])
    const [myTVReviews, setMyTVReviews] = useState({})
    const [TVwatchlist, setTVWatchlist] = useState([])

    const addToTVFavorites = (tv) => {
        let newTVFavorites = [];
        if (!tvfavorites.includes(tv.id)) {
            newTVFavorites = [...tvfavorites, tv.id];
        }
        else {
            newTVFavorites = [...tvfavorites];
        }
        setTVFavorites(newTVFavorites)
    };

    const addTVReview = (tv, review) => {
        setMyTVReviews({ ...myTVReviews, [tv.id]: review })
    };
    //console.log(myReviews);

    // We will use this function in a later section
    const removeFromTVFavorites = (tv) => {
        setTVFavorites(tvfavorites.filter(
            (mId) => mId !== tv.id
        ))
    };

    const addToTVWatchlist = (tv) => {
        let newEntry = [];
        if (!TVwatchlist.includes(tv.id)) {
            newEntry = [...TVwatchlist, tv.id];
        }
        else {
            newEntry = [...TVwatchlist];
        }
        setTVWatchlist(newEntry)
        console.log(newEntry)
    };

    return (
        <TVContext.Provider
            value={{
                tvfavorites,
                TVwatchlist,
                addToTVFavorites,
                removeFromTVFavorites,
                addTVReview,
                addToTVWatchlist
            }}
        >
            {props.children}
        </TVContext.Provider>
    );
};

export default TVContextProvider;