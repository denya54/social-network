import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter, Route} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeAppTC} from "./redux/app-reducer";
import {StateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";


class App extends React.Component <AppPropsType>{
    componentDidMount() {
        this.props.initializeAppWithThunk()
    }

    render () {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className={'app-wraper'}>
                    <HeaderContainer/>
                    <NavBar/>
                    <div className={'app-wraper-content'}>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer
                        />}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <LoginContainer/>}/>
                        {/*<Route path='/news' component={News}/>*/}
                        {/*<Route path='/music' component={Music}/>*/}
                        {/*<Route path='/settings' component={Settings}/>*/}

                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state: StateType) : MapStateReturnType => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {
    initializeAppWithThunk: initializeAppTC,
})
(App)

type MapDispatchReturnType = { initializeAppWithThunk: () => void }

type MapStateReturnType = { initialized: boolean }

type AppPropsType = MapDispatchReturnType & MapStateReturnType