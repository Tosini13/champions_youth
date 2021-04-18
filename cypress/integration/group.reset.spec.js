import { groups, teams } from "../support/const";

const mockTournamentUrl =
  "http://localhost:3000/tournament/TAf0Y6ohX7sSk1eywIs0";

const noPlayOffs = 11;

const waitForLoading = 500;

describe("Reset Group", () => {
  beforeEach(() => {
    cy.visit(mockTournamentUrl);
  });

  it("Should reset appropriate matches", () => {
    // continues groups - init!
    // groups.forEach((group) => {
    //   cy.wait(waitForLoading);
    //   cy.get("p").contains(group.name).click();
    //   cy.wait(waitForLoading);
    //   cy.get("button").contains("Continue Group").click();
    //   cy.get("button").contains("Yes").click();
    //   cy.go("back");
    // });

    // finish groups
    groups.forEach((group) => {
      cy.wait(waitForLoading);
      cy.get("p").contains(group.name).click();
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
    cy.get("p").contains(groups[1].name).click();
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
      teams.juve
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(1) > ${teamName}`).contains(
      teams.barca
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(2) > ${teamName}`).contains(
      "Quater-final 2"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(2) > ${teamName}`).contains(
      teams.arsenal
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(2) > ${teamName}`).contains(
      "South Group 2place"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(3) > ${teamName}`).contains(
      "Quater-final 3"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(3) > ${teamName}`).contains(
      "South Group 1place"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(3) > ${teamName}`).contains(
      teams.chelsea
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(4) > ${teamName}`).contains(
      "Quater-final 4"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(4) > ${teamName}`).contains(
      teams.bayern
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(4) > ${teamName}`).contains(
      teams.liverpool
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(5) > ${teamName}`).contains(
      "Semi_final B 1"
    ); // TODO: change to Semi-final
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(5) > ${teamName}`).contains(
      teams.juve
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
      teams.bayern
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(7) > ${teamName}`).contains(
      "Semi-final 1"
    );
    cy.get(`.sc-gXfWUo div.sc-eXuzZk:nth-child(7) > ${teamName}`).contains(
      teams.barca
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
      teams.liverpool
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

    // continue all groups - init
    groups.forEach((group, i) => {
      if (i !== 1) {
        cy.wait(waitForLoading);
        cy.get("p").contains(group.name).click();
        cy.wait(waitForLoading);
        cy.get("button").contains("Continue Group").click();
        cy.get("button").contains("Yes").click();
        cy.go("back");
      }
    });
  });
});
