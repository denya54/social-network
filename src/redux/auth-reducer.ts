import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";

export type AuthType = {
    id: string,
    email: string | null,
    login: string | null,
    isAuth: boolean
    // isFetching: boolean
}

const SET_USER_DATA = 'auth/SET_USER_DATA'


let initialState: AuthType = {
    id: '20162',
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: AuthType = initialState, action: ActionAuthType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export const setAuthUserData = (userID: string | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {userID, email, login, isAuth}} as const)


export type setAuthUserDataACReturnType = ReturnType<typeof setAuthUserData>

type ActionAuthType = setAuthUserDataACReturnType

export const getAuthUserDataThunk = () => async (dispatch: Dispatch) => {
   let response = await authAPI.me()
            if (response.data.resultCode === 0) {
                // деструктуризация
                let {id, email, login } = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
}}

export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe)
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataThunk())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                let action = stopSubmit('login', {_error: message})
                dispatch(action)
            }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
   let response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        }

export default authReducer;