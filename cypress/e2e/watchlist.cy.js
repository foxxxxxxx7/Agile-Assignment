let toptvs;
let topMovies;


describe("The watchlist feature", () => {
    before(() => {
        cy.request(`https://api.themoviedb.org/3/tv/top_rated?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`)
            .its("body")
            .then((tvDetails) => {
                toptvs = tvDetails.results;
            });
    });
    beforeEach(() => {
        cy.visit("/tv/topTV");
    });

    describe("Adding to watchlist", () => {
        it("selected TV card shows the green watchlist symbol", () => {
            cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
            cy.get("button[aria-label='add to watchlist']").eq(1).click();
            cy.get(".MuiCardHeader-root").eq(1).find("svg");
        });
    });
    describe("The watchlist feature", () => {
        before(() => {
            cy.request(`https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`)
                .its("body")
                .then((movieDetails) => {
                    topMovies = movieDetails.results;
                });
        });
        beforeEach(() => {
            cy.visit("/movies/topMovies");
        });

        describe("Adding to watchlist", () => {
            it("selected movie card shows the green watchlist symbol", () => {
                cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
                cy.get("button[aria-label='add to watchlist']").eq(1).click();
                cy.get(".MuiCardHeader-root").eq(1).find("svg");
            });
        });
    });
});