import React from "react";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT ='UPDATE-NEW-POST-TEXT'
const UPDATE_DIALOG_AREA_TEXT = 'UPDATE-DIALOG-AREA-TEXT'

export type StoreType = {
    _state: stateType
    _callSubscriber: (state: stateType) => void
    getState: () => stateType
    subscribe: (observer: (state: stateType) => void) => void
    dispatch: (action: ActionType) => void
    addPost?: (postMessage: string) => void
    changeAreaText?: (NewText: string) => void
    changeDialogAreaText?: (NewText: string) => void

}
export type ActionType = AddPostActionType | UpdateNewPostTextType | UpdateDialogAreaTextType

// type AddPostActionType = {
//     type: 'ADD-POST'
//     postMessage: string
// }

// type UpdateNewPostTextType = {
//     type: 'UPDATE-NEW-POST-TEXT'
//     NewText: string
// }


let store: StoreType = {
    _state: {
        profilePage: {
            newPostText: "",
            posts: [
                {id: 1, message: "My first GAV", likesCount: 12},
                {id: 2, message: "Don`t like Myay", likesCount: 10},
                {id: 3, message: "How do you do", likesCount: 16},
            ],
        },
        dialogsPage: {
            dialogNames: [
                {
                    id: 1,
                    name: "Sharik",
                    ava: "https://wallpaperim.net/_data/i/upload/2014/09/18/20140918448607-c935d187-me.jpg"
                },
                {
                    id: 2,
                    name: "Archi",
                    ava: "https://f.vividscreen.info/soft/ecbda7af9f74e75f084553dbfbcdccff/Nice-Dog-Muzzle-640x480.jpg"
                },
                {
                    id: 3,
                    name: "Betty",
                    ava: "https://scouteu.s3.amazonaws.com/cards/images_vt/merged/i_feel_so_lonely_without_you_1.jpg"
                },
                {id: 4, name: "Tyzik", ava: "http://file.mobilmusic.ru/45/88/24/1369559-240.jpg"},
                {id: 5, name: "Baron", ava: "https://i.ytimg.com/vi/S1C608GfriM/hqdefault.jpg"},
            ],
            dialogMessages: [
                {id: 1, message: "Gav Gav"},
                {id: 2, message: "RRRR"},
                {id: 3, message: "Af Af"},
                {id: 4, message: "AY"},
                {id: 5, message: "Tzyav"},
            ],
            dialogArea: ""
        }
    },
    _callSubscriber() {
        console.log('hello')
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        if (action.type === ADD_POST) {
            let newPost: postType = {
                id: 4,
                message: action.postMessage,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = ""
            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.NewText
            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_DIALOG_AREA_TEXT) {
            this._state.dialogsPage.dialogArea = action.NewText
            this._callSubscriber(this._state)
        }
    },
    subscribe(observer: (state: stateType) => void) {
        this._callSubscriber = observer
    },
}
type AddPostActionType = ReturnType<typeof addPostActionCreator>
type UpdateNewPostTextType = ReturnType<typeof updateNewPostTextActionCreator>

export const addPostActionCreator = (postText: string) => ({type: ADD_POST, postMessage: postText} as const)
export const updateNewPostTextActionCreator = (postText: string)  => {
    return {type: UPDATE_NEW_POST_TEXT, NewText: postText} as const
}

type UpdateDialogAreaTextType = ReturnType<typeof changeAreaMessageCreator>
export const changeAreaMessageCreator = (messageText: string) => {
    return {
        type: UPDATE_DIALOG_AREA_TEXT,
        NewText: messageText
    } as const
}

export type postType = {
    id?: number
    message: string
    likesCount: number
}

export type profilePageType = {
    posts: Array<postType>
    newPostText: string
}

export type dialogNameType = {
    id: number
    name: string
    ava: string
}

export type dialogMessageType = {
    id: number
    message: string
}

export type dialogsPageType = {
    dialogNames: Array<dialogNameType>
    dialogMessages: Array<dialogMessageType>
    dialogArea: string
}

export type stateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
}


export default store;

