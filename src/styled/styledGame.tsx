import styled from "styled-components";

export const GamesContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GameStyled = styled.div`
  margin: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  width: fit-content;
  background-color: orange;
  color: white;
  text-align: center;
  height: fit-content;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

export const CurrentGameStyled = styled(GameStyled)`
  background-color: blue;
  color: white;
  margin-left: auto;
  margin-right: auto;
`;

export const PreviousGamesContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const NextGamesContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GameCaption = styled.p`
  padding: 2px;
  margin: 0px;
  font-size: 8px;
  color: gray;
`;

export const GameTitle = styled.p`
  padding: 2px;
  margin: 0px;
  font-size: 12px;
`;
