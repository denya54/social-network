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
    UserType, getUsersThunkCreator, followThunk, unFollowThunk
} from "../../redux/users-reducer";
import {Preloader} from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.getUsersWithThunk(this.props.currentPage, this.props.pageSize)
        // this.props.toggleIsFetching(true)
        // userAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false)
        //     this.props.setUsers(data.items)
        //     this.props.setTotalUsersCount(data.totalCount)
        // })
    }

    render() {

        let onPageChanged = (pageNumber: number) => {
            this.props.getUsersWithThunk(pageNumber, this.props.pageSize)

            // this.props.setCurrentPage(pageNumber)
            // this.props.toggleIsFetching(true)
            // userAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            //     this.props.toggleIsFetching(false)
            //     this.props.setUsers(data.items)
            // })
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
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
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
        getUsersWithThunk: getUsersThunkCreator
    }),
    withAuthRedirect
)(UsersContainer)