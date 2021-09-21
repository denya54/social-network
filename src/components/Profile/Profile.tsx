import React from 'react';
import classes from './Profile.module.css';
import MyPost from "./MyPosts/MyPost";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { profilePageType } from '../../redux/state';

type profileProps = {
    stateProfile: profilePageType
    addPostCallback: (postMessage: string)=> void
    changeAreaTextCallback: (NewText: string)=> void
}

const Profile = (props: profileProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPost statePosts={props.stateProfile.posts}
                    newPostText={props.stateProfile.newPostText}
                    addPostCallback={props.addPostCallback}
                    changeAreaTextCallback={props.changeAreaTextCallback}
            />
        </div>
    )
}
export default Profile;