import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {ActionType, dialogsPageType} from "../../redux/state";

type dialogsProps = {
    state: dialogsPageType
    dispatch: (action: ActionType) => void
}

const Dialogs = (props: dialogsProps) => {

    let dialogsElements = props.state.dialogNames.map(dN => <DialogItem name={dN.name} id={dN.id} ava={dN.ava}/>)
    let messagesElements = props.state.dialogMessages.map(dM => <Message id={dM.id}
                                                                         message={dM.message}
                                                                         areaMessage={props.state.dialogArea}
                                                                         dispatch={props.dispatch}
    />)


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsNames}>
                {dialogsElements}
            </div>
            <div className={classes.dialogsMessages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;