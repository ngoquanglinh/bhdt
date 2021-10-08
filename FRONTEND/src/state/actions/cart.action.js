import Actions from './action.type';

export const addCart = (payload) => ({
    type: Actions.ADD_CART,
    payload,
})
export const removeCart = (payload) => ({
    type: Actions.REMOVE_CART,
    payload,
})

export const removeOneItemCart = (payload) => ({
    type: Actions.REMOVE_ONE_ITEM_CART,
    payload
})
export const removeAllCart = () => ({
    type: Actions.REMOVE_ALL_CART
})
export const addOneItemCart = (payload) => ({
    type: Actions.ADD_ONE_ITEM_CART,
    payload
})
export const changeStatusCheckout = (payload) => ({
    type: Actions.CHANGE_STATUS_CHECKOUT,
    payload
})
