import React from 'react';
import {NavLink} from 'react-router-dom';
import { ButtonApp } from '../ButtonApp';
import classes from './Header.module.css';
import {HeaderPropsType} from "./HeaderContainer";


const Header = (props: HeaderPropsType) => {
    return (
        <header className={classes.header}>
            <img src={'https://cdn6.f-cdn.com/contestentries/189230/14797445/55214b4cc2224_thumb900.jpg'}/>

            <div className={classes.loginBlock}>
                {
                    props.isAuth
                        ? <div>Your NickName: {props.login} <p><ButtonApp nameButton={'LogOut'} functionForClick={props.logoutTC}/></p> </div>
                        : <NavLink to={'/login'}>LogIN</NavLink>
                }
            </div>
        </header>
    )
}
export default Header