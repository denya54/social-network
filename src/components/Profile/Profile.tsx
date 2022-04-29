import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileDataType, UserProfileType} from "../../redux/profile-reducer";
import MyPostWithoutContainer from './MyPosts/MyPostWithoutContainer';

type ProfilePropsType = {
    profile: UserProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    setPhoto: (photo: File) => void
    setProfileData: (profileData: ProfileDataType) => void
}

const Profile = (props: ProfilePropsType) => {
    // myID=20162
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                isOwner={props.isOwner}
                savePhoto={props.setPhoto}
                setProfileData={props.setProfileData}
            />
            {/*<MyPost statePosts={props.stateProfile.posts}*/}
            {/*        dispatch={props.dispatch}*/}
            {/*        newPostText={props.stateProfile.newPostText}*/}
            {/*/>*/}
            <MyPostWithoutContainer/>
        </div>
    )
}
export default Profile;