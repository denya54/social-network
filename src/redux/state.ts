export type StoreType = {
    _state: stateType
    addPost: (postMessage: string) => void
    changeAreaText: (NewText: string) => void
    _callSubscriber: (state: stateType) => void
    subscribe: (observer: (state: stateType) => void) => void
    getState: () => stateType
    changeDialogAreaText: (NewText: string) => void
}
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
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('hello')
    },
    addPost(postMessage: string) {
        let newPost: postType = {
            id: 4,
            message: postMessage,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = ""
        this._callSubscriber(this._state)
    },
    changeAreaText(NewText: string) {
        this._state.profilePage.newPostText = NewText
        this._callSubscriber(this._state)
    },
    subscribe(observer: (state: stateType) => void) {
        this._callSubscriber = observer
    },
    changeDialogAreaText(NewText: string) {
        this._state.dialogsPage.dialogArea = NewText
        this._callSubscriber(this._state)
    }
}

// let renderEntireTree = (state: stateType) => {
//     console.log('hello')
// }
// export const subscribe = (observer: (state: stateType) => void) => {
//     renderEntireTree = observer
// }

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

// let state: stateType = {
//     profilePage: {
//         newPostText: "",
//         posts: [
//             {id: 1, message: "My first GAV", likesCount: 12},
//             {id: 2, message: "Don`t like Myay", likesCount: 10},
//             {id: 3, message: "How do you do", likesCount: 16},
//         ],
//     },
//     dialogsPage: {
//         dialogNames: [
//             {
//                 id: 1,
//                 name: "Sharik",
//                 ava: "https://wallpaperim.net/_data/i/upload/2014/09/18/20140918448607-c935d187-me.jpg"
//             },
//             {
//                 id: 2,
//                 name: "Archi",
//                 ava: "https://f.vividscreen.info/soft/ecbda7af9f74e75f084553dbfbcdccff/Nice-Dog-Muzzle-640x480.jpg"
//             },
//             {
//                 id: 3,
//                 name: "Betty",
//                 ava: "https://scouteu.s3.amazonaws.com/cards/images_vt/merged/i_feel_so_lonely_without_you_1.jpg"
//             },
//             {id: 4, name: "Tyzik", ava: "http://file.mobilmusic.ru/45/88/24/1369559-240.jpg"},
//             {id: 5, name: "Baron", ava: "https://i.ytimg.com/vi/S1C608GfriM/hqdefault.jpg"},
//         ],
//         dialogMessages: [
//             {id: 1, message: "Gav Gav"},
//             {id: 2, message: "RRRR"},
//             {id: 3, message: "Af Af"},
//             {id: 4, message: "AY"},
//             {id: 5, message: "Tzyav"},
//         ],
//         dialogArea: ""
//     }
// }

// export const addPost = (postMessage: string) => {
//     let newPost: postType = {
//         id: 4,
//         message: postMessage,
//         likesCount: 0
//     }
//     state.profilePage.posts.push(newPost);
//     state.profilePage.newPostText = ""
//     renderEntireTree(state)
// }

// export const changeAreaText = (NewText: string) => {
//     state.profilePage.newPostText = NewText
//     renderEntireTree(state)
// }


// export const changeDialogAreaText = (NewText: string) => {
//     state.dialogsPage.dialogArea = NewText
//     renderEntireTree(state)
// }

export default store;

