import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPosts/MyPostContainer";
import {StoreType} from "../../redux/redux-store";

type profileProps = {
    store: StoreType
}

const Profile = (props: profileProps) => {
    return (
        <div>
            <ProfileInfo/>
            {/*<MyPost statePosts={props.stateProfile.posts}*/}
            {/*        dispatch={props.dispatch}*/}
            {/*        newPostText={props.stateProfile.newPostText}*/}
            {/*/>*/}

            <MyPostContainer store={props.store}/>
        </div>
    )
}
export default Profile;