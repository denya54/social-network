import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialPropsType} from "./DialogsContainer";
import {dialogsPageType, sendMessageCreator} from "../../redux/dialog-reducer";
import {Textarea} from "../common/FormsControls/FormsConrols";
import {maxLengthCreator, required} from "../../utils/validators";
import {useFormik} from 'formik';
import { useDispatch } from 'react-redux';

type dialogsProps = {
    sendMessage: (body: string) => void
    dialogsPage: dialogsPageType
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
                <AddMessageFormik/>

            </div>
        </div>
    )
}

type MyMessageFormDataType = {
    newMessageBody: string
}

let maxLength50 = maxLengthCreator(50)

export const AddMessageFormik = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            newMessageBody: ''
        },
        onSubmit: values => {
            dispatch(sendMessageCreator(values.newMessageBody))
            formik.resetForm()
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <textarea
                name={'newMessageBody'}
                onChange={formik.handleChange}
                value={formik.values.newMessageBody}
            />
            <button>Send Message</button>
        </form>
    )
}

export default Dialogs;