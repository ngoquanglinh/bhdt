import actions from './action.type';

export const getListCustomer = (payload) => ({
    type: actions.GET_ALL_CUSTOMER,
    payload
})
export const getListCustomerSuccess = (payload) => ({
    type: actions.GET_LIST_CUSTOMER_SUCCESS,
    payload
})
export const editCustomer = (payload) => ({
    type: actions.EDIT_CUSTOMER,
    payload
})
export const removeCustomer = (payload) => ({
    type: actions.REMOVE_CUSTOMER,
    payload
})
export const addNewCustomer = (payload) => ({
    type: actions.ADD_CUSTOMER,
    payload
})