import {userAPI} from "../api/api";

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
    isFetching: boolean
    followingInProgress: Array<any>
}

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UN-FOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState: UsersType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 15368,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
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
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(userId => userId != action.userId)]
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
export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const)
export const followingProgressAC = (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId
} as const)

export type followACReturnType = ReturnType<typeof followAC>
export type unFollowACReturnType = ReturnType<typeof unFollowAC>
export type setUsersACReturnType = ReturnType<typeof setUsersAC>
export type setCurrentReturnType = ReturnType<typeof setCurrentPageAC>
export type setTotalUsersCountReturnType = ReturnType<typeof setTotalUsersCountAC>
export type toggleIsFetchingReturnType = ReturnType<typeof toggleIsFetching>
export type followingProgressReturnType = ReturnType<typeof followingProgressAC>

type ActionUserType = followACReturnType | unFollowACReturnType | setUsersACReturnType |
    setCurrentReturnType | setTotalUsersCountReturnType | toggleIsFetchingReturnType | followingProgressReturnType


export const requestUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPageAC(currentPage))
        userAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            // dispatch(setUsers(data.items))
            dispatch(setUsersAC(data.items))
            dispatch(setTotalUsersCountAC(data.totalCount))
            // dispatch(setTotalUsersCount(data.totalCount))
        })
    }
}

export const followThunk = (userId: number) => {
    return (dispatch: any) => {

        dispatch(followingProgressAC(true, userId))
        userAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followAC(userId))
                }
                dispatch(followingProgressAC(false, userId))
            })
    }
}

export const unFollowThunk = (userId: number) => {
    return (dispatch: any) => {

        dispatch(followingProgressAC(true, userId))
        userAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unFollowAC(userId))
                }
                dispatch(followingProgressAC(false, userId))
            })
    }
}

export default usersReducer;