let tvs;
let tv;
let toptvs;
let topMovies;

describe("Base tests", () => {
  before(() => {
    // Get the discover TV from TMDB and store them locally.
    cy.request(
      `https://api.themoviedb.org/3/discover/tv?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        tvs = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/tv");
  });

  describe("The Discover TV page", () => {
    it("displays the page header and 20 tv shows", () => {
      cy.get("h3").contains("Discover TV Shows");
      cy.get(".MuiCardHeader-root").should("have.length", 20);
    });

    it("displays the correct TV show titles", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(tvs[index].name);
      });
    });
  });
  describe("The TV show details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/tv/${tvs[0].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((tvDetails) => {
          tv = tvDetails;
        });
    });
    beforeEach(() => {
      cy.visit(`/tv/${tvs[0].id}`);
    });
    it(" displays the TV show title, overview and genres and ", () => {
      cy.get("h3").contains("Overview");
      cy.get("h3").next().contains(tv.overview);
      cy.get("ul")
        .eq(1)
        .within(() => {
          const genreChipLabels = tv.genres.map((g) => g.name);
          genreChipLabels.unshift("Genres");
          cy.get("span").each(($card, index) => {
            cy.wrap($card).contains(genreChipLabels[index]);
          });
        });
    });
  });
  describe("The top TV shows page", () => {
    before(() => {
      cy.request(`https://api.themoviedb.org/3/tv/top_rated?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`)
        .its("body")
        .then((tvDetails) => {
          toptvs = tvDetails.results;
        });
    });
    it("displays the top rated TV shows", () => {
      cy.visit("/tv/topTV");
      cy.get(".MuiCardHeader-root")
        .within(() => {
          cy.get("p").each(($card, index) => {
            cy.wrap($card).contains(toptvs[index].name);
          });
        });
    });
  });

  describe("The top Movies page", () => {
    before(() => {
      cy.request(`https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`)
        .its("body")
        .then((movieDetails) => {
          topMovies = movieDetails.results;
        });
    });
    it("displays the top rated movies", () => {
      cy.visit("/movies/topMovies");
      cy.get(".MuiCardHeader-root")
        .within(() => {
          cy.get("p").each(($card, index) => {
            cy.wrap($card).contains(topMovies[index].title);
          });
        });
    });
  });
});