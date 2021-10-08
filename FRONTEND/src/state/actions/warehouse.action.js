import Actions from './action.type';

export const getListWarehouses = (payload) => ({
    type: Actions.GET_LIST_WAREHOUSES,
    payload
})

export const searchListWarehouses = (payload) => ({
    type: Actions.SEARCH_LIST_WAREHOUSES,
    payload
})

export const getListWarehousesSuccess = (payload) => ({
    type: Actions.GET_LIST_WAREHOUSES_SUCCESS,
    payload,
})
export const editWarehouses = (payload) => ({
    type: Actions.EDIT_WAREHOUSE,
    payload,
})
export const addNewWarehouse = (payload) => ({
    type: Actions.ADD_NEW_WAREHOUSE,
    payload,
})
export const deleteWarehouse = (payload) => ({
    type: Actions.DELETE_WAREHOUSE,
    payload,
})