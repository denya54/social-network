import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPosts/MyPostContainer";
import {UserProfileType} from "../../redux/profile-reducer";

type ProfilePropsType = {
    profile: UserProfileType | null
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
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