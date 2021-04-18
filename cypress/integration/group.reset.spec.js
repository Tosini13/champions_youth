// import cy from "cypress";
const loginUrl = "http://localhost:3000/logni";
const mockTournamentUrl =
  "http://localhost:3000/tournament/LpMuVIiQFj1jWiTbY0NA";

const groups = ["Group A", "Group B", "Group C", "Group D"];
const noPlayOffs = 11;

const waitForLoading = 500;

describe("My First Test", () => {
  beforeEach(() => {
    // cy.visit(loginUrl);
    // cy.get('input[name="email"]').clear().type("admin@gmail.com");
    // cy.get('input[name="password"]').clear().type("admin1234");
    // cy.wait(1500);
    cy.visit(mockTournamentUrl);
  });

  it("Should reset appropriate matches", () => {
    // finish groups
    cy.wait(waitForLoading);
    cy.get("p").contains("Group A").click();
    cy.wait(waitForLoading);
    cy.get("button").contains("Continue Group").click();
    cy.get("button").contains("Yes").click();
    cy.go("back");

    groups.forEach((group) => {
      cy.wait(waitForLoading);
      cy.get("p").contains(group).click();
      cy.wait(waitForLoading);
      cy.get("button").contains("Finish Group").click();
      cy.get("button").contains("Yes").click();
      cy.go("back");
    });

    // //play all games
    cy.wait(waitForLoading);
    cy.get(".MuiTab-wrapper").contains("Play Offs").click();
    for (let i = 0; i < noPlayOffs; i++) {
      cy.wait(waitForLoading);
      cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(${i + 1})`).click();
      cy.get(".MuiDialog-paper .sc-eXuzZk").click();
      cy.wait(waitForLoading);
      cy.get("button").contains("Start").click();
      cy.get('button[aria-label="add-away-goal"]').click();
      cy.get("button").contains("Finish").click();
      cy.go("back");
      cy.wait(waitForLoading);
      cy.get(".MuiTab-wrapper").contains("Play Offs").click();
    }

    // continue groups
    cy.get(".MuiTab-wrapper").contains("Groups").click();
    cy.wait(waitForLoading);
    cy.get("p").contains("Group B").click();
    cy.wait(waitForLoading);
    cy.get("button").contains("Continue Group").click();
    cy.get("button").contains("Yes").click();
    cy.go("back");

    // check games
    const teamName = "div > p";
    cy.wait(waitForLoading);
    cy.get(".MuiTab-wrapper").contains("Play Offs").click();
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(1) > ${teamName}`).contains(
      "Quater-final 1"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(1) > ${teamName}`).contains(
      "Arsenal London"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(1) > ${teamName}`).contains(
      "Liverpool"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(2) > ${teamName}`).contains(
      "Quater-final 2"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(2) > ${teamName}`).contains(
      "Group B 1place"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(2) > ${teamName}`).contains(
      "F.C. Barcelona"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(3) > ${teamName}`).contains(
      "Quater-final 3"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(3) > ${teamName}`).contains(
      "Bayern"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(3) > ${teamName}`).contains(
      "Group B 2place"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(4) > ${teamName}`).contains(
      "Quater-final 4"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(4) > ${teamName}`).contains(
      "Juve"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(4) > ${teamName}`).contains(
      "Chelsea"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(5) > ${teamName}`).contains(
      "Semi_final B 1"
    ); // TODO: change to Semi-final
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(5) > ${teamName}`).contains(
      "Arsenal London"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(5) > ${teamName}`).contains(
      "Quater-final 2Loser"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(6) > ${teamName}`).contains(
      "Semi_final B 2"
    ); // TODO: change to Semi-final
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(6) > ${teamName}`).contains(
      "Quater-final 3Loser"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(6) > ${teamName}`).contains(
      "Juve"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(7) > ${teamName}`).contains(
      "Semi-final 1"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(7) > ${teamName}`).contains(
      "Liverpool"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(7) > ${teamName}`).contains(
      "Quater-final 2Winner"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(8) > ${teamName}`).contains(
      "Semi-final 2"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(8) > ${teamName}`).contains(
      "Quater-final 3Winner"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(8) > ${teamName}`).contains(
      "Chelsea"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(9) > ${teamName}`).contains(
      "th place 5"
    ); // TODO: change th place 5 to 5th place
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(9) > ${teamName}`).contains(
      "Semi_final B 1Winner"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(9) > ${teamName}`).contains(
      "Semi_final B 2Winner"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(10) > ${teamName}`).contains(
      "rd place 3"
    ); // TODO: change th place 5 to 5th place
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(10) > ${teamName}`).contains(
      "Semi-final 1Loser"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(10) > ${teamName}`).contains(
      "Semi-final 2Loser"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(11) > ${teamName}`).contains(
      "Final"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(11) > ${teamName}`).contains(
      "Semi-final 1Winner"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(11) > ${teamName}`).contains(
      "Semi-final 2Winner"
    );
  });
});
