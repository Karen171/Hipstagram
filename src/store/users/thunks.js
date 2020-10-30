import { loginFetch, registrationFetch, updatePasswordFetch } from '../../api/auth.api';
import { getCurrentUserFetch, 
         updateCurrentUserFetch, 
         getUsersFetch, 
         followUserFeth,
         getSelectedUserFetch,
         createPostFetch,
         getFeedPostsFetch, 
         getPostByIdFetch,
         likePostFetch,
         getUsersByLoginFetch } from '../../api/users.api';

import { loginAction, 
         logoutAction, 
         getCurrentUserAction, 
         updateCurrentUserAction, 
         updatePasswordAction, 
         getUsersAction,
         getSelectedUserAction,
         createPostAction,
         getPostsFeedAction, 
         likePostAction ,
         getPostByIdAction,
         getUsersByLoginAction} from './actions';
import {toast} from 'react-toastify'

export const registrationThunk = userData => {
    return async () => {
        try {
            await registrationFetch(userData);
        } catch(e) {
            console.log(e);
        }
    }
}

export const loginThunk = userData => {
    return async (dispatch) => {
        try {
          const {access_token} = await loginFetch(userData);
          console.log(access_token)
          localStorage.setItem('accessToken', access_token);
          dispatch(loginAction(access_token));
        } catch(e) {
            // console.log(e);
            toast.error(e.response, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }
}

export const logoutThunk = () => {
    return async dispatch => {
        try {
            dispatch(logoutAction()) 
        } catch(e) {
            console.log(e);
        }
        
    }
} 

export const initThunk = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('accessToken');
            console.log(token)
            if (!token) {
                return dispatch(logoutThunk())
            }
            dispatch(loginAction(token))
        } catch(e) {
            console.log(e);
        }
    }
}

export const getCurrentUserThunk = (userData) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('accessToken');
            let currentUser = await getCurrentUserFetch(token);
            dispatch(getCurrentUserAction(currentUser));
            userData.loading(true)
        } catch(e) {
            console.log(e)
        }
        
    }
}

export const updateCurrUserThunk = (userData) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('accessToken');
            let userInfo = await updateCurrentUserFetch(token, userData);
            dispatch(updateCurrentUserAction(userInfo))
        } catch(e) {
            console.log(e);
        }
        
    }
}

export const updatePasswordThunk = (userData) => {
    return async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await updatePasswordFetch(token, userData);
        } catch(e) {
            console.log(e);
        }
        
    }
}

export const getUsersThunk = (userData) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('accessToken');
            const users = await getUsersFetch(token);
            dispatch(getUsersAction(users));
            userData.loading(true)
        } catch(e) {
            console.log(e);
        };
    }
}

export const followUserThunk = (id) => {
    return async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await followUserFeth(token, id);
        } catch(e) {
            console.log(e);
        };
    }
}

export const getSelectedUserThunk = (userData) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('accessToken');
            const selectedUser = await getSelectedUserFetch(token, userData.id);
            dispatch(getSelectedUserAction(selectedUser));
            userData.loading(true)
        } catch(e) {
            console.log(e);
        };
    }
}

export const createPostThunk = ({postData}) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('accessToken');
            const newPost = await createPostFetch(token, postData);
            dispatch(createPostAction(newPost));
            toast.access('Post created!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        } catch(e) {
            toast.error(e.response, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }
}

export const getFeedPostsThunk = (userData) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('accessToken');
            const feed = await getFeedPostsFetch(token);
            dispatch(getPostsFeedAction(feed))
            userData.loading(true)
        } catch(e) {
            console.log(e)
        }
    }
}

export const getPostByIdThunk = (id) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('accessToken');
            const postById = await getPostByIdFetch(token, id);
            dispatch(getPostByIdAction(postById))
        } catch(e) {
            console.log(e)
        }
    }
}

export const likePostThunk = (id) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('accessToken');
            await likePostFetch(token, id)
            dispatch(getPostByIdThunk(id))
            dispatch(getFeedPostsThunk())
        } catch(e) {
            console.log(e)
        }
    }
}


export const getUsersByLoginThunk = (login) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('accessToken');
            const users = await (getUsersByLoginFetch({ login, token }))
            dispatch(getUsersByLoginAction(users))
        }
        catch(e) {
            console.log(e)
        }
    }
}