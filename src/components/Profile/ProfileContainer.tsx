import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {
    getStatusThunk,
    getUserProfileThunk,
    postType, updateStatusThunk,
    UserProfileType
} from "../../redux/profile-reducer";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType


class ProfileContainer extends React.Component <PropsType> {

    componentDidMount() {

        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '20162'
        }
        this.props.getUserProfileWithThunk(userId);
        this.props.getStatusWithThunk(userId)
    }

    render() {

        // if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatusWithThunk}
            />
        )
    }
}

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

let mapStateToProps = (state: StateType): MapStatePropsReturnType => ({
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    status: state.profilePage.status,
    authorisedUserID: state.auth.id,
    isAuth: state.auth.isAuth

})

type MapStatePropsReturnType = {
    posts: Array<postType>
    profile: UserProfileType | null
    status: string
    authorisedUserID: string | null
    isAuth: boolean
}

type MapDispatchPropsReturnType = {
    // setUserProfile: (profile: UserProfileType) => void
    getUserProfileWithThunk: (userId: string) => void
    getStatusWithThunk: (userId: string) => void
    updateStatusWithThunk: (status: string) => void
}


export type ProfilePropsType = MapDispatchPropsReturnType & MapStatePropsReturnType

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfileWithThunk: getUserProfileThunk,
        getStatusWithThunk: getStatusThunk,
        updateStatusWithThunk: updateStatusThunk
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)