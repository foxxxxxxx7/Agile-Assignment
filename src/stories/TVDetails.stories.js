import React from "react";
import TVDetails from "../components/TVDetails";
import SampleTV from "./sampleData";

export default {
  title: "TV Details Page/TVDetails",
  component: MovieDetails,
};

export const Basic = () => <TVDetails tv={SampleTV} />;
Basic.storyName = "Default";