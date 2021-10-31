import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/sobaka.jpg";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from 'react-router-dom';
import axios, {AxiosResponse} from "axios";



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
                                    props.toggleIsFollowingInProgress(true, us.id)
                                    axios.delete<void, AxiosResponse<{ items: Array<UserType>, resultCode: number }>>(`https://social-network.samuraijs.com/api/1.0/follow/${us.id}`,  {withCredentials: true,
                                    headers: {"API-KEY": "089d3e24-70d2-4632-9ce2-42855d61866e"}
                                    })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(us.id)
                                            }
                                            props.toggleIsFollowingInProgress(false, us.id)
                                        })
                                }}>UnFollow</button>

                                : <button disabled={props.followingInProgress.some(id => id === us.id)} onClick={() => {
                                    props.toggleIsFollowingInProgress(true, us.id)
                                    axios.post<void, AxiosResponse<{ items: Array<UserType>, resultCode: number }>>(`https://social-network.samuraijs.com/api/1.0/follow/${us.id}`, {}, {withCredentials: true,
                                        headers: {"API-KEY": "089d3e24-70d2-4632-9ce2-42855d61866e"}})
                                        .then(response => {
                                          if (response.data.resultCode === 0) {
                                              props.follow(us.id)
                                          }
                                            props.toggleIsFollowingInProgress(false, us.id)
                                        })
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