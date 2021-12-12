import React from 'react';
import Field, {reduxForm} from "redux-form";

export const LoginForm = (props: any) => {
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

export const Login = (props: any) => {
const onSubmit = (formData) => {
    console.log(formData)
}
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>)
}

// обворачиваем LoginForm
const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)