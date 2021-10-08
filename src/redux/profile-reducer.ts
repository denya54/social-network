import {ActionType} from "./store";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export type postType = {
    id?: number
    message: string
    likesCount: number
}

export type profilePageType = {
    posts: Array<postType>
    newPostText: string
}


let initialState = {
        newPostText: "",
        posts: [
            {id: 1, message: "My first GAV", likesCount: 12},
            {id: 2, message: "Don`t like Myay", likesCount: 10},
            {id: 3, message: "How do you do", likesCount: 16},
        ] as Array<postType>,
    };

const profileReducer = (state: profilePageType = initialState, action: ActionType) :profilePageType => {
    switch (action.type) {
        case "ADD-POST": {
            let newPost: postType = {
                id: 4,
                message: action.postMessage,
                likesCount: 0
            }
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = ''
            return stateCopy
        }
        case "UPDATE-NEW-POST-TEXT": {
            let stateCopy = {...state};

            stateCopy.newPostText = action.NewText
            return stateCopy
        }
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