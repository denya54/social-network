import React, {ChangeEvent, useState} from 'react';
import classes from './ProfileInfo.module.css';
import {ProfileDataType, UserProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import mainPhoto from "../../../assets/images/nophotoava.png";
import {Contacts} from "./Contacts";
import {ProfileDescriptionEditForm} from "./ProfileDescriptionEditForm";
import { ButtonApp } from '../../ButtonApp';

type ProfileInfoPropsType = {
    profile: UserProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
    setProfileData: (profileData: ProfileDataType) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

    const [editMode, setEditMode] = useState(false)

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
                {props.isOwner &&
                <div>Для загрузки нового аватара <input type={'file'} onChange={onMainPhotoSelected}/></div>}
            </div>
            {editMode
                ? <ProfileDescriptionEditForm profile={props.profile}
                                                    changeEditMode={() => setEditMode(false)}
                                                    setProfileData={props.setProfileData}/>
                : <ProfileDescription profile={props.profile}
                                      isOwner={props.isOwner}
                                      changeEditMode={() => setEditMode(true)}/>}
        </div>
    )
}
export default ProfileInfo;


export const ProfileDescription = (props: { profile: UserProfileType, isOwner: boolean, changeEditMode: () => void }) => {
    // @ts-ignore
    return (
        <div>
            <div>
                <p>My name {props.profile.fullName}</p>
                <p>About me: {props.profile.aboutMe}</p>
            </div>

            <div>
                <p>Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}</p>
                <p>My professional skills: {props.profile.lookingForAJobDescription}</p>
            </div>
            <div>
                {props.profile.contacts && <p>Contacts: {Object.keys(props.profile.contacts).map((key) => {
                    // @ts-ignore
                    return <Contacts key={key} contactTitle={key} contactValue={props.profile?.contacts[key]}/>
                })}</p>}
            </div>
            {props.isOwner && <ButtonApp nameButton={'Change Profile Info'} functionForClick={props.changeEditMode}/>
            // <button onClick={props.changeEditMode}>Change Profile Info</button>
            }
        </div>
    )
}

