import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialPropsType} from "./DialogsContainer";
import {dialogsPageType} from "../../redux/dialog-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type dialogsProps = {
    // updateNewMessageBody: (body: string) => void
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

    let addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsNames}>
                {dialogsElements}
            </div>
            <div className={classes.dialogsMessages}>
                <div>{messagesElements}</div>

                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

type MyMessageFormDataType = {
    newMessageBody: string
}

export const AddMessageForm: React.FC<InjectedFormProps<MyMessageFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'newMessageBody'} placeholder={'enter your message'}/>
                {/*<textarea value={newMessageBody} onChange={onNewMessageChange}*/}
                {/*          placeholder={'Write your message'}></textarea>*/}
            </div>
            <div>
                <button
                    // onClick={onSendMessageClick}
                >SEND
                </button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<MyMessageFormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;