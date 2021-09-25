import {ActionType, postType, profilePageType} from "./state";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const profileReducer = (state: profilePageType, action: ActionType) => {
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