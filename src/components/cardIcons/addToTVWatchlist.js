import React, { useContext } from "react";
import { TVContext } from "../../contexts/TVContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const AddToTVWatchlistIcon = ({ tv }) => {
  const context = useContext(TVContext);

  const handleAddToTVWatchlist = (e) => {
    e.preventDefault();
    context.addToTVWatchlist(tv);
  };

  return (
    <IconButton aria-label="add to watchlist" onClick={handleAddToTVWatchlist}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToTVWatchlistIcon;