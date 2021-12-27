import {getAuthUserDataThunk} from "./auth-reducer";

type AppType = {
    initialized: boolean
}

const SET_INITIALIZED = 'SET_INITIALIZED'


let initialState: AppType = {
    initialized: false
}

const appReducer = (state: AppType = initialState, action: ActionAuthType): AppType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const setInitializedSuccess = () =>
    ({type: 'SET_INITIALIZED'} as const)


export type setInitializedSuccessACReturnType = ReturnType<typeof setInitializedSuccess>

export const initializeAppTC = () => (dispatch: any) => {
   let promise = dispatch(getAuthUserDataThunk())
    promise.then(()=> {
        dispatch(setInitializedSuccess())
    })
}
//
// export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
//     authAPI.login(email, password, rememberMe)
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(getAuthUserDataThunk())
//             } else {
//                 let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
//                 let action = stopSubmit('login', {_error: message})
//                 dispatch(action)
//             }
//         })
// }
//
// export const logoutTC = () => (dispatch: Dispatch) => {
//     authAPI.logout()
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 dispatch(setAuthUserData(null, null, null, false))
//             }
//         })}

type ActionAuthType = setInitializedSuccessACReturnType

export default appReducer;