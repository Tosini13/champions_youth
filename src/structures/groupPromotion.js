
// TABLE
const tableInit = (teams) => {
    let table = [];
    teams.forEach(team => {
        let row = {
            team: team,
            matches: 0,
            points: 0,
            goalsScored: 0,
            goalsLost: 0
        }
        table.push(row);
    })
    return table;
}

const sortTable = (a, b) => {
    //POINTS
    if (a.points === b.points) {
        //+/-
        let diffrenceA = a.goalsScored - a.goalsLost;
        let diffrenceB = b.goalsScored - b.goalsLost;
        if (diffrenceA === diffrenceB) {
            //SCORED
            if (a.goalsScored === b.goalsScored) {
                //LOST
                if (a.goalsLost === b.goalsLost) {
                    // TODO:
                    //TEAM NAME
                    // if (a.team.name.localeCompare(b.team.name) === 0) {
                    //     //ADD DIRECT RESULT!
                    //     return 0;
                    // }
                    // else {
                    //OR ASK ADMIN!!!
                    // return (a.team.name.localeCompare(b.team.name) < 0) ? -1 : 1;
                    // }
                    return 0;
                }
                else {
                    return (a.goalsLost > b.goalsLost) ? -1 : 1;
                }
            }
            else {
                return (a.goalsScored > b.goalsScored) ? -1 : 1;
            }
        }
        else {
            return (diffrenceA > diffrenceB) ? -1 : 1;
        }
    }
    else {
        return (a.points > b.points) ? -1 : 1;
    }
}

export const createTable = (teamsId, matches) => {
    let table = tableInit(teamsId);
    let begunGroup = false; //check if group has begun

    for (let match of matches) {
        if (match.mode !== 'NOT_STARTED') {
            begunGroup = true;
            for (let row of table) {
                if (row.points == null) {
                    console.log("Matches didn't start!!");
                }
                //team is host
                if (match.home?.id === row.team) {
                    //add points
                    if (match.result.home > match.result.away) {
                        row.points += parseInt(3);
                    } else if (match.result.home === match.result.away) {
                        row.points += parseInt(1);
                    }
                    //goal balance
                    row.goalsScored += parseInt(match.result.home);
                    row.goalsLost += parseInt(match.result.away);
                    if (match.mode === 'LIVE') {
                        row.live = true;
                    }
                    row.matches++;
                }
                //team is guest
                if (match.away?.id === row.team) {
                    //add points
                    if (match.result.home < match.result.away) {
                        row.points += parseInt(3);
                    } else if (match.result.home === match.result.away) {
                        row.points += parseInt(1);
                    }
                    //goal balance
                    row.goalsScored += parseInt(match.result.away);
                    row.goalsLost += parseInt(match.result.home);
                    if (match.mode === 'LIVE') {
                        row.live = true;
                    }
                    row.matches++;
                }
            }
        }
    }
    if (begunGroup) {
        table.sort(sortTable);
    }
    return table;
}

export const getPromoted = (teams, matches) => {
    const table = createTable(teams.map((team) => team.id), matches);
    console.log(matches);
    console.log(table);
    let promoted = [];
    table.forEach(row => {
        promoted.push(teams.find(team => team.id === row.team));
    })
    return promoted;
}

export const initGroupPromoted = (group) => {
    const teamsQtt = group.teams.length;
    let promoted = [];
    for (let i = 0; i < teamsQtt; i++) {
        promoted.push({
            name: group.name + ' ' + (i + 1) + ' place'
        });
    }
    return promoted;
}