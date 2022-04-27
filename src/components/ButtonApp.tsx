import React from 'react';
import classes from './ButtonApp.module.css';

type ButtonAppPropsType = {
    nameButton: string
    functionForClick: () => void
}

export const ButtonApp = (props: ButtonAppPropsType) => {
    return (
        <button className={classes.butt} onClick={props.functionForClick}>{props.nameButton}</button>
    )
}