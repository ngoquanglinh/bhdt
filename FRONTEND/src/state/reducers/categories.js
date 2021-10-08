import { Actions } from '../actions';

const initialState = {
  categories: null,
  dataJobsSort: null,
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_LIST_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.payload.data,
      };
    }
    default:
      return state;
  }
};

export default categories;
