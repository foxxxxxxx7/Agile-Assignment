let reviews;
let movie;
const movieId = 436270; //Black Adam movieId

describe("The reviews feature", () => {
    before(() => {
        cy.request(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${Cypress.env(
            "TMDB_KEY"
          )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
          .its("body")
          .then((response) => {
            reviews = response.results;
          });
      });
      beforeEach(() => {
        cy.visit(`/movies/${movieId}`);
      });
    
    describe("Show reviews", () => {
        it("chosen movie has option to see reviews", () => {
          cy.get(".MuiFab-root").click();
          const allReviews = reviews.map((r) => r.author);
          allReviews.unshift("Author");
          cy.get("tr").each(($card, index) => {
            cy.wrap($card).contains(allReviews[index]);
            });
        });
    });
    
    describe("Write review", () => {
        it("favorited movies have option to write review", () => {
            cy.visit(`/movies`);
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get("button").contains("Favorites").click();
            cy.get("svg[data-testid='RateReviewIcon']").click();
            cy.get("input#author").type("Fox");
            cy.get("textarea#review").type("New Review 12345");
            cy.get("button[type= 'submit']").click();
            cy.get("h4.MuiTypography-root").should("be.visible")
            });
        });

});