import React, {ChangeEvent} from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialog-reducer";
import {StoreType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";

type dialogsProps = {
    store: StoreType
}

const DialogsContainer = (props: dialogsProps) => {

    let state = props.store.getState().dialogsPage

    let onSendMessageClick = (body: string) => {
        props.store.dispatch(sendMessageCreator(body))
    }
    let onNewMessageChange = (body: string) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
        <Dialogs
            updateNewMessageBody={onNewMessageChange}
            sendMessage={onSendMessageClick}
            dialogsPage={state}
        />
    )
}

export default DialogsContainer;