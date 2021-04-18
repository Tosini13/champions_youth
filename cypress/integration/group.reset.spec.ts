const mockTournamentUrl =
  "http://localhost:3000/tournament/LpMuVIiQFj1jWiTbY0NA";

describe("My First Test", () => {
  beforeEach(() => {
    cy.visit(mockTournamentUrl);
  });

  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });
});
