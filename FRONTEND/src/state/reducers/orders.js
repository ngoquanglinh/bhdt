import { Actions } from '../actions';

const initialState = {
    orders: null,
};

const orders = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_LIST_ORDER_SUCCESS: {
            return {
                ...state,
                orders: action.payload.data,
            };
        }
        default:
            return state;
    }
};

export default orders;
