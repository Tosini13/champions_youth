import { groups } from "../support/const";

const mockTournamentUrl =
  "http://localhost:3000/tournament/TAf0Y6ohX7sSk1eywIs0";

const waitForLoading = 500;

describe("Create Groups", () => {
  beforeEach(() => {
    cy.visit(mockTournamentUrl);
  });
  it("Should delete Groups", () => {
    cy.wait(1500);
    cy.get('button[aria-label="delete groups"]').click();
    cy.get("button").contains("Yes").click();
    cy.wait(5000);
  });

  it("Should create Groups", () => {
    cy.wait(1500);
    cy.get('button[aria-label="create groups"]').click();
    for (let i = 0; i < 4; i++) {
      cy.get('button[aria-label="add-group"]').click();
    }
    const groupContainer = 'div[ aria-label="group-forms-container"]';
    const dialogTeam =
      ".MuiDialog-paper ul > div > div.MuiListItemText-root > span";

    groups.forEach((group, i) => {
      cy.get(`${groupContainer} > div:nth-child(${i + 1}) input[name="name"]`)
        .clear()
        .type(group.name);
      cy.get(`${groupContainer} > div:nth-child(${i + 1}) button`)
        .contains("Add Team")
        .click();
      group.teams.forEach((team) => {
        cy.get(`${dialogTeam}`).contains(team).click();
      });
      cy.get(
        `.MuiDialog-paper button[aria-label="close-dialog"]:first-child`
      ).click({ multiple: true, force: true });
    });
    cy.get("button").contains("Save").click();
    cy.get("button").contains("Yes").click();
  });
});
