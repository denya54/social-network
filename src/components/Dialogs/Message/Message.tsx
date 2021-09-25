import React, {ChangeEvent} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './../Dialogs.module.css'
import {ActionType, changeAreaMessageCreator, dialogMessageType} from "../../../redux/state";

type messagePropsType = {
    id: number
    message: string
    areaMessage: string
    dispatch: (action: ActionType) => void
}


const Message = (props: messagePropsType) => {
    let sendMessage = React.createRef<HTMLTextAreaElement>()

    let sendNewMessage = () => {
        alert(sendMessage.current?.value)
    }
    let changeAreaMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(changeAreaMessageCreator(e.currentTarget.value))
    }
    return (
        <div className={classes.dialogMessage}>
            {props.message}
            <textarea value={props.areaMessage}
                      onChange={changeAreaMessage}
            />
        </div>
        // <div>
        //     <textarea ref={sendMessage}></textarea>
        //     <button onClick={sendNewMessage}>send</button>
        // </div>
    )
}

export default Message;