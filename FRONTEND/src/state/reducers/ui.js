import { Actions } from "../actions";

const initialState = {
    showLoading: false,
    showSidebar: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SHOW_LOADING: {
            return {
                ...state,
                showLoading: true,
            };
        }
        case Actions.HIDE_LOADING: {
            return {
                ...state,
                showLoading: false,
            };
        }
        case Actions.SHOW_SIDEBAR: {
            return {
                ...state,
                showSidebar: true,
            };
        }
        case Actions.HIDE_SIDEBAR: {
            return {
                ...state,
                showSidebar: false,
            };
        }
        default:
            return state;
    }
};

export default reducer;
