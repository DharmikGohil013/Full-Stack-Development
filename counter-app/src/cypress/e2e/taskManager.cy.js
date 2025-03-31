describe("Task Manager App", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173"); // Adjust URL if needed
    });
  
    it("adds a new task", () => {
      cy.get("input[placeholder='Enter task...']").type("Learn Cypress");
      cy.contains("Add Task").click();
      cy.contains("Learn Cypress").should("exist");
    });
  
    it("displays 'No tasks available' when no tasks exist", () => {
      cy.contains("No tasks available").should("exist");
    });
  });
  