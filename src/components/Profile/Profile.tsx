import React from 'react';
import classes from './Profile.module.css';
import MyPost from "./MyPosts/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionType, profilePageType} from '../../redux/store';

type profileProps = {
    stateProfile: profilePageType
    dispatch: (action: ActionType) => void
}

const Profile = (props: profileProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPost statePosts={props.stateProfile.posts}
                    dispatch={props.dispatch}
                    newPostText={props.stateProfile.newPostText}

            />
        </div>
    )
}
export default Profile;