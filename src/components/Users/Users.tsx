import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import styles from './users.module.css'
import axios, {AxiosResponse} from "axios";
import userPhoto from '../../../src/assets/images/sobaka.jpg'
import {UserType} from "../../redux/users-reducer";

class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get<void, AxiosResponse<{items: Array<UserType>}>>("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return (
            <div>
                {this.props.users.map(us => <div key={us.id}>
                    <span>
                        <div>
                            <img src={us.photos.small != null ? us.photos.small : userPhoto} className={styles.userPhoto}/>
                        </div>
                        <div>
                            {us.followed ? <button onClick={() => {
                                    this.props.unfollow(us.id)
                                }}>UnFollow</button>
                                : <button onClick={() => {
                                    this.props.follow(us.id)
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
}

export default Users;
