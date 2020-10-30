export const userStateSelector = state => state.users;

export const getCurrentUser = state => userStateSelector(state).currentUser;

export const getUserTokenSelector = state => getCurrentUser(state).access_token;

export const getUserAuthSelector = state => getCurrentUser(state).isAuth;

export const getCurrentUserInfo = state => userStateSelector(state).user;

export const getUsersSelector = state => userStateSelector(state).users;

export const getFollowingsSelector = state => getCurrentUserInfo(state).following

export const getSelectedUserSelector = state => userStateSelector(state).selectedUser

export const getPostsSelector = state => getCurrentUserInfo(state).posts

export const getFeedsSelector = state => userStateSelector(state).feed

export const getPostByIdSelector = state => userStateSelector(state).postById

export const getUsersByLoginSelector = state => userStateSelector(state).usersByLogin