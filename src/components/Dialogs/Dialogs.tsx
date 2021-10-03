import React, {ChangeEvent} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {ActionType, dialogsPageType} from "../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialog-reducer";

type dialogsProps = {
    state: dialogsPageType
    dispatch: (action: ActionType) => void
}

const Dialogs = (props: dialogsProps) => {

    let dialogsElements = props.state.dialogNames.map(dN => <DialogItem name={dN.name} id={dN.id} ava={dN.ava}/>)
    let messagesElements = props.state.dialogMessages.map(dM => <Message id={dM.id}
                                                                         message={dM.message}
                                                                         dispatch={props.dispatch}
    />)
    let onSendMessageClick = () => {
        props.dispatch(sendMessageCreator(newMessageBody))
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewMessageBodyCreator(e.currentTarget.value))
    }
    let newMessageBody = props.state.newMessageBody
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