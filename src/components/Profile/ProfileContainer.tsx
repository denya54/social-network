import React from 'react';
import Profile from "./Profile";
import axios, {AxiosResponse} from "axios";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {postType, setUserProfileAC, UserProfileType} from "../../redux/profile-reducer";


class ProfileContainer extends React.Component <ProfilePropsType>{

    componentDidMount() {
        axios.get<void, AxiosResponse<UserProfileType>>(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                debugger
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
            />
        )
    }
}

let mapStateToProps = (state: StateType) : MapStatePropsReturnType => ({
    profile: state.profilePage.profile,
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts
})

type MapDispatchReturnType = {
    setUserProfile: (profile: UserProfileType) => void
}

type MapStatePropsReturnType = {
    posts: Array<postType>
    newPostText: string
    profile: UserProfileType | null
}

export type ProfilePropsType = MapDispatchReturnType & MapStatePropsReturnType

export default connect(mapStateToProps, {
    setUserProfile: setUserProfileAC
})(ProfileContainer);