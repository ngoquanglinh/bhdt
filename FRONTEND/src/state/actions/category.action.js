import Actions from './action.type';

export const getListCategories = (payload) => ({
  type: Actions.GET_LIST_CATEGORIES,
  payload
})

export const searchListCategories = (payload) => ({
  type: Actions.SEARCH_LIST_CATEGORIES,
  payload
})

export const getListCategoriesSuccess = (payload) => ({
  type: Actions.GET_LIST_CATEGORIES_SUCCESS,
  payload,
})
export const editCategories = (payload) => ({
  type: Actions.EDIT_CATEGORIES,
  payload,
})
export const addNewCategory = (payload) => ({
  type: Actions.ADD_NEW_CATEGORY,
  payload,
})
export const DeleteCategory = (payload) => ({
  type: Actions.DELETE_CATEGORY,
  payload,
})