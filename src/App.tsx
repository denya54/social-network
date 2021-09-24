import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from 'react-router-dom';
import { StoreType} from "./redux/state";

type stateProps = {
    state: StoreType
    // addPost: (postMessage: string) => void
}

const App = (props: stateProps) => {
    const state = props.state.getState()
    return (
        <BrowserRouter>
            <div className={'app-wraper'}>
                <Header/>
                <NavBar/>
                <div className={'app-wraper-content'}>
                    <Route path='/profile' render={() => <Profile stateProfile={state.profilePage}
                                                                  addPostCallback={props.state.addPost.bind(props.state)}
                                                                  changeAreaTextCallback={props.state.changeAreaText.bind(props.state)}
                    />} />
                    <Route path='/dialogs' render={() => <Dialogs state={state.dialogsPage}
                                                                  changeDialogAreaTextCallback={props.state.changeDialogAreaText} />}/>
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/settings' component={Settings}/>*/}

                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
