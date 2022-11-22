describe("The Login page", () => {
    it("allows user to login to an existing account", () => {
        cy.visit("/tv")
        cy.get("button").contains("Logout").click();// necessary to navigate to page first to avoid crashing
        cy.get("input[placeholder='Email...']").eq(1).type("rob.fox7@hotmail.com");
        cy.get("input[placeholder='Password...'").eq(1).type("password123");
        cy.get("button").contains("Login").click();
        cy.get("h5").contains("rob.fox7@hotmail.com")
    });

    it("allows user to register a new account", () => {
        cy.visit("/tv")
        cy.get("button").contains("Logout").click();// necessary to navigate to page first to avoid crashing
        cy.get("input[placeholder='Email...']").eq(0).type("newuser@hotmail.com");
        cy.get("input[placeholder='Password...'").eq(0).type("password123");
        cy.get("button").contains("Create User").click();
        cy.get("h5").contains("newuser@hotmail.com")
    });

    it("allows user to logout of an existing account", () => {
        cy.visit("/tv")
        cy.get("button").contains("Logout").click();// necessary to navigate to page first to avoid crashing
        cy.get("input[placeholder='Email...']").eq(1).type("rob.fox7@hotmail.com");
        cy.get("input[placeholder='Password...'").eq(1).type("password123");
        cy.get("button").contains("Login").click();
        cy.get("h5").contains("rob.fox7@hotmail.com")
        cy.get("button").contains("Sign Out").click()
    });
});