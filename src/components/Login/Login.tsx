import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsConrols";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import { loginTC} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {StateType} from "../../redux/redux-store";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder={'Email'} component={Input} name={'email'} validate={[required]}/></div>
            <div><Field placeholder={'Password'} component={Input} name={'password'} type={'password'} validate={[required]} /></div>
            <div><Field type={'checkbox'} component={Input} name={'remember me'}/>remember me</div>
            <div>
                <button>Login</button>
            </div>
        </form>)
}

export const Login = (props: any) => {

const onSubmit = (formData: FormDataType) => {
    props.loginTC(formData.email, formData.password, formData.rememberMe)
    console.log(formData)
}
if(props.isAuth) {
    return <Redirect to={'/profile'}/>
}
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>)
}

// обворачиваем LoginForm
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

type MapStatePropsReturnType = {
     isAuth: boolean
}

const mapStateToProps = (state: StateType) : MapStatePropsReturnType => ({
    isAuth: state.auth.isAuth
})

type MapDispatchPropsReturnType = {
    loginTC:  (email: string, password: string, rememberMe: boolean) => void
}

type LoginPropsType = MapDispatchPropsReturnType & MapStatePropsReturnType

export default connect(mapStateToProps, {loginTC})(Login)