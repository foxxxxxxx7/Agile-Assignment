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
          const rev = reviews.map((r) => r.author);
          rev.unshift("Author");
          cy.get("tr").each(($card, index) => {
            cy.wrap($card).contains(rev[index]);
            });
        });
    });




});