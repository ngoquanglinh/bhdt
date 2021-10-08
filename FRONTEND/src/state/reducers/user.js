import { Actions } from "../actions";

const initialState = {
  user: null
};
function UserInfo(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USER_INFO_SUCCESS:
      return { ...state, user: action.payload };
    case Actions.DELET_USER_INFO:
      return { ...state, user: null };
    default:
      return state;
  }
}
export default UserInfo;
