import ActionTypes from './actionTypes';


export const loginAction = access_token => {
    return {
        type: ActionTypes.LOGIN_CURR_USER,
        payload: access_token
    }
}

export const logoutAction = () => {
    return {
        type: ActionTypes.LOGOUT_CURR_USER
    }
}

export const getCurrentUserAction = currentUser => {
    return {
        type: ActionTypes.GET_CURRENT_USER,
        payload: currentUser
    }
}

export const updateCurrentUserAction = userInfo => {
    return {
        type: ActionTypes.UPDATE_CURR_USER,
        payload: userInfo
    }
}

export const updatePasswordAction = () => {
    return {
        type: ActionTypes.UPDATE_PASSWORD,
    }
}   

export const getUsersAction = users => {
    return {
        type: ActionTypes.GET_USERS,
        payload: users
    }
}

export const getSelectedUserAction = selectedUser => {
    return {
        type: ActionTypes.GET_USER_BYID,
        payload: selectedUser
    }
}

export const followUserAction = () => {
    return {
        type: ActionTypes.FOLLOW_USERS,
    }
}

export const createPostAction = (newPost) => {
    return {
        type: ActionTypes.CREATE_POST,
        payload: newPost
    }
}

export const getPostsFeedAction = (feed) => {
    return {
        type: ActionTypes.GET_FEED,
        payload: feed
    }
}

export const likePostAction = (id) => {
    return {
        type: ActionTypes.LIKE_POST
    }
}

export const getPostByIdAction = (postById) => {
    return {
        type: ActionTypes.GET_POST_BY_ID,
        payload: postById
    }
}

export const getUsersByLoginAction = (usersByLogin) => {
    return {
        type: ActionTypes.GET_USERS_BY_LOGIN,
        payload: usersByLogin
    }
}