import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsConrols";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {StateType} from "../../redux/redux-store";
import styles from './Login.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    //captcha: string
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error,
                                                                         //captchaURL
} ) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Email'} component={Input} name={'email'} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} component={Input} name={'password'} type={'password'}
                       validate={[required]}/>
            </div>
            <div><Field type={'checkbox'} component={Input} name={'remember me'}/>remember me</div>

            {/*{captchaURL && <img src={captchaURL}/>}*/}
            {/*{captchaURL &&  <Field placeholder={'Symbols from Image'} component={Input} name={'captcha'} validate={[required]}/>}*/}

            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>)
}

type PropsType = {
    isAuth: boolean
    loginTC: (email: string, password: string, rememberMe: boolean) => void
    captchaURL: string | null
}

export const Login = (props: PropsType) => {

    const onSubmit = (formData: FormDataType) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}
                            //captchaURL={props.captchaURL}
            />
        </div>)
}

// обворачиваем LoginForm
const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

type MapStatePropsReturnType = {
    isAuth: boolean
    captchaURL: string | null
}

const mapStateToProps = (state: StateType): MapStatePropsReturnType => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captcha
})

type MapDispatchPropsReturnType = {
    loginTC: (email: string, password: string, rememberMe: boolean) => void
}

type LoginPropsType = MapDispatchPropsReturnType & MapStatePropsReturnType

// функциональная
const LoginContainer: React.FC<LoginPropsType> = ({isAuth, loginTC, captchaURL}) => {
    return (
        <Login isAuth={isAuth}
               loginTC={loginTC}
               captchaURL={captchaURL}
        />
    )
}

//классовая
// class LoginContainer extends React.Component <LoginPropsType> {
//     render() {
//         return (
//             <Login isAuth={this.props.isAuth}
//                    loginTC={this.props.loginTC}
//             />
//         )
//     }
//
// }

export default connect(mapStateToProps, {loginTC})(LoginContainer)