import {ActionType} from "./store";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

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
    newMessageBody: string
}


let initialState = {
    dialogNames: [
        {id: 1, name: "Sharik", ava: "https://wallpaperim.net/_data/i/upload/2014/09/18/20140918448607-c935d187-me.jpg"},
        {id: 2, name: "Archi", ava: "https://f.vividscreen.info/soft/ecbda7af9f74e75f084553dbfbcdccff/Nice-Dog-Muzzle-640x480.jpg"},
        {id: 3, name: "Betty", ava: "https://scouteu.s3.amazonaws.com/cards/images_vt/merged/i_feel_so_lonely_without_you_1.jpg"},
        {id: 4, name: "Tyzik", ava: "http://file.mobilmusic.ru/45/88/24/1369559-240.jpg"},
        {id: 5, name: "Baron", ava: "https://i.ytimg.com/vi/S1C608GfriM/hqdefault.jpg"},
    ] as Array<dialogNameType>,
    dialogMessages: [
        {id: 1, message: "Gav Gav"},
        {id: 2, message: "RRRR"},
        {id: 3, message: "Af Af"},
        {id: 4, message: "AYYYYYYyyyy"},
        {id: 5, message: "Tzyav"},
    ] as Array<dialogMessageType>,
    newMessageBody: ""
};

export const dialogReducer = (state: dialogsPageType = initialState, action: ActionType) :dialogsPageType => {
    let stateCopy
    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-BODY":
            return  {...state, newMessageBody: action.NewText}
        case "SEND_MESSAGE":
            let body = state.newMessageBody
            return  {...state,
                newMessageBody: '',
                dialogMessages: [...state.dialogMessages, {id: 6, message: body} ]}
        default: return state
    }
}
export type UpdateNewMessageBodyType = ReturnType<typeof updateNewMessageBodyCreator>
export type SendMessageType = ReturnType<typeof sendMessageCreator>

export const updateNewMessageBodyCreator = (messageText: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        NewText: messageText
    } as const
}

export const sendMessageCreator = (messageText: string) => ({type: SEND_MESSAGE, NewText: messageText} as const)

export default dialogReducer;
