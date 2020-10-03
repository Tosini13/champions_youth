import { Id } from "../const/structuresConst";
import { Login, Password, userRightsConst } from "../const/userConst";

class User {
  id: Id;
  login: Login;
  password: Password;
  rights: userRightsConst;

  favoriteTournaments: Id[] = [];

  addFavoriteTournament = (tournamentId: Id) => {
    this.favoriteTournaments = [...this.favoriteTournaments, tournamentId];
  };

  removeFavoriteTournament = (tournamentId: Id) => {
    this.favoriteTournaments = this.favoriteTournaments.filter(
      (id) => id !== tournamentId
    );
  };

  constructor(
    id: Id,
    login: Login,
    password: Password,
    rights: userRightsConst
  ) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.rights = rights;
  }
}

export default User;
