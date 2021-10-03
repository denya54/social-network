import {ActionType, postType, profilePageType} from "./store";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
        newPostText: "",
        posts: [
            {id: 1, message: "My first GAV", likesCount: 12},
            {id: 2, message: "Don`t like Myay", likesCount: 10},
            {id: 3, message: "How do you do", likesCount: 16},
        ],
    };

const profileReducer = (state: profilePageType = initialState, action: ActionType) => {
    switch (action.type) {
        case "ADD-POST":
            let newPost: postType = {
                id: 4,
                message: action.postMessage,
                likesCount: 0
            }
            state.posts.push(newPost);
            state.newPostText = ""
            return state
        case "UPDATE-NEW-POST-TEXT":
            state.newPostText = action.NewText
            return state
        default:
            return state
    }
}

export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type UpdateNewPostTextType = ReturnType<typeof updateNewPostTextActionCreator>

export const addPostActionCreator = (postText: string) => ({type: ADD_POST, postMessage: postText} as const)
export const updateNewPostTextActionCreator = (postText: string)  => {
    return {type: UPDATE_NEW_POST_TEXT, NewText: postText} as const
}
export default profileReducer;