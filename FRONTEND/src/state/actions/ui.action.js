import actions from './action.type';

export const showLoading = () => ({
  type: actions.SHOW_LOADING,
});

export const hideLoading = () => ({
  type: actions.HIDE_LOADING,
});

export const showSidebar = () => ({
  type: actions.SHOW_SIDEBAR,
});

export const hideSidebar = () => ({
  type: actions.HIDE_SIDEBAR,
});
