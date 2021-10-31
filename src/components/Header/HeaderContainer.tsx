import React from 'react';
import Header from "./Header";
import axios, {AxiosResponse} from "axios";
import {connect} from "react-redux";
import {AuthType, setAuthUserData} from "../../redux/auth-reducer";
import {StateType} from "../../redux/redux-store";


class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        // this.props.toggleIsFetching(true)
        axios.get<void, AxiosResponse<{ data: AuthType, resultCode: number }>>(`https://social-network.samuraijs.com/api/1.0/auth/me`,
            {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    // деструктуризация
                    let {id, email, login } = response.data.data

                    this.props.setAuthUserData(id, email, login)
                }
            })
    }

    render() {
    return (
        <Header
            {...this.props}/>
    )
}
}
const mapStateToProps = (state: StateType) : MapStatePropsReturnType=> ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
type MapStatePropsReturnType = {
    isAuth: boolean,
    login: string | null
}


type MapDispatchReturnType = {
    setAuthUserData: (userID: number | null, email: string | null, login: string | null) => void
}

export type HeaderPropsType = MapDispatchReturnType & MapStatePropsReturnType

export default connect (mapStateToProps, {setAuthUserData})(HeaderContainer)