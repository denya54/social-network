import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialPropsType} from "./DialogsContainer";
import {dialogsPageType} from "../../redux/dialog-reducer";
import {Redirect} from "react-router-dom";

type dialogsProps = {
    updateNewMessageBody: (body: string) => void
    sendMessage: (body: string) => void
    dialogsPage: dialogsPageType
    // dispatch: (action: ActionType) => void
    // store: StoreType
}

const Dialogs = (props: DialPropsType) => {
    let state = props.dialogsPage

    let dialogsElements = state.dialogNames.map(dN => <DialogItem name={dN.name} id={dN.id} ava={dN.ava} key={dN.id}/>)
    let messagesElements = state.dialogMessages.map(dM => <Message id={dM.id}
                                                                   message={dM.message}
                                                                   key={dM.id}
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

    if (!props.isAuth) return <Redirect to={'/login'}/>
        


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