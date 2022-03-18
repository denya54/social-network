import {authAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";

export type AuthType = {
    id: string,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captcha: string | null
    error: string | null
    // isFetching: boolean
}

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'
const GET_AUTH_ERROR= 'auth/GET_AUTH_ERROR'


let initialState: AuthType = {
    id: '20162',
    email: null,
    login: null,
    isAuth: false,
    captcha: null,
    error: null
}

const authReducer = (state: AuthType = initialState, action: ActionAuthType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL:
            return {...state, captcha: action.payload.captchaURL}
        case GET_AUTH_ERROR:
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export const setAuthUserData = (userID: string | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {userID, email, login, isAuth}} as const)

export const getCaptchaUrlAC = (captchaURL: string) => {
    return ({type: GET_CAPTCHA_URL, payload: {captchaURL}} as const)
}

export const getAuthErrorAC = (error: string | null) => {
    return ({type: GET_AUTH_ERROR, payload: {error}} as const)
}


export type setAuthUserDataACReturnType = ReturnType<typeof setAuthUserData>
export type getCaptchaUrlACReturnType = ReturnType<typeof getCaptchaUrlAC>
export type getAuthErrorACReturnType = ReturnType<typeof getAuthErrorAC>

type ActionAuthType = setAuthUserDataACReturnType | getCaptchaUrlACReturnType | getAuthErrorACReturnType

export const getAuthUserDataThunk = () => async (dispatch: Dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        // деструктуризация
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunk())
    }  else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaURLTC())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(getAuthErrorAC(message))
    }
}

export const getCaptchaURLTC = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl()
    let captchaURL = response.data.url
    dispatch(getCaptchaUrlAC(captchaURL))
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;