import {userAPI} from "../api/api";
import {AxiosResponse} from "axios";

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

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UN-FOLLOW'
const SET_USERS = 'users/SET-USERS'
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'users/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

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
                    : [...state.followingInProgress.filter(userId => userId !== action.userId)]
            }
        default:
            return state
    }
}

export const followAC = (userID: number) => ({type: FOLLOW, userID} as const)
export const unFollowAC = (userID: number) => ({type: UNFOLLOW, userID} as const)
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const)
export const setCurrentPageAC = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber} as const)
export const setTotalUsersCountAC = (totalCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const followingProgressAC = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
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
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPageAC(currentPage))
        let data = await userAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(data.totalCount))
    }
}

const followUnfollowFlow = async (
    dispatch: any,
    userId: number,
    apiMethod: (userId: number) => Promise<AxiosResponse<{ items: Array<UserType>, resultCode: number }>>,
    actionCreator: (userId: number) => followACReturnType | unFollowACReturnType
) => {
    dispatch(followingProgressAC(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(followingProgressAC(false, userId))
}

export const followThunk = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followAC)
    }
}

export const unFollowThunk = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unFollowAC)
    }
}

export default usersReducer;