import { Actions } from "../actions";

const initialState = {
  items: null,
  total: 0
};

function dataRecruitment(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_LIST_RECRUITMENT_SUCCESS:
      const { items, total } = action.payload;
      return { ...state, items, total };
    default:
      return { ...state };
  }
}
export default dataRecruitment;
