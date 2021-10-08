import actions from './action.type';

export const getAllProduct = (payload) => ({
  type: actions.GET_ALL_PRODUCT,
  payload
})

export const getProductDetail = (payload) => ({
  type: actions.GET_PRODUCT_DETAIL,
  payload
})

export const getAllProductSuccess = (payload) => ({
  type: actions.GET_ALL_PRODUCT_SUCCESS,
  payload
})
export const addNewProduct = (payload) => ({
  type: actions.ADD_PRODUCT,
  payload
})
export const removeProduct = (payload) => ({
  type: actions.REMOVE_PRODUCT,
  payload
})
export const editProduct = (payload) => ({
  type: actions.EDIT_PRODUCT,
  payload
})

export const paginationProduct = (payload) => ({
  type: actions.PAGINATION_DATA,
  payload
})
export const showModal = () => ({
  type: actions.SHOW_MODAL,

})
export const hideModal = () => ({
  type: actions.HIDE_MODAL,

})

export const getListColor = (payload) => ({
  type: actions.GET_ALL_COLOR,
  payload
})

export const getAllColorSuccess = (payload) => ({
  type: actions.GET_ALL_COLOR_SUCCESS,
  payload
})

export const getListSizes = (payload) => ({
  type: actions.GET_ALL_SIZE,
  payload
})

export const getAllSizeSuccess = (payload) => ({
  type: actions.GET_ALL_SIZE_SUCCESS,
  payload
})

export const uploadFiles = (payload) => ({
  type: actions.UPLOADS_FILES,
  payload
})

export const removeSize = (payload) => ({
  type: actions.REMOVE_SIZE,
  payload
})

export const addNewSize = (payload) =>
({
  type: actions.ADD_SIZE,
  payload
})

export const editSize = (payload) => ({
  type: actions.EDIT_SIZE,
  payload
})

export const removeColor = (payload) => ({
  type: actions.REMOVE_COLOR,
  payload
})

export const addNewColor = (payload) => ({
  type: actions.ADD_COLOR,
  payload
})

export const editColor = (payload) => ({
  type: actions.EDIT_COLOR,
  payload
})