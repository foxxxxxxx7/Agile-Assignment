import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TVContext } from "../../contexts/TVContext";

const RemoveFromTVFavoritesIcon = ({ tv }) => {
    const context = useContext(TVContext);

    const handleRemoveFromTVFavorites = (e) => {
        e.preventDefault();
        context.removeFromTVFavorites(tv);
    };
    return (
        <IconButton
            aria-label="remove from favorites"
            onClick={handleRemoveFromTVFavorites}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromTVFavoritesIcon;