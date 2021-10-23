import React from 'react';
import classes from './ProfileInfo.module.css';
import {UserProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";

type ProfileInfoPropsType = {
    profile: UserProfileType | null
}

const ProfileInfo = (
    props: ProfileInfoPropsType
) => {

    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img className={classes.picture} src={'https://picfiles.alphacoders.com/280/thumb-1920-280763.jpg'}/>
            </div>
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                avatar + description
            </div>
        </div>
    )
}
export default ProfileInfo;