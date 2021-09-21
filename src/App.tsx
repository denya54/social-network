import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from 'react-router-dom';
import {addPost, changeAreaText, changeDialogAreaText, stateType} from "./redux/state";



type stateProps = {
    state: stateType
    addPost: (postMessage: string) => void
}

const App = (props: stateProps) => {
    return (
        <BrowserRouter>
            <div className={'app-wraper'}>
                <Header/>
                <NavBar/>
                <div className={'app-wraper-content'}>
                    <Route path='/profile' render={() => <Profile stateProfile={props.state.profilePage}
                                                                  addPostCallback={addPost}
                                                                  changeAreaTextCallback={changeAreaText}
                    />} />
                    <Route path='/dialogs' render={() => <Dialogs state={props.state.dialogsPage}
                                                                  changeDialogAreaTextCallback={changeDialogAreaText} />}/>
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/settings' component={Settings}/>*/}

                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
