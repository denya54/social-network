import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import styles from './users.module.css'
import axios, {Axios, AxiosResponse} from "axios";
import userPhoto from '../../../src/assets/images/sobaka.jpg'
import {UserType} from "../../redux/users-reducer";

// {
//     id: 1,
//     photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUr1M7TORI4VtsAwy8ZwNoG0RRVyNepwfWdw&usqp=CAU',
//     followed: true,
//     fullName: 'Reks',
//     status: 'I am policeDog',
//     location: {city: 'New York', country: 'USA'}
// },

const Users = (props: UsersPropsType) => {
    if (props.users.length === 0) {
        axios.get<void, AxiosResponse<{items: Array<UserType>}>>("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            props.setUsers(response.data.items)
        })
    }

    return (
        <div>
            {
                props.users.map(us => <div key={us.id}>
                    <span>
                        <div>
                            <img src={us.photos.small != null ? us.photos.small : userPhoto} className={styles.userPhoto}/>
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

export default Users;
