import {authAPI} from "../api/api";

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
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

export const setAuthUserData = (userID: number | null, email: string | null, login: string | null) => ({type: 'SET_USER_DATA', data: {userID, email, login}} as const)


export type setAuthUserDataACReturnType = ReturnType<typeof setAuthUserData>

export const getAuthUserDataThunk = () => (dispatch: any) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                // деструктуризация
                let {id, email, login } = response.data.data
                dispatch(setAuthUserData(id, email, login))
            }
        })
}


type ActionAuthType = setAuthUserDataACReturnType

export default authReducer;