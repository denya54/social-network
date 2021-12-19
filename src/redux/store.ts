import profileReducer, {
    AddPostActionType, SetStatusReturnType,
    SetUserProfileReturnType,
    UserProfileType
} from "./profile-reducer";
import dialogReducer, {SendMessageType} from "./dialog-reducer";


type StoreType = {
    _state: stateType
    _callSubscriber: (state: stateType) => void
    getState: () => stateType
    subscribe: (observer: (state: stateType) => void) => void
    dispatch: (action: ActionType) => void
    addPost?: (postMessage: string) => void
    changeAreaText?: (NewText: string) => void
    changeDialogAreaText?: (NewText: string) => void

}
export type ActionType = AddPostActionType |
    SendMessageType | SetUserProfileReturnType | SetStatusReturnType

let store: StoreType = {
    _state: {
        profilePage: {
            // newPostText: "",
            posts: [
                {id: 1, message: "My first GAV", likesCount: 12},
                {id: 2, message: "Don`t like Myay", likesCount: 10},
                {id: 3, message: "How do you do", likesCount: 16},
            ],
            profile: null,
            status: ''
        },
        dialogsPage: {
            dialogNames: [
                {id: 1, name: "Sharik", ava: "https://wallpaperim.net/_data/i/upload/2014/09/18/20140918448607-c935d187-me.jpg"},
                {id: 2, name: "Archi", ava: "https://f.vividscreen.info/soft/ecbda7af9f74e75f084553dbfbcdccff/Nice-Dog-Muzzle-640x480.jpg"},
                {id: 3, name: "Betty", ava: "https://scouteu.s3.amazonaws.com/cards/images_vt/merged/i_feel_so_lonely_without_you_1.jpg"},
                {id: 4, name: "Tyzik", ava: "http://file.mobilmusic.ru/45/88/24/1369559-240.jpg"},
                {id: 5, name: "Baron", ava: "https://i.ytimg.com/vi/S1C608GfriM/hqdefault.jpg"},
            ],
            dialogMessages: [
                {id: 1, message: "Gav Gav"},
                {id: 2, message: "RRRR"},
                {id: 3, message: "Af Af"},
                {id: 4, message: "AYYYYYYyyyy"},
                {id: 5, message: "Tzyav"},
            ],
            // newMessageBody: ""
        }
        // sidebar: {}
    },
    _callSubscriber() {
        console.log('hello')
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action)
        // this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state)
    },
    subscribe(observer: (state: stateType) => void) {
        this._callSubscriber = observer
    },
}


type postType = {
    id?: number
    message: string
    likesCount: number
}

type profilePageType = {
    posts: Array<postType>
    // newPostText: string
    profile: UserProfileType | null
    status: string
}

type dialogNameType = {
    id: number
    name: string
    ava: string
}

type dialogMessageType = {
    id: number
    message: string
}

type dialogsPageType = {
    dialogNames: Array<dialogNameType>
    dialogMessages: Array<dialogMessageType>
    // newMessageBody: string
}

type stateType = {
    profilePage: profilePageType
    dialogsPage: dialogsPageType
    // sidebar: object
}


export default store;

