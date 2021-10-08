import actions from './action.type';

export const getListOrder = (payload) => ({
    type: actions.GET_ALL_ORDER,
    payload
})
export const getListOrderSuccess = (payload) => ({
    type: actions.GET_LIST_ORDER_SUCCESS,
    payload
})
export const editOrder = (payload) => ({
    type: actions.EDIT_ORDER,
    payload
})
export const removeOrder = (payload) => ({
    type: actions.REMOVE_ORDER,
    payload
})
export const addNewOrder = (payload) => ({
    type: actions.ADD_ORDER,
    payload
})
export const getDetailOrder = (payload) => ({
    type: actions.GET_DETAIL_ORDER,
    payload
})
export const getDetailOrderSuccess = (payload) => ({
    type: actions.GET_DETAIL_ORDER_SUCCESS,
    payload
})
export const addOrder = (payload) => ({
    type: actions.ADD_ORDER_CHECKOUT,
    payload
})