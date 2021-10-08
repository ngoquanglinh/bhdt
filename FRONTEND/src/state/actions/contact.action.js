import actions from './action.type';

export const getListContact = (payload) => ({
    type: actions.GET_ALL_CONTACT,
    payload
})
export const getListContactSuccess = (payload) => ({
    type: actions.GET_LIST_CONTACT_SUCCESS,
    payload
})
export const editContact = (payload) => ({
    type: actions.EDIT_CONTACT,
    payload
})
export const removeContact = (payload) => ({
    type: actions.REMOVE_CONTACT,
    payload
})

export const addContact = (payload) => ({
    type: actions.ADD_CONTACT,
    payload
})