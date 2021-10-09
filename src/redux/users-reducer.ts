import {addPostActionCreator, updateNewPostTextActionCreator} from "./profile-reducer";

export type locationType = {
    city: string
    country: string
}

export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: locationType
}

export type UsersType = {
    users: Array<UserType>
}

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UN-FOLLOW'
const SETUSERS = 'SET-USERS'

let initialState: UsersType = {
    users: [
        // {
        //     id: 1,
        //     photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUr1M7TORI4VtsAwy8ZwNoG0RRVyNepwfWdw&usqp=CAU',
        //     followed: true,
        //     fullName: 'Reks',
        //     status: 'I am policeDog',
        //     location: {city: 'New York', country: 'USA'}
        // },
        // {
        //     id: 2,
        //     photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzm9Ui8ogkgIgkATR9yavbtk0xFsqENyeIJg&usqp=CAU',
        //     followed: true,
        //     fullName: 'Muhtar',
        //     status: 'I am policeDog too',
        //     location: {city: 'Moscow', country: 'Russia'}
        // },
        // {
        //     id: 3,
        //     photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8zVQWSL1uSUSf029zUjlzUT3_xBiBbRdVMQ&usqp=CAU',
        //     followed: false,
        //     fullName: 'Bars',
        //     status: 'I am fighter DFC',
        //     location: {city: 'Paris', country: 'France'}
        // },
        // {
        //     id: 4,
        //     photoUrl: 'https://sun9-39.userapi.com/impf/c851136/v851136741/42edd/PLKO5OQCksM.jpg?size=604x402&quality=96&sign=41b93740ddf050ccd4b109d47d93fc83&type=album',
        //     followed: false,
        //     fullName: 'Taras',
        //     status: 'I am dog Taras',
        //     location: {city: 'Kiev', country: 'Ukraine'}
        // }
    ]
}

const usersReducer = (state: UsersType = initialState, action: ActionUserType): UsersType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userID ? {...user, followed: true} : user)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userID ? {...user, followed: false} : user)
            }
        case SETUSERS:
            return {
                ...state, users: [...state.users, ...action.users]
            }
        default:
            return state
    }
}

export const followAC = (userID: number) => ({type: 'FOLLOW', userID} as const)
export const unFollowAC = (userID: number) => ({type: 'UN-FOLLOW', userID} as const)
export const setUsersAC = (users: Array<UserType>) => ({type: 'SET-USERS', users} as const)

export type followACReturnType = ReturnType<typeof followAC>
export type unFollowACReturnType = ReturnType<typeof unFollowAC>
export type setUsersACReturnType = ReturnType<typeof setUsersAC>

type ActionUserType = followACReturnType | unFollowACReturnType | setUsersACReturnType




export default usersReducer;