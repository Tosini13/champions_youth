import { Id } from "../const/structuresConst";

export class GroupStructure {
  name: string;
  id?: Id;
  constructor(name: string) {
    this.name = name;
  }
}
