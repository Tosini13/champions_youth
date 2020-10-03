import { bottomMenuConst } from "../../const/menuConst";

const initState = {
  selectedRoute: bottomMenuConst.tournaments,
};

const routerReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "ROUTER_CHANGED":
      state.selectedRoute = action.selectedRoute;
      return { ...state };
    default:
      return { ...state };
  }
};

export default routerReducer;
