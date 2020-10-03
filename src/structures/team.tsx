import { Id } from "../const/structuresConst";

export class TeamStructure {
  name: string;
  id?: Id;
  constructor(name: string) {
    this.name = name;
  }
}
