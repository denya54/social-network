import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/sobaka.jpg";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from 'react-router-dom';
import axios, {AxiosResponse} from "axios";
import {userAPI} from "../../api/api";


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
    followWithThunk: ( userId: number) => void
    unfollowWithThunk: ( userId: number) => void
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
            <div>
                {pages.map(page => {
                    return <span onClick={() => {
                        props.onPageChanged(page)
                    }}
                                 className={props.currentPage === page ? styles.selectPage : ''}>{page} </span>
                })}
            </div>
            {props.users.map(us => <div key={us.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + us.id}>
                                <img src={us.photos.small != null ? us.photos.small : userPhoto}
                                     className={styles.userPhoto}/>
                            </NavLink>


                        </div>
                        <div>
                            {us.followed
                                ? <button disabled={props.followingInProgress.some(id => id === us.id)} onClick={() => {
                                    props.unfollowWithThunk(us.id)
                                }}>UnFollow</button>

                                : <button disabled={props.followingInProgress.some(id => id === us.id)} onClick={() => {
                                    props.followWithThunk(us.id)
                                }}>Follow</button>}
                        </div>
                    </span>
                <span>
                        <div>{us.name}</div>
                        <div>{us.status}</div>
                    </span>
                <span>
                        <div>{"us.location.country"}</div>
                        <div>{"us.location.city"}</div>
                    </span>
            </div>)
            }
        </div>
    )
}