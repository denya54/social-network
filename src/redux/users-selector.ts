import {StateType} from "./redux-store";
import {createSelector} from "reselect";
import {UserType} from "./users-reducer";

// export const getUsers = (state: StateType) => {
//     return state.usersPage.users
// }

export const getPageSize = (state: StateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: StateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: StateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: StateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: StateType) => {
    return state.usersPage.followingInProgress
}

export const getUsersSelector = (state: StateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, getIsFetching, (users: Array<UserType>, isFetching: boolean) => {
    return users.filter(u => true)
})


