import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {loginTC} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import React from "react";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LoginFormik = () => {

    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values.email, values.password, values.rememberMe))
        },
        validate: values => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Field Email is required'
            } else {
                return errors
            }
            if (!values.password) {
                errors.password = 'Field Password is required'
            }
            return errors
        }
    })

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input name={'email'}
                       onChange={formik.handleChange}
                       value={formik.values.email}
                       onBlur={formik.handleBlur}/>

                {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
            </div>
            <div>
                <input type={'password'}
                       name={'password'}
                       onChange={formik.handleChange}
                       value={formik.values.password}
                       onBlur={formik.handleBlur}/>
                {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
            </div>
            <div> Remember Me
                <input type={'checkbox'}
                       name={'rememberMe'}
                       onChange={formik.handleChange}
                       checked={formik.values.rememberMe}
                />
            </div>
            <button>Login</button>
        </form>
        </div>
    )

}