import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './../Dialogs.module.css'
import {dialogNameType} from "../../../redux/dialog-reducer";




const DialogItem = (props: dialogNameType) => {
    return (
        <div className={`${classes.dialogName} ${classes.active}`}>
            <img src={props.ava}/>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;