import axios from 'axios';

const BASE_URL = 'https://hipstagram-api.herokuapp.com';

export const getUsersFetch = async (token) => {
    const {data} = await axios.get(BASE_URL + '/users', {
        headers: {
            "Authorization": token
        }
    } )
    return data
}

export const getCurrentUserFetch = async (token) => {
    const {data} = await axios.get(BASE_URL + '/users/current', {
        headers: {
            "Authorization": token
        }
    } )
    console.log(data)
    return data
}

export const updateCurrentUserFetch = async (token, userInfo) => {
    const {data} = await axios.patch(BASE_URL + '/users/current', userInfo, {
        headers: {
            "Authorization": token
        }
    })
    console.log(data)
    return data
}

export const followUserFeth = async (token, id) => {
    await axios.get(BASE_URL + '/users/follow/' + id, {
        headers: {
            "Authorization": token
        }
    })
}

export const getSelectedUserFetch = async (token, id) => {
    const {data} = await axios.get(BASE_URL + '/users/' + id, {
        headers: {
            "Authorization": token
        }
    })
    return data
}

export const createPostFetch = async (token, postData) => {
    const {data} = await axios.post(BASE_URL + '/posts', postData, {
        headers: {
            "Authorization": token
        }
    })
    return data
}

export const getFeedPostsFetch = async (token) => {
    debugger
    const {data} = await axios.get(BASE_URL + '/posts/feed', {
        headers: {
            "Authorization": token
        }
    })
    return data
}

export const likePostFetch = async (token, id) => {
    await axios.get(BASE_URL + '/posts/like/' + id, {
        headers: {
            "Authorization": token
        }
    })
}

export const getPostByIdFetch = async (token, id) => {
    const {data} = await axios.get(BASE_URL + '/posts/' + id, {
        headers: {
            "Authorization": token
        }
    })
    return data
}

export const getUsersByLoginFetch = async ({login, token}) => {
    const {data} = await axios.get(BASE_URL + `/users?search=${login}`, {
        headers: {
            "Authorization": token
        }
    });
    return data
}