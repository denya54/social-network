import React from 'react';
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleIsFetching, followingProgressAC,
    unFollowAC,
    UserType, requestUsersThunkCreator, followThunk, unFollowThunk
} from "../../redux/users-reducer";
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selector";


class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        let {currentPage, pageSize} = this.props

        this.props.getUsersWithThunk(currentPage, pageSize)
    }

    render() {

        let onPageChanged = (pageNumber: number) => {
            this.props.getUsersWithThunk(pageNumber, this.props.pageSize)
        }

        return <>
            {this.props.isFetching ? <Preloader/> : null}

            <Users
                {...this.props}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                onPageChanged={onPageChanged}
                currentPage={this.props.currentPage}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}
                toggleIsFollowingInProgress={this.props.toggleIsFollowingInProgress}
                followWithThunk={this.props.followWithThunk}
                unfollowWithThunk={this.props.unfollowWithThunk}
            />
        </>
    }
}

let mapStateToProps = (state: StateType): MapStatePropsReturnType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

type MapDispatchReturnType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowingInProgress: (isFetching: boolean, userId: number) => void
    getUsersWithThunk: (currentPage: number, pageSize: number) => void
    followWithThunk: ( userId: number) => void
    unfollowWithThunk: (userId: number) => void
}

type MapStatePropsReturnType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<any>
}

export type UsersContainerPropsType = MapDispatchReturnType & MapStatePropsReturnType


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow: followAC,
        unfollow: unFollowAC,
        followWithThunk: followThunk,
        unfollowWithThunk: unFollowThunk,
        setUsers: setUsersAC,
        setCurrentPage: setCurrentPageAC,
        setTotalUsersCount: setTotalUsersCountAC,
        toggleIsFetching: toggleIsFetching,
        toggleIsFollowingInProgress: followingProgressAC,
        getUsersWithThunk: requestUsersThunkCreator
    })
)(UsersContainer)