import {getAuthUserDataThunk} from "./auth-reducer";

type AppType = {
    initialized: boolean
}

const SET_INITIALIZED = 'app/SET_INITIALIZED'


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
    ({type: SET_INITIALIZED } as const)


export type setInitializedSuccessACReturnType = ReturnType<typeof setInitializedSuccess>

export const initializeAppTC = () => (dispatch: any) => {
   let promise = dispatch(getAuthUserDataThunk())
    promise.then(()=> {
        dispatch(setInitializedSuccess())
    })
}

type ActionAuthType = setInitializedSuccessACReturnType

export default appReducer;