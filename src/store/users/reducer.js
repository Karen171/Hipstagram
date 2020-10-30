import ActionTypes from './actionTypes';

const createInitialState = () => {
    return {
        currentUser: {
            isAuth: false,
            access_token: '',
        },
        user: {},
        postById: {},
        feed: [],
        users: [],
        selectedUser: {},
        usersByLogin: []
    }
}

const userReducer = (state = createInitialState(), action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_CURR_USER:
            return {
                ...state,
                currentUser: {
                    isAuth: true,
                    access_token: action.payload
                }
            }
        case ActionTypes.LOGOUT_CURR_USER:
            localStorage.removeItem('accessToken');
            return {
                ...state,
                currentUser: {
                    isAuth: false,
                    access_token: ''
                }
            }
        case ActionTypes.GET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }
        case ActionTypes.UPDATE_CURR_USER:
            return {
                ...state,
                user: action.payload
            }
        case ActionTypes.UPDATE_PASSWORD:
            return {
                ...state,
                user: action.payload
            }
        case ActionTypes.GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case ActionTypes.FOLLOW_USERS:
            return {
                ...state
            }
        case ActionTypes.GET_USER_BYID:
            return {
                ...state,
                selectedUser: action.payload
            }
        case ActionTypes.CREATE_POST:
            return {
                ...state,
                posts: action.payload
            }
        case ActionTypes.GET_FEED:
            return {
                ...state,
                feed: action.payload
            }
        case ActionTypes.GET_POST_BY_ID:
            return {
                ...state,
                postById: action.payload
            }
        case ActionTypes.GET_USERS_BY_LOGIN:
            return {
                ...state,
                usersByLogin: action.payload
            }
        default:
            return state
            
    }
}

export default userReducer