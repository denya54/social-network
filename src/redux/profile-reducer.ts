import {profileAPI, userAPI} from "../api/api";
import {StateType} from "./redux-store";

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
    aboutMe?: string
    contacts?: contactsType
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    userId?: string
    photos: photosType
}

export type profileStatusType = {
    resultCode: number
    messages: Array<string>
    data: object
}

export type profilePhotoType = {
    resultCode: number
    messages: Array<string>
    data: {
        photos: {
            small: string
            large: string
        }
    }
}

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_STATUS = 'profile/SET-STATUS'
const DELETE_POST = 'profile/DELETE-POST'
const SET_PHOTO = 'profile/SET-PHOTO'

export type postType = {
    id?: number
    message: string
    likesCount: number
}

export type profilePageType = {
    posts: Array<postType>
    profile: UserProfileType | null
    status: string
}


let initialState: profilePageType = {
    posts: [
        {id: 1, message: "My first GAV", likesCount: 12},
        {id: 2, message: "Don`t like Myay", likesCount: 10},
        {id: 3, message: "How do you do?", likesCount: 16},
    ] as Array<postType>,
    profile: null,
    status: "",
};

const profileReducer = (state: profilePageType = initialState, action: ActionProfileType): profilePageType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                // newPostText: '',
                posts: [...state.posts, {
                    id: 4,
                    message: action.postMessage,
                    likesCount: 0
                }]
            }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postID)}
        }
        case SET_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state
    }
}

export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type SetUserProfileReturnType = ReturnType<typeof setUserProfileAC>
export type SetStatusReturnType = ReturnType<typeof setStatusActionCreator>
export type DeletePostReturnType = ReturnType<typeof deletePostActionCreator>
export type SetPhotoReturnType = ReturnType<typeof setPhotoActionCreator>

type ActionProfileType = AddPostActionType
    | SetUserProfileReturnType
    | SetStatusReturnType
    | DeletePostReturnType
    | SetPhotoReturnType

export const addPostActionCreator = (postText: string) => ({type: ADD_POST, postMessage: postText} as const)
export const setUserProfileAC = (profile: UserProfileType) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatusActionCreator = (status: string) => ({type: SET_STATUS, status} as const)
export const deletePostActionCreator = (postID: number) => ({type: DELETE_POST, postID} as const)
export const setPhotoActionCreator = (photos: photosType) => ({type: SET_PHOTO, photos} as const)
export const setMyProfileActionCreator = (photos: photosType) => ({type: SET_PHOTO, photos} as const)


export const getUserProfileThunk = (userId: string) => async (dispatch: any) => {
    let response = await userAPI.getProfile(userId)
    dispatch(setUserProfileAC(response.data))
}

export const getStatusThunk = (userId: string) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatusActionCreator(response.data))
}

export const updateStatusThunk = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0)
            dispatch(setStatusActionCreator(status))
    } catch (error) {
        alert(error.message)
    }

}

export const updatePhotoThunk = (photo: File) => async (dispatch: any) => {
    let response = await profileAPI.updatePhoto(photo)
    if (response.data.resultCode === 0)
        dispatch(setPhotoActionCreator(response.data.data.photos))
}

export type ProfileDataType = {
    fullName?: string
    aboutMe?: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    contacts?: {
        github?: string
        vk?: string
        facebook?: string
        instagram?: string
        twitter?: string
        website?: string
        youtube?: string
        mainLink?: string
    }

}

export const updateProfileThunk = (profileData: ProfileDataType) => async (dispatch: any, getState: () => StateType) => {
    const myID = getState().auth.id
    let response = await profileAPI.updateMyProfile(profileData)
    debugger
    if (response.data.resultCode === 0) {

        dispatch(getUserProfileThunk(myID))
    }
}

export default profileReducer;

