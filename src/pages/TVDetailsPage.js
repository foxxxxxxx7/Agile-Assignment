import React from "react";
import { useParams } from 'react-router-dom';
import TVDetails from "../components/TVDetails/";
import TemplateTVPage from "../components/templateTVPage";
import { getTV } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
//import useTV from "../hooks/useTV";

const TVPage = (props) => {
  const { id } = useParams();
  const { data: tv, error, isLoading, isError } = useQuery(
    ["tv", { id: id }],
    getTV
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {tv ? (
        <>
          <TemplateTVPage tv={tv}>
            <TVDetails tv={tv} />
          </TemplateTVPage>
        </>
      ) : (
        <p>Waiting for TV show details</p>
      )}
    </>
  );
};

export default TVPage;