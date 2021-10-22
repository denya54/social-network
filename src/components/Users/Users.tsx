import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import styles from './users.module.css'
import axios, {AxiosResponse} from "axios";
import userPhoto from '../../../src/assets/images/sobaka.jpg'
import {UserType} from "../../redux/users-reducer";

class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get<void, AxiosResponse<{ items: Array<UserType>, totalCount: number }>>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        let onPageChanged = (pageNumber: number) => {
            this.props.setCurrentPage(pageNumber)
            axios.get<void, AxiosResponse<{ items: Array<UserType> }>>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUsers(response.data.items)
                })
        }

        return (
            <div>
                <div>
                    {pages.map(page => {
                        return <span onClick={() => {onPageChanged(page)}}
                                     className={this.props.currentPage === page ? styles.selectPage : ''}>{page} </span>
                    })}
                </div>
                {this.props.users.map(us => <div key={us.id}>
                    <span>
                        <div>
                            <img src={us.photos.small != null ? us.photos.small : userPhoto}
                                 className={styles.userPhoto}/>
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
