import { Actions } from "../actions";

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    role: null,
    login: false
};
const loginUser = (state = initialState, action) => {
    switch (action.type) {
        case Actions.USER_LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.login = true;
            return {
                ...state,
            };
        case Actions.USER_LOGOUT:
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.role = null;
            state.login = false;
            return {
                ...state
            }
        case Actions.GET_ACCOUNT_SUCCESS:
            state.user = action.payload.data;
            return {
                ...state
            }
        case Actions.GET_ACCOUNT_ERROR:
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.role = null;
            state.login = false;
            return {
                ...state
            }
        default:
            return state;
    }
}
export default loginUser;
