import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unFollowAC,
    UserType
} from "../../redux/users-reducer";
import {StateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

let mapStateToProps = (state: StateType): MapStatePropsReturnType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch) : MapDispatchReturnType => {
    return {
        follow: (userID: number) => {
            dispatch (followAC(userID))
        },
        unfollow: (userID: number) => {
            dispatch (unFollowAC(userID))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setTotalUsersCountAC(totalCount))
        }
    }
}
type MapDispatchReturnType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
}

type MapStatePropsReturnType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

export type UsersPropsType = MapDispatchReturnType & MapStatePropsReturnType

export default connect(mapStateToProps, mapDispatchToProps)(Users)