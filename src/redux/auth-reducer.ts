import {authAPI} from "../api/api";
import {Dispatch} from "redux";

export type AuthType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
    // isFetching: boolean
}

const SET_USER_DATA = 'SET_USER_DATA'


let initialState: AuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
    // isFetching: false
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

export const setAuthUserData = (userID: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: 'SET_USER_DATA', payload: {userID, email, login, isAuth}} as const)


export type setAuthUserDataACReturnType = ReturnType<typeof setAuthUserData>

export const getAuthUserDataThunk = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                // деструктуризация
                let {id, email, login } = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            debugger
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataThunk())
            }
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })}

type ActionAuthType = setAuthUserDataACReturnType

export default authReducer;