import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {getUserProfileThunk, postType, UserProfileType} from "../../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

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
        this.props.getUserProfileWithThunk(userId)
    }

    render() {

        // if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
            />
        )
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

let mapStateToProps = (state: StateType): MapStatePropsReturnType => ({
    profile: state.profilePage.profile,
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts,
})

type MapDispatchPropsReturnType = {
    // setUserProfile: (profile: UserProfileType) => void
    getUserProfileWithThunk: (userId: string) => void
}

type MapStatePropsReturnType = {
    posts: Array<postType>
    newPostText: string
    profile: UserProfileType | null
    // isAuth: boolean
}

export type ProfilePropsType = MapDispatchPropsReturnType & MapStatePropsReturnType

let WithURLDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, {
    // setUserProfile: setUserProfileAC,
    getUserProfileWithThunk: getUserProfileThunk
})(WithURLDataContainerComponent);