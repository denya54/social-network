import React from 'react';
import {UserType} from "../../redux/users-reducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";


type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    users: Array<UserType>
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    followingInProgress: Array<any>
    toggleIsFollowingInProgress: (isFetching: boolean, userId: number) => void
    followWithThunk: (userId: number) => void
    unfollowWithThunk: (userId: number) => void
}

// type PropsType = RouteComponentProps<UsersPropsType> & UsersContainerPropsType

export const Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <Paginator totalItemsCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}
                       portionSize={10}/>

            {props.users.map(us => <User key={us.id}
                                         user={us}
                                         followWithThunk={props.followWithThunk}
                                         followingInProgress={props.followingInProgress}
                                         unfollowWithThunk={props.unfollowWithThunk}/>)

            }
        </div>
    )
}