import {ActionType, dialogsPageType} from "./state";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

export const dialogReducer = (state: dialogsPageType, action: ActionType) => {
    switch (action.type) {
        case "UPDATE-NEW-MESSAGE-BODY":

        state.newMessageBody = action.NewText
            return state
        case "SEND_MESSAGE":
        let body = state.newMessageBody
        state.newMessageBody = ""
        state.dialogMessages.push({id: 6, message: body},)
            return state
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
