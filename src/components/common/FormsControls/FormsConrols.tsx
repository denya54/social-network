import React from 'react';
import styles from './FormsConrols.module.css'

type InputProps = {
    name: string
    onBlur: () => void
    onChange: () => void
    onDragStart: () => void
    onDrop: () => void
    onFocus: () => void
    value: string
}
type MetaProps = {
    active: boolean
    asyncValidating: boolean
    autofilled: boolean
    dirty: boolean
    dispatch: () => void
    error: string
    form: string
    initial: any
    invalid: boolean
    pristine: boolean
    submitFailed: boolean
    submitting: boolean
    touched: boolean
    valid: boolean
    visited: boolean
    warning: any
}

type TextAreaPropsType = {
    input: InputProps
    meta: MetaProps
    placeholder: string
}

export const Textarea = ({input, meta, ...props}: TextAreaPropsType) => {
    const showError = meta.touched && meta.error
    return (
        <div className={styles.formControl}>
            <textarea {...input} {...props} className={showError ? styles.error : ''}/>
            <div>
                {showError && <span className={styles.errorSpan}>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Input = ({input, meta, ...props}: TextAreaPropsType) => {
    const showError = meta.touched && meta.error
    return (
        <div className={styles.formControl}>
            <input {...input} {...props} className={showError ? styles.error : ''}/>
            <div>
                {showError && <span className={styles.errorSpan}>{meta.error}</span>}
            </div>
        </div>
    )
}