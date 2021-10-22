import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/sobaka.jpg";
import {UserType} from "../../redux/users-reducer";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    users: Array<UserType>
    unfollow: (userID: number) => void
    follow: (userID: number) => void
}

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
                            <img src={us.photos.small != null ? us.photos.small : userPhoto}
                                 className={styles.userPhoto}/>
                        </div>
                        <div>
                            {us.followed ? <button onClick={() => {
                                    props.unfollow(us.id)
                                }}>UnFollow</button>
                                : <button onClick={() => {
                                    props.follow(us.id)
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