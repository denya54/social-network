import React, {ChangeEvent} from 'react';
import {dialogsPageType, sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialog-reducer";
import {StateType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";

// type dialogsProps = {
//     store: StoreType
// }
// const DialogsContainer = (props: dialogsProps) => {
//
//     let state = props.store.getState().dialogsPage
//
//     let onSendMessageClick = (body: string) => {
//         props.store.dispatch(sendMessageCreator(body))
//     }
//     let onNewMessageChange = (body: string) => {
//         props.store.dispatch(updateNewMessageBodyCreator(body))
//     }
//
//     return (
//         <Dialogs
//             updateNewMessageBody={onNewMessageChange}
//             sendMessage={onSendMessageClick}
//             dialogsPage={state}
//         />
//     )
// }
type MapStatePropsReturnType = { dialogsPage: dialogsPageType }

let mapStateToProps = (state: StateType): MapStatePropsReturnType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

type MapDispatchReturnType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: (body: string) => void
}

let mapDispatchToProps = (dispatch: Dispatch) : MapDispatchReturnType => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
        sendMessage: (body: string) => {
            dispatch(sendMessageCreator(body))
        }
    }
}

export type DialPropsType = MapStatePropsReturnType & MapDispatchReturnType

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;