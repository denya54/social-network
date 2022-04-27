import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/sobaka.jpg";
import {NavLink} from 'react-router-dom';
import {UserType} from "../../redux/users-reducer";

type propsUserType = {
    user: UserType
    followingInProgress: Array<any>
    followWithThunk: (userId: number) => void
    unfollowWithThunk: (userId: number) => void
}

export const User = (props: propsUserType) => {
    let user = props.user

    return (
        <div>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + props.user.id}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                     className={styles.userPhoto}/>
                            </NavLink>

                        </div>
                        <div>
                            {props.user.followed
                                ?
                                <button className={styles.butt} disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                    props.unfollowWithThunk(user.id)
                                }}>UnFollow</button>

                                :
                                <button className={styles.butt} disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                    props.followWithThunk(user.id)
                                }}>Follow</button>}
                        </div>
                    </span>
            <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
            <span>
                      {user.location?.country ? <div>{user.location?.country}</div> : <div>{'Country is not defined'}</div>}
                      {user.location?.city ? <div>{user.location?.city}</div> : <div>{'City is not defined'}</div>}
                    </span>
        </div>)
}