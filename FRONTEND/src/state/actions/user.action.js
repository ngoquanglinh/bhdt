import actions from './action.type';

export const getListUser = () => ({
  type: actions.GET_LIST_USER
})
export const getListUserRec = (payload) => ({
  type: actions.GET_LIST_USER_REC,
  payload
})
export const verifyCandidate = (payload) => ({
  type: actions.VERIFY_CANDIDATE,
  payload
})

export const getListUserSuccess = (payload ) => ({
  type: actions.GET_LIST_USER_SUCCESS,
  payload  
})
export const getListUserRecSuccess = (payload ) => ({
  type: actions.GET_LIST_USER_REC_SUCCESS,
  payload  
})
export const editUser = (payload ) => ({
  type: actions.EDIT_USER,
  payload  
})

export const editUserSuccess = (payload ) => ({
  type: actions.EDIT_USER_SUCCESS,
  payload  
})

export const getListRecruitment = () => ({
  type: actions.GET_LIST_RECRUITMENT,

})

export const getListRecruitmentSuccess = (payload ) => ({
  type: actions.GET_LIST_RECRUITMENT_SUCCESS,
  payload  
})
export const filterListUser = (payload ) => ({
  type: actions.FILTER_USER,
  payload  
})
export const filterListUserString = (payload ) => ({
  type: actions.FILTER_USER_USERNAME,
  payload  
})
export const addCoins = (payload ) => ({
  type: actions.ADD_COINS,
  payload  
})
export const renoveCoins = (payload ) => ({
  type: actions.REMOVE_COINS,
  payload  
})


export const upgradeVip = (payload ) => ({
  type: actions.UPGRADE_VIP,
  payload  
})

export const userSignUp = (payload ) => ({
  type: actions.USER_SIGNUP,
  payload  
})


