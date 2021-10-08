import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from 'react-router-dom';
import {StoreType} from "./redux/redux-store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

// type stateProps = {
//     state: StoreType
// }

const App = (
    // props: stateProps
) => {
    // const state = props.state.getState()
    return (
        <BrowserRouter>
            <div className={'app-wraper'}>
                <Header/>
                <NavBar/>
                <div className={'app-wraper-content'}>
                    <Route path='/profile' render={() => <Profile
                        // store={props.state}
                    />}/>
                    <Route path='/dialogs' render={() => <DialogsContainer
                        // store={props.state}
                    />}/>
                    {/*<Route path='/news' component={News}/>*/}
                    {/*<Route path='/music' component={Music}/>*/}
                    {/*<Route path='/settings' component={Settings}/>*/}

                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
