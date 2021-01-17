import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Grid } from "@material-ui/core";

import { ContentContainerStyled } from "../../../../styled/styledLayout";
import useCreateGroup from "../../../../hooks/useCreateGroup";
import { GroupModel } from "../../../../NewModels/Group";
import { LOCALE } from "../../../../locale/config";
import { Id } from "../../../../const/structuresConst";
import { MatchTime } from "../../../../NewModels/Matches";
import { useNotification } from "../../../global/Notification";
import { useHistory } from "react-router-dom";
import { routerGenerateConst } from "../../../../const/menuConst";
import CreationNav from "../../../groups/creation/CreationNav";
import CreateGroupForm from "../../../groups/creation/GroupForm/CreateGroupForm";
import CreateGroupsActions from "../../../groups/creation/CreateGroupsActions";
import GroupSettings from "../../../groups/creation/GroupSettings";
import { PromotedGroup } from "./CreatePlayOffsGroupPage";
import { NewPlaceholder } from "../../../../NewModels/Team";
import ChooseTeams from "./ChooseTeams";
import PlaceholderTeamsList from "./PlaceholderTeamsList";

const GridContainer = styled(Grid)`
  margin-bottom: 20px;
`;

export interface CreatePlayOffsGroupScreenProps {
  promotedGroups: PromotedGroup[];
  tournamentId: Id;
  startDate: string;
  teamsQtt: number;
  createGroup: (tournamentId: Id, group: GroupModel) => void;
  locale: LOCALE;
  userId: Id;
}

export type SettingType = {
  time?: MatchTime;
  fields: number;
  returnMatches: boolean;
};

const CreatePlayOffsGroupScreen: React.FC<CreatePlayOffsGroupScreenProps> = ({
  promotedGroups,
  tournamentId,
  startDate,
  teamsQtt,
  createGroup,
  locale,
  userId,
}) => {
  const history = useHistory();
  const { setQuestion, setAnswers, openNotification } = useNotification();
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [settings, setSettings] = useState<SettingType>({
    returnMatches: false,
    fields: 1,
  });
  const [chosenGroup, setChosenGroup] = useState<GroupModel | undefined>(
    undefined
  );
  const [chosenTeams, setChosenTeams] = useState<NewPlaceholder[]>([]);
  const [groups, setGroups] = useState<GroupModel[]>([]);

  const { initGroupMatches } = useCreateGroup();

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const createNewGroup = () => {
    let groupN = "";
    for (let i = 0; i < groups.length + 1; i++) {
      groupN = String.fromCharCode(65 + i);
      const n = `PlayOffsGroup${groupN}`;
      let isFree = true;
      groups.forEach((group) => (group.id === n ? (isFree = false) : true));
      if (isFree) break;
    }
    const newGroup: GroupModel = {
      id: `PlayOffsGroup${groupN}`,
      name: `Play-Offs Group ${groupN}`,
      teams: [],
      matches: [],
      placeholderTeams: [],
    };
    return newGroup;
  };

  const handleUpdateGroup = (updatedGroup: GroupModel) => {
    setGroups(
      groups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );
  };

  const groupInValid = () => {
    setQuestion("theresNoTeamsOrMatchesInGroup");
    setAnswers([
      {
        title: "ok",
      },
    ]);
    openNotification();
  };

  const handleSaveGroup = () => {
    let valid = true;
    groups.forEach((group) => {
      if (!group.placeholderTeams?.length || !group.matches.length) {
        valid = false;
      }
    });
    if (!valid) {
      setTimeout(groupInValid, 10);
      return false;
    }
    groups.forEach((group) => {
      createGroup(tournamentId, group);
    });
    history.push(routerGenerateConst.tournament(tournamentId));
  };

  const handleAddGroup = () => {
    if (teamsQtt <= groups.length) {
      return false;
    }
    const newGroup = createNewGroup();
    setGroups([...groups, newGroup]);
  };

  const handleRemoveGroup = (selected: GroupModel) => {
    let newGroups = groups.filter((group) => group.id !== selected.id);
    setChosenTeams(
      chosenTeams.filter((team) => !selected.placeholderTeams?.includes(team))
    );
    setGroups([...newGroups]);
  };

  // TODO: Draw best solution!
  const handleDrawGroup = () => {
    // groups.forEach((group) => (group.teams = []));
    // let shuffledTeams = shuffle(teams);
    // shuffledTeams?.forEach((team, i) => {
    //   groups[i % groups.length].teams.push(team);
    // });
    // setGroups(
    //   initGroupMatches({
    //     groups,
    //     returnMatches: settings.returnMatches,
    //     fields: settings.fields,
    //     time: settings.time,
    //     date: startDate,
    //   })
    // );
    // setChosenTeams(shuffledTeams ?? []);
  };

  const handleOpenTeams = (group?: GroupModel) => {
    setChosenGroup(group);
  };

  const handleChooseTeam = (selected: NewPlaceholder) => {
    if (!chosenGroup || !chosenGroup.placeholderTeams) return false;
    let selectedTeams: NewPlaceholder[] = [];
    if (chosenGroup.placeholderTeams.includes(selected)) {
      selectedTeams = chosenGroup.placeholderTeams.filter(
        (team) => team.id !== selected?.id || team.place !== selected?.place
      );
    } else {
      selectedTeams = [...chosenGroup.placeholderTeams, selected];
    }
    const updatedGroup = {
      ...chosenGroup,
      placeholderTeams: selectedTeams,
    };
    setChosenGroup(updatedGroup);
    setGroups(
      groups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );
  };

  useEffect(() => {
    //todo: placeholderTeams!
    setGroups(
      initGroupMatches({
        groups,
        returnMatches: settings.returnMatches,
        fields: settings.fields,
        time: settings.time,
        date: startDate,
      })
    );
  }, [
    groups,
    initGroupMatches,
    settings.time,
    settings.returnMatches,
    settings.fields,
    startDate,
  ]);

  return (
    <>
      <CreationNav
        save={handleSaveGroup}
        openSettings={() => setOpenSettings(true)}
      />
      <ContentContainerStyled>
        <GridContainer container spacing={5} direction="column">
          {groups.map((group) => {
            return (
              <Grid item key={group.id}>
                <CreateGroupForm
                  locale={locale}
                  userId={userId}
                  group={group}
                  handleOpenTeams={handleOpenTeams}
                  handleRemoveGroup={handleRemoveGroup}
                  handleUpdateGroup={handleUpdateGroup}
                >
                  <PlaceholderTeamsList teams={group.placeholderTeams ?? []} />
                </CreateGroupForm>
              </Grid>
            );
          })}
        </GridContainer>
      </ContentContainerStyled>
      <CreateGroupsActions add={handleAddGroup} draw={handleDrawGroup} />
      <ChooseTeams
        promotedGroups={promotedGroups}
        chosenGroup={chosenGroup}
        chosenTeams={chosenTeams}
        open={Boolean(chosenGroup)}
        setChosenTeams={setChosenTeams}
        handleOpenTeams={handleOpenTeams}
        handleChooseGroupTeam={handleChooseTeam}
      />
      <GroupSettings
        locale={locale}
        open={openSettings}
        handleClose={handleCloseSettings}
        settings={settings}
        setSettings={setSettings}
      />
    </>
  );
};

export default CreatePlayOffsGroupScreen;