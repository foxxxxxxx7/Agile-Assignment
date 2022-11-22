import { filterByGenre, filterByTitle, filterByTitleAndGenre } from "../support/e2e";
let tvs;

describe("Filtering", () => {
    before(() => {
        // Get movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/discover/tv?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body")
            .then((response) => {
                tvs = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/tv");
    });

    describe("By TV show title", () => {
        it("only display tv shows with 'c' in the title", () => {
            const searchString = "c";
            const matchingTVshows = filterByTitle(tvs, searchString);
            cy.get("#filled-search").clear().type(searchString); // Enter m in text box
            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingTVshows.length
            );
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingTVshows[index].name);
            });
        });
        it("handles case when there are no matches", () => {
            const searchString = "xyxxzyyzz";
            cy.get("#filled-search").clear().type(searchString); // Enter m in text box
            cy.get(".MuiCardHeader-content").should("have.length", 0);
        });
    });
    describe("By TV show genre", () => {
        it("show TV shows with the selected genre", () => {
            const selectedGenreId = 35;
            const selectedGenreText = "Comedy";
            const matchingTVshows = filterByGenre(tvs, selectedGenreId);
            cy.get("#genre-select").click();
            cy.get("li").contains(selectedGenreText).click();
            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingTVshows.length
            );
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingTVshows[index].name);
            });
        });
    });
    describe("Combined genre and title", () => {
        it("show TV shows with the selected genre and title", () => {
            const selectedGenreId = 10765;
            const selectedGenreText = "Sci-Fi & Fantasy";
            const searchString = "chucky";
            const matchingTVshows = filterByTitleAndGenre(tvs, selectedGenreId, searchString);
            cy.get("#filled-search").clear().type(searchString);
            cy.get("#genre-select").click();
            cy.get("li").contains(selectedGenreText).click();
            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingTVshows.length
            );

        });
    });
});