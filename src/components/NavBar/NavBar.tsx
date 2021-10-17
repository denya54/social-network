import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';

const NavBar = () => {
    return (
        <nav className={classes.nav}>
            <div className={classes.item}><NavLink to="/profile" activeClassName={classes.activeLink}>ProfileD</NavLink></div>
            <div className={classes.item}><NavLink to="/dialogs" activeClassName={classes.activeLink}>MessagesD</NavLink></div>
            <div className={classes.item}><NavLink to="/users" activeClassName={classes.activeLink}>UsersD</NavLink></div>
            <div className={classes.item}><NavLink to="/news" activeClassName={classes.activeLink}>NewsD</NavLink></div>
            <div className={`${classes.item} ${classes.active}`}><NavLink to="/music" activeClassName={classes.activeLink}>MusicD</NavLink></div>
            <div className={classes.item}><NavLink to="settings" activeClassName={classes.activeLink}>SettingsD</NavLink></div>
        </nav>
    )
}
export default NavBar;