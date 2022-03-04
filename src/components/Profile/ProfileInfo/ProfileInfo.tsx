import React, {ChangeEvent} from 'react';
import classes from './ProfileInfo.module.css';
import {UserProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import mainPhoto from "../../../assets/images/nophotoava.png";

type ProfileInfoPropsType = {
    profile: UserProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={classes.descriptionBlock}>
                {props.profile.photos.large ? <img className={classes.picture} src={props.profile.photos.large}/> :
                    <img src={mainPhoto} className={classes.picture}/>}

                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
                {props.isOwner && <div>Для загрузки нового аватара <input type={'file'} onChange={onMainPhotoSelected}/></div>}
            </div>
        </div>
    )
}
export default ProfileInfo;