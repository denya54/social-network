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
    newPostText: state.profilePage.newPostText,
    posts: state.profilePage.posts,
    status: state.profilePage.status
})

type MapDispatchPropsReturnType = {
    // setUserProfile: (profile: UserProfileType) => void
    getUserProfileWithThunk: (userId: string) => void
    getStatusWithThunk: (userId: string) => void
    updateStatusWithThunk: (status: string) => void
}

type MapStatePropsReturnType = {
    posts: Array<postType>
    newPostText: string
    profile: UserProfileType | null
    status: string
    // isAuth: boolean
}

export type ProfilePropsType = MapDispatchPropsReturnType & MapStatePropsReturnType

// let WithURLDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, {
//     // setUserProfile: setUserProfileAC,
//     getUserProfileWithThunk: getUserProfileThunk
// })(WithURLDataContainerComponent);

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfileWithThunk: getUserProfileThunk,
        getStatusWithThunk: getStatusThunk,
        updateStatusWithThunk: updateStatusThunk
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)