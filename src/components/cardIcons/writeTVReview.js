import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";

const WriteTVReviewIcon = ({ tv }) => {
    return (
        <Link
            to={`/TVreviews/form`}
            state={{
                TVId: tv.id,  
            }}
        >
            <RateReviewIcon color="primary" fontSize="large" />
        </Link>
    );
};

export default WriteTVReviewIcon;