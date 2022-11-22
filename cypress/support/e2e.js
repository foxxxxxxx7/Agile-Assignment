export const filterByTitle = (TVList, string) =>
    TVList.filter((m) => m.name.toLowerCase().search(string) !== -1);

export const filterByGenre = (TVList, genreId) =>
    TVList.filter((m) => m.genre_ids.includes(genreId));
    
    export const filterByTitleAndGenre = (TVList, genreId, string) =>
    TVList.filter((m) => m.genre_ids.includes(genreId) && m.name.toLowerCase().search(string) !== -1);