import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import { logoutTC} from "../../redux/auth-reducer";
import {StateType} from "../../redux/redux-store";


class HeaderContainer extends React.Component<HeaderPropsType> {
    // componentDidMount() {
    //     this.props.getAuthUserDataWithThunk()
    // }

    render() {
        return (
            <Header
                {...this.props}/>
        )
    }
}

const mapStateToProps = (state: StateType): MapStatePropsReturnType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
type MapStatePropsReturnType = {
    isAuth: boolean,
    login: string | null
}

type MapDispatchReturnType = {
    // setAuthUserData: (userID: number | null, email: string | null, login: string | null) => void
    // getAuthUserDataWithThunk: () => void
    logoutTC: () => void
}

export type HeaderPropsType = MapDispatchReturnType & MapStatePropsReturnType

export default connect(mapStateToProps, {
    // setAuthUserData,
    // getAuthUserDataWithThunk: getAuthUserDataThunk,
    logoutTC
})(HeaderContainer)