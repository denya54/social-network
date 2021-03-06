import {ProfileDataType, UserProfileType} from "../../../redux/profile-reducer";
import {Contacts, ContactsEditForm} from "./Contacts";
import React, {ChangeEvent, useState} from "react";

type ProfileEditPropsType = {
    profile: UserProfileType,
    changeEditMode: () => void,
    setProfileData: (profileData: ProfileDataType) => void
}

export const ProfileDescriptionEditForm = (props: ProfileEditPropsType) => {

    let [nameField, setNameField] = useState(props.profile.fullName)
    let changeName = (e: ChangeEvent<HTMLInputElement>) => setNameField(e.currentTarget.value)

    let [aboutMeField, setAboutMeField] = useState(props.profile.aboutMe)
    let changeAboutMe = (e: ChangeEvent<HTMLTextAreaElement>) => setAboutMeField(e.currentTarget.value)

    let [lookingForAJobField, setLookingForAJobField] = useState(props.profile.lookingForAJob)
    let changeLookingForAJob = (e: ChangeEvent<HTMLInputElement>) => setLookingForAJobField(e.currentTarget.checked)

    let [mySkillsField, setMySkillsField] = useState(props.profile.lookingForAJobDescription)
    let changeMySkills = (e: ChangeEvent<HTMLTextAreaElement>) => setMySkillsField(e.currentTarget.value)


    let onSubmit = () => {
        let profileData = {
            fullName: nameField,
            aboutMe: aboutMeField,
            lookingForAJob: lookingForAJobField,
            lookingForAJobDescription: mySkillsField,
          //  contacts: {
          //      github: 'https://github.com/denya54',
           //     vk: 'https://vk.com/nice_dgl',
         //       instagram: 'https://www.instagram.com/khvesenya.denis/'
          //  }
        }
        props.setProfileData(profileData)
        props.changeEditMode()
    }

    return (
        <div>
            <div>
                <p>My name <input value={nameField}
                                  onChange={changeName}
                />
                </p>
                <p>About me: <textarea value={aboutMeField}
                                    onChange={changeAboutMe}/></p>
            </div>

            <div>
                <p>Looking for a job: <input type={'checkbox'}
                                             checked={lookingForAJobField}
                                             onChange={changeLookingForAJob}/></p>
                <p>My professional skills: <textarea value={mySkillsField}
                                                  onChange={changeMySkills}/></p>
            </div>
            <div>
                {props.profile.contacts && <p>Contacts: {Object.keys(props.profile.contacts).map((key) => {
                    // @ts-ignore
                    return <ContactsEditForm key={key} contactTitle={key} contactValue={props.profile?.contacts[key]}/>
                })}</p>}
            </div>
            <button onClick={onSubmit}>Save</button>
        </div>
    )
}
