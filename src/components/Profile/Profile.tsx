import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPosts/MyPostContainer";
import {UserProfileType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    profile: UserProfileType | null
    status: string
    updateStatus: (status: string) => void
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            {/*<MyPost statePosts={props.stateProfile.posts}*/}
            {/*        dispatch={props.dispatch}*/}
            {/*        newPostText={props.stateProfile.newPostText}*/}
            {/*/>*/}
            <MyPostContainer/>
        </div>
    )
}
export default Profile;