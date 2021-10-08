import { Actions } from '../actions';

const initialState = {
    blogs: null,
};

const blogs = (state = initialState, action) => {
    switch (action.type) {
        case Actions.GET_LIST_BLOG_SUCCESS: {
            return {
                ...state,
                blogs: action.payload.data,
            };
        }
        default:
            return state;
    }
};

export default blogs;
