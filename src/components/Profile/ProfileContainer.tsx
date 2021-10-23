import React from 'react';
import Profile from "./Profile";
import axios, {AxiosResponse} from "axios";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {postType, setUserProfileAC, UserProfileType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType


class ProfileContainer extends React.Component <PropsType> {

    componentDidMount() {

        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        axios.get<void, AxiosResponse<UserProfileType>>(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
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

let mapStateToProps = (state: StateType): MapStatePropsReturnType => ({
    profile: state.profilePage.profile,
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts
})

type MapDispatchPropsReturnType = {
    setUserProfile: (profile: UserProfileType) => void
}

type MapStatePropsReturnType = {
    posts: Array<postType>
    newPostText: string
    profile: UserProfileType | null
}

export type ProfilePropsType = MapDispatchPropsReturnType & MapStatePropsReturnType

let WithURLDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    setUserProfile: setUserProfileAC
})(WithURLDataContainerComponent);