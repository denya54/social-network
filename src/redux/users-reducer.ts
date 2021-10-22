import {addPostActionCreator, updateNewPostTextActionCreator} from "./profile-reducer";

export type locationType = {
    city: string
    country: string
}

export type photosType = {
    small: string | null
    large: string | null
}

export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: photosType
    status: string
    followed: boolean
    //
    photoUrl?: string
    location?: locationType
}

export type UsersType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UN-FOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'

let initialState: UsersType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 15368,
    currentPage: 1
}

const usersReducer = (state: UsersType = initialState, action: ActionUserType): UsersType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userID ? {...user, followed: true} : user)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userID ? {...user, followed: false} : user)
            }
        case SET_USERS:
            return {
                ...state, users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.pageNumber
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalCount
            }
        default:
            return state
    }
}

export const followAC = (userID: number) => ({type: 'FOLLOW', userID} as const)
export const unFollowAC = (userID: number) => ({type: 'UN-FOLLOW', userID} as const)
export const setUsersAC = (users: Array<UserType>) => ({type: 'SET-USERS', users} as const)
export const setCurrentPageAC = (pageNumber: number) => ({type: 'SET-CURRENT-PAGE', pageNumber} as const)
export const setTotalUsersCountAC = (totalCount: number) => ({type: 'SET-TOTAL-USERS-COUNT', totalCount} as const)

export type followACReturnType = ReturnType<typeof followAC>
export type unFollowACReturnType = ReturnType<typeof unFollowAC>
export type setUsersACReturnType = ReturnType<typeof setUsersAC>
export type setCurrentReturnType = ReturnType<typeof setCurrentPageAC>
export type setTotalUsersCountReturnType = ReturnType<typeof setTotalUsersCountAC>

type ActionUserType = followACReturnType | unFollowACReturnType | setUsersACReturnType | setCurrentReturnType | setTotalUsersCountReturnType




export default usersReducer;