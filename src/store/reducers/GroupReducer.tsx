const initState = {};
const groupReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_GROUP":
      console.info("group created");
      return state;
    case "CREATE_GROUP_ERROR":
      console.error("group creation error", action.err);
      return state;
    case "UPDATE_GROUP":
      console.info("UPDATE_GROUP");
      return state;
    case "UPDATE_GROUP_ERROR":
      console.error("UPDATE_GROUP_ERROR", action.err);
      return state;
    case "GROUPS_GENERAL_INFO":
      console.info("GROUPS_GENERAL_INFO");
      return state;
    case "GROUPS_GENERAL_INFO_ERROR":
      console.error("GROUPS_GENERAL_INFO_ERROR", action.err);
      return state;

    default:
      return state;
  }
};

export default groupReducer;
