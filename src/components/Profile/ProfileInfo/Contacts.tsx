import React from "react";
import classes from './Contacts.module.css';

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

export const Contacts = (props: ContactsPropsType) => {
    return (
        <div className={classes.contacts}>
            {props.contactTitle}: {props.contactValue}
        </div>
    )
}