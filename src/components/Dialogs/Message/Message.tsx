import React from 'react';
import classes from './../Dialogs.module.css'


type messagePropsType = {
    id: number
    message: string
    // dispatch?: (action: ActionType) => void
}


const Message = (props: messagePropsType) => {

    return (
        <div className={classes.dialogMessage}>
            {props.message}

        </div>
        // <div>
        //     <textarea ref={sendMessage}></textarea>
        //     <button onClick={sendNewMessage}>send</button>
        // </div>
    )
}

export default Message;