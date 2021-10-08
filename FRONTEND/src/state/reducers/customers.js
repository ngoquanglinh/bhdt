import { Actions } from '../actions';

const initialState = {
    customers: null,
};

const customers = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_LIST_CUSTOMER_SUCCESS: {
            return {
                ...state,
                customers: action.payload.data,
            };
        }
        default:
            return state;
    }
};

export default customers;
