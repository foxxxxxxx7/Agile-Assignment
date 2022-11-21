import React from "react";
import { useLocation } from "react-router-dom";
import TemplateTVPage from "../components/templateTVPage";
import TVReview from "../components/TVReview";

const TVReviewPage = (props) => {
  let location = useLocation();
  const { tv, review } = location.state;

  return (
    <TemplateTVPage tv={tv}>
      <TVReview review={review} />
    </TemplateTVPage>
  );
};

export default TVReviewPage;