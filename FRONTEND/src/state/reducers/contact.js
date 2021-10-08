import { Actions } from '../actions';

const initialState = {
    contacts: null,
};

const contacts = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_LIST_CONTACT_SUCCESS: {
            return {
                ...state,
                contacts: action.payload.data,
            };
        }
        default:
            return state;
    }
};

export default contacts;
