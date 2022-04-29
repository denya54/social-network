import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter, HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {initializeAppTC} from "./redux/app-reducer";
import {StateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {LoginFormik} from "./components/Login/LoginFormik";
import { InProgress } from './components/InProgress/InProgress';

const DialogsWithoutContainer = React.lazy(() => import("./components/Dialogs/DialogsWithoutContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"))

class App extends React.Component <AppPropsType> {

    componentDidMount() {
        this.props.initializeAppWithThunk()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <HashRouter>
                <div className={'app-wraper'}>
                    <HeaderContainer/>
                    <NavBar/>
                    <div className={'app-wraper-content'}>
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to={'profile'}/>}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/dialogs' render={() => <DialogsWithoutContainer
                            />}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <LoginFormik/>}/>
                            <Route path='/news' render={() => <InProgress/>}/>
                            <Route path='/music' render={() => <InProgress/>}/>
                            <Route path='/settings' render={() => <InProgress/>}/>
                            <Route path='*' render={() => <div>404 - Page not found</div>}/>


                        </Switch>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

const mapStateToProps = (state: StateType): MapStateReturnType => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {
    initializeAppWithThunk: initializeAppTC,
})
(App)

type MapDispatchReturnType = { initializeAppWithThunk: () => void }

type MapStateReturnType = { initialized: boolean }

type AppPropsType = MapDispatchReturnType & MapStateReturnType