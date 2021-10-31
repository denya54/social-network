
// export type locationType = {
//     city: string
//     country: string
// }
//
// export type photosType = {
//     small: string | null
//     large: string | null
// }
//
// export type UserType = {
//     name: string
//     id: number
//     uniqueUrlName: string | null
//     photos: photosType
//     status: string
//     followed: boolean
//     //
//     photoUrl?: string
//     location?: locationType
// }

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


type ActionAuthType = setAuthUserDataACReturnType




export default authReducer;