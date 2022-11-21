import React from "react";
import TemplateTVPage from "../components/templateTVPage";
import TVReviewForm from "../components/TVReviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getTV } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const WriteTVReviewPage = (props) => {
    const location = useLocation();
    const TVId = location.state.TVId;

    const { data: tv, error, isLoading, isError } = useQuery(
        ["tv", { id: TVId }],
        getTV
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <TemplateTVPage tv={tv}>
            <TVReviewForm tv={tv} />
        </TemplateTVPage>
    );
};

export default WriteTVReviewPage;