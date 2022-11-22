let tvs;
let tvId;

describe("Navigation", () => {
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
    describe("From the home page to a TV show's details", () => {
        it("navigates to the TV show details page and change browser URL", () => {
            cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
            cy.url().should("include", `/tv/${tvs[0].id}`);
        });
    });
    describe("The site header", () => {
        describe("when the viewport is desktop scale", () => {
            it("navigation via the links", () => {
                cy.get("button").contains("TV Favorites").click();
                cy.url().should("include", `/favorites`);
                cy.get("button").contains("Home").click();
                cy.url().should("include", `/movies`);
            });
        });
        describe(
            "when the viewport is a mobile scale",
            {
                viewportHeight: 896,
                viewportWidth: 414,
            },
            () => {
                it("navigation via the dropdown menu", () => {
                    cy.get("header").find("button").click();
                    cy.get("li").contains('TV Favorites').click();
                    cy.url().should("include", `/favorites`);
                    cy.get("li").contains('Home').click();
                    cy.url().should("include", `/movies`);
                });
            }
        );
    });
    describe("From the favourites page to a TV show's details", () => {
        it("navigates to the TV show details page and change browser URL", () => {
            cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
            cy.url().should("include", `/tv/${tvs[0].id}`);
        });
    });
    describe("The forward/backward links", () => {
        beforeEach(() => {
            cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
        });
        it("navigates between the TV show's detail page and the Home page.", () => {
            cy.get("svg[data-testid='ArrowBackIcon'").click();
            cy.url().should("not.include", `/tv/${tvs[0].id}`);
            cy.get("svg[data-testid='ArrowForwardIcon'").click();
            cy.url().should("include", `/tv/${tvs[0].id}`);
        });
    });
})