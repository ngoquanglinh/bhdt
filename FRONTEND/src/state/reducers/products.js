import { Actions } from "../actions";

const initialState = {
    data: null,
    products: null,
    total: 0,
    perPage: 6,
    showModal: false,
    sizes: null,
    colors: null
};
function products(state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_PRODUCT_SUCCESS:
            const products = action.payload.data;
            const pagiData = products?.items?.slice(0, 6);
            return {
                ...state,
                products: action.payload.data,
                dataProductSort: pagiData,
                total: action.payload.length,
            };
        case Actions.SHOW_MODAL: {

            return {
                ...state,
                showModal: true,
            };
        }
        case Actions.HIDE_MODAL: {
            return {
                ...state,
                showModal: false,
            };
        }
        case Actions.PAGINATION_DATA: {
            const { payload: orderPage = 1 } = action;
            const newData = [...state.data];
            const begin = (orderPage - 1) * state.perPage;
            const end = orderPage * state.perPage;
            const newDataUpdate = newData.slice(begin, end);
            return {
                ...state,
                dataProductSort: newDataUpdate,
                showModal: false
            };
        }
        case Actions.GET_ALL_COLOR_SUCCESS: {
            state.colors = action.payload.data;
            return {
                ...state,
            };
        }
        case Actions.GET_ALL_SIZE_SUCCESS: {
            state.sizes = action.payload.data;
            return {
                ...state,
            };
        }
        default:
            return state;
    }
}
export default products;
