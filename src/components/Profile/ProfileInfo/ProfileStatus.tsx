import React, {useState} from 'react';

type ProfileStatusPropsType = {
    status: string
}

const ProfileStatus = (props: ProfileStatusPropsType) => {

    const [editMode, setEditMode] = useState(false)

    const deActivateEditMode = () => setEditMode(false)
    const activateEditMode = () => setEditMode(true)


    return (
        <div>
            {editMode
                ? <div><input value={props.status} onBlur={deActivateEditMode} autoFocus/></div>
                : <div><span onDoubleClick={activateEditMode}>{props.status}</span></div>
            }
        </div>)
}
export default ProfileStatus;