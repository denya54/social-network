import {ActionType} from "./store";

export type contactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}

type photosType = {
    small: string | undefined
    large: string | undefined
}

export type UserProfileType = {
    aboutMe: string
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: photosType
}


const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

export type postType = {
    id?: number
    message: string
    likesCount: number
}

export type profilePageType = {
    posts: Array<postType>
    newPostText: string
    profile: UserProfileType | null
}


let initialState: profilePageType = {
    newPostText: "",
    posts: [
        {id: 1, message: "My first GAV", likesCount: 12},
        {id: 2, message: "Don`t like Myay", likesCount: 10},
        {id: 3, message: "How do you do", likesCount: 16},
    ] as Array<postType>,
    profile: null
};

const profileReducer = (state: profilePageType = initialState, action: ActionType): profilePageType => {
    switch (action.type) {
        case ADD_POST:
            return {...state,
                newPostText: '',
                posts: [...state.posts, {
                    id: 4,
                    message: action.postMessage,
                    likesCount: 0
                }]
            }
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.NewText};
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default:
            return state
    }
}

export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type UpdateNewPostTextType = ReturnType<typeof updateNewPostTextActionCreator>
export type SetUserProfileReturnType = ReturnType<typeof setUserProfileAC>

type ActionProfileType = AddPostActionType | UpdateNewPostTextType | SetUserProfileReturnType

export const addPostActionCreator = (postText: string) => ({type: ADD_POST, postMessage: postText} as const)
export const updateNewPostTextActionCreator = (postText: string) => {
    return {type: UPDATE_NEW_POST_TEXT, NewText: postText} as const
}
export const setUserProfileAC = (profile: UserProfileType) => ({type: SET_USER_PROFILE, profile} as const)
export default profileReducer;