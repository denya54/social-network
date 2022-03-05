import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {
    getStatusThunk,
    getUserProfileThunk,
    postType, ProfileDataType, updatePhotoThunk, updateProfileThunk, updateStatusThunk,
    UserProfileType
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType


class ProfileContainer extends React.Component <PropsType> {

    refreshProfile(){
        let userId = this.props.match.params.userId
        if (!userId) {
            userId =  this.props.authorisedUserID
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfileWithThunk(userId);
        this.props.getStatusWithThunk(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId ) {
            this.refreshProfile()
        }
    }


    render() {
        // if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return (
            <Profile
                {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatusWithThunk}
                setPhoto={this.props.updatePhotoWithThunk}
                setProfileData={this.props.updateProfileWithThunk}
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
    authorisedUserID: string
    isAuth: boolean
}

type MapDispatchPropsReturnType = {
    // setUserProfile: (profile: UserProfileType) => void
    getUserProfileWithThunk: (userId: string ) => void
    getStatusWithThunk: (userId: string)  => void
    updateStatusWithThunk: (status: string) => void
    updatePhotoWithThunk: (photo: File) => void
    updateProfileWithThunk: (profileData: ProfileDataType) => void
}


export type ProfilePropsType = MapDispatchPropsReturnType & MapStatePropsReturnType

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfileWithThunk: getUserProfileThunk,
        getStatusWithThunk: getStatusThunk,
        updateStatusWithThunk: updateStatusThunk,
        updatePhotoWithThunk: updatePhotoThunk,
        updateProfileWithThunk: updateProfileThunk
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)