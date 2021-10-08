import React, {ChangeEvent} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {ActionType, dialogsPageType} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialog-reducer";
import {StoreType} from "../../redux/redux-store";
import {DialPropsType} from "./DialogsContainer";

type dialogsProps = {
    updateNewMessageBody: (body: string)=> void
    sendMessage: (body: string) => void
    dialogsPage: dialogsPageType
    // dispatch: (action: ActionType) => void
    // store: StoreType
}

const Dialogs = (props: DialPropsType) => {
    let state = props.dialogsPage

    let dialogsElements = state.dialogNames.map(dN => <DialogItem name={dN.name} id={dN.id} ava={dN.ava}/>)
    let messagesElements = state.dialogMessages.map(dM => <Message id={dM.id}
                                                                         message={dM.message}
                                                                         // dispatch={props.dispatch}
    />)
    let onSendMessageClick = () => {
       // props.dispatch(sendMessageCreator(newMessageBody))
        props.sendMessage(newMessageBody)
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // props.dispatch(updateNewMessageBodyCreator(e.currentTarget.value))
        props.updateNewMessageBody(e.currentTarget.value)
    }
    let newMessageBody = state.newMessageBody
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsNames}>
                {dialogsElements}
            </div>
            <div className={classes.dialogsMessages}>
                <div>{messagesElements}</div>
                <div>
                    <textarea value={newMessageBody} onChange={onNewMessageChange}
                               placeholder={'Write your message'}></textarea></div>
                <div>
                    <button onClick={onSendMessageClick}>SEND</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;