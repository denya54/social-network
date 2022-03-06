import React, {ChangeEvent, useState} from "react";
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

export const ContactsEditForm = (props: ContactsPropsType) => {

    let [inputValue, setInputValue] = useState(props.contactValue)
    let changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (

        <div className={classes.contacts}>
            {props.contactTitle}: <input value={inputValue} onChange={changeInput}/>
        </div>
    )
}