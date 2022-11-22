let movies;
const movieId = 497582; // Enola Holmes movie id
let tvs;
const tvID = 90462; // Chucky TV Show ID

describe("The favourites feature", () => {
  before(() => {
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

  describe("Selecting favourites", () => {
    it("selected TV card shows the red heart", () => {
      cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get(".MuiCardHeader-root").eq(1).find("svg");
    });
  });

  describe("The favourites page", () => {
    beforeEach(() => {
      // Select two favourites and navigate to Favourites page
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get("button[aria-label='add to favorites']").eq(3).click();
      cy.get("button").contains("TV Favorites").click();
    });
    it("only the tagged TV Shows are listed", () => {
      cy.get(".MuiCardHeader-content").should("have.length", 2);
      cy.get(".MuiCardHeader-content")
        .eq(0)
        .find("p")
        .contains(tvs[1].name);
      cy.get(".MuiCardHeader-content")
        .eq(1)
        .find("p")
        .contains(tvs[3].name);
    });
  });
});