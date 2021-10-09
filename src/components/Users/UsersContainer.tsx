import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {followAC, setUsersAC, unFollowAC, UserType} from "../../redux/users-reducer";
import {StateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

let mapStateToProps = (state: StateType): MapStatePropsReturnType => {
    return {
        users: state.usersPage.users
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
        }
    }
}
type MapDispatchReturnType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
}

type MapStatePropsReturnType = {
    users: Array<UserType>
}

export type UsersPropsType = MapDispatchReturnType & MapStatePropsReturnType

export default connect(mapStateToProps, mapDispatchToProps)(Users)