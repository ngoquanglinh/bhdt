import Actions from './action.type';

export const getListBrands = (payload) => ({
    type: Actions.GET_LIST_BRANDS,
    payload
})

export const searchListBrands = (payload) => ({
    type: Actions.SEARCH_LIST_BRANDS,
    payload
})

export const getListBrandsSuccess = (payload) => ({
    type: Actions.GET_LIST_BRANDS_SUCCESS,
    payload,
})
export const editBrands = (payload) => ({
    type: Actions.EDIT_BRANDS,
    payload,
})
export const addNewBrand = (payload) => ({
    type: Actions.ADD_NEW_BRAND,
    payload,
})
export const DeleteBrand = (payload) => ({
    type: Actions.DELETE_BRAND,
    payload,
})