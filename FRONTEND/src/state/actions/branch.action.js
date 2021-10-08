import Actions from './action.type';

export const getListBranches = (payload) => ({
    type: Actions.GET_LIST_BRANCHES,
    payload
})

export const searchListBranches = (payload) => ({
    type: Actions.SEARCH_LIST_BRANCHES,
    payload
})

export const getListBranchesSuccess = (payload) => ({
    type: Actions.GET_LIST_BRANCHES_SUCCESS,
    payload,
})
export const editBranches = (payload) => ({
    type: Actions.EDIT_BRANCH,
    payload,
})
export const addNewBranch = (payload) => ({
    type: Actions.ADD_NEW_BRANCH,
    payload,
})
export const deleteBranch = (payload) => ({
    type: Actions.DELETE_BRANCH,
    payload,
})