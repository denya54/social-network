import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostContainer from "./MyPosts/MyPostContainer";




const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            {/*<MyPost statePosts={props.stateProfile.posts}*/}
            {/*        dispatch={props.dispatch}*/}
            {/*        newPostText={props.stateProfile.newPostText}*/}
            {/*/>*/}

            <MyPostContainer/>
        </div>
    )
}
export default Profile;