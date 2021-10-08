import actions from './action.type';

export const userLogin = payload => ({
  type: actions.USER_LOGIN,
  payload,
});

export const userSingin = payload => ({
  type: actions.USER_SIGNUP,
  payload,
});


export const userLoginSuccess = payload => ({
  type: actions.USER_LOGIN_SUCCESS,
  payload,
});

export const getProfileUser = () => ({
  type: actions.GET_USER_INFO,
});


export const getProfileUserSuccess = payload => ({
  type: actions.GET_USER_INFO_SUCCESS,
  payload,
});

export const deleteProfileUser = () => ({
  type: actions.DELET_USER_INFO,
});

export const userLogoutPage = () => ({
  type: actions.USER_LOGOUT,
});

export const getAcount = (payload) => ({
  type: actions.GET_ACCOUNT,
  payload
});

export const getAccountSuccess = (payload) => ({
  type: actions.GET_ACCOUNT_SUCCESS,
  payload,
});

export const getAccountError = (payload) => ({
  type: actions.GET_ACCOUNT_ERROR,
  payload,
});