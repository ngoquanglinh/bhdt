import actions from './action.type';

export const getListBlog = (payload) => ({
    type: actions.GET_ALL_BLOG,
    payload
})
export const getListBlogSuccess = (payload) => ({
    type: actions.GET_LIST_BLOG_SUCCESS,
    payload
})
export const editBlog = (payload) => ({
    type: actions.EDIT_BLOG,
    payload
})
export const removeBlog = (payload) => ({
    type: actions.REMOVE_BLOG,
    payload
})

export const addNewBlog = (payload) => ({
    type: actions.ADD_BLOG,
    payload
})

export const getDetailBlog = (payload) => ({
    type: actions.GET_DETAIL_BLOG,
    payload
})