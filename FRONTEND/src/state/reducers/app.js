import { Actions } from '../actions';

const initialState = {
    toogleMenu: true
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case Actions.TOGGLE_MENU: {
            return {
                ...state,
                toogleMenu: !state.toogleMenu,
            };
        }
        default:
            return state;
    }
};

export default app;
