import axios from 'axios';

const BASE_URL = 'https://hipstagram-api.herokuapp.com';

export const registrationFetch = async (userData) => {
    const {data} = await axios.post(BASE_URL + '/auth/registration', userData);
    return data
}

export const loginFetch = async (userData) => {
    const {data} = await axios.post(BASE_URL + '/auth/login', userData)
    console.log(data)
    return data
}

export const updatePasswordFetch = async (token, userInfo) => {
    const {data} = await axios.post(BASE_URL + '/auth/updatePassword', userInfo, {
        headers: {
            "Authorization": token
        }
    })
    console.log(data)
}