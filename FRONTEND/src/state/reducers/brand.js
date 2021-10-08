import { Actions } from '../actions';

const initialState = {
    items: [],
    total: 0
};

const brands = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_LIST_BRANDS_SUCCESS: {
            return {
                ...state,
                items: action.payload.data.items,
                total: action.payload.data.total,
            };
        }
        default:
            return state;
    }
};

export default brands;
