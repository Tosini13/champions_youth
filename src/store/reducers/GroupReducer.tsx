const initState = {};
const groupReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "CREATE_GROUP":
      console.log("group created");
      return state;
    case "CREATE_GROUP_ERROR":
      console.log("group creation error", action.err);
      return state;
    default:
      return state;
  }
};

export default groupReducer;
