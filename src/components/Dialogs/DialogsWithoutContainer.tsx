import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {dialogsPageType, sendMessageCreator} from '../../redux/dialog-reducer';
import {StateType} from '../../redux/redux-store';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import classes from './Dialogs.module.css'
import {maxLengthCreator} from "../../utils/validators";
import {useFormik} from 'formik';

const DialogsWithoutContainer = () => {

    let state = useSelector<StateType, dialogsPageType>(st => st.dialogsPage)

    let dialogsElements = state.dialogNames.map(dN => <DialogItem name={dN.name} id={dN.id} ava={dN.ava} key={dN.id}/>)
    let messagesElements = state.dialogMessages.map(dM => <Message id={dM.id}
                                                                   message={dM.message}
                                                                   key={dM.id}
    />)

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsNames}>
                {dialogsElements}
            </div>
            <div className={classes.dialogsMessages}>
                <div>{messagesElements}</div>
                <AddMessageFormik/>

            </div>
            this page must be do
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
                className={classes.textarea}
                name={'newMessageBody'}
                onChange={formik.handleChange}
                value={formik.values.newMessageBody}
            />
            <button className={classes.button}>Send Message</button>
        </form>
    )
}

export default DialogsWithoutContainer;