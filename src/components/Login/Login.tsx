import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    debugger
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder={'Login'} component={'input'} name={'login'}/></div>
            <div><Field placeholder={'Password'} component={'input'} name={'password'}/></div>
            <div><Field type={'checkbox'} component={'input'} name={'remember me'}/>remember me</div>
            <div>
                <button>Login</button>
            </div>
        </form>)
}

export const Login = () => {

const onSubmit = (formData: FormDataType) => {
    console.log(formData)
}
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>)
}

// обворачиваем LoginForm
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)