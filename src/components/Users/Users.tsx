import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import styles from './users.module.css'

const Users = (props: UsersPropsType) => {
if (props.users.length === 0) {
    props.setUsers([
        {
            id: 1,
            photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUr1M7TORI4VtsAwy8ZwNoG0RRVyNepwfWdw&usqp=CAU',
            followed: true,
            fullName: 'Reks',
            status: 'I am policeDog',
            location: {city: 'New York', country: 'USA'}
        },
        {
            id: 2,
            photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzm9Ui8ogkgIgkATR9yavbtk0xFsqENyeIJg&usqp=CAU',
            followed: true,
            fullName: 'Muhtar',
            status: 'I am policeDog too',
            location: {city: 'Moscow', country: 'Russia'}
        }
    ])
}

    return (
        <div>
            {
                props.users.map(us => <div key={us.id}>
                    <span>
                        <div>
                            <img src={us.photoUrl} className={styles.userPhoto}/>
                        </div>
                        <div>
                            {us.followed ? <button onClick={()=> {props.unfollow(us.id)}}>UnFollow</button>
                                : <button onClick={()=> {props.follow(us.id)}}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <div>{us.fullName}</div>
                        <div>{us.status}</div>
                    </span>
                    <span>
                        <div>{us.location.country}</div>
                        <div>{us.location.city}</div>
                    </span>

                </div>)
            }
        </div>
    )
}

export default Users;
