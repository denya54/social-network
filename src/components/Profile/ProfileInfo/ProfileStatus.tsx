import React, {ChangeEvent, useState} from 'react';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus = (props: ProfileStatusPropsType) => {

    const [status, setStatus] = useState(props.status)

    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)

    const [editMode, setEditMode] = useState(false)

    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const activateEditMode = () => setEditMode(true)

    return (
        <div>
            {editMode
                ? <div><input value={status}
                              onChange={(e) => changeStatus(e)}
                              onBlur={deActivateEditMode}
                              autoFocus/>
                </div>
                : <div><span onDoubleClick={activateEditMode}>{status || 'No status'}</span></div>
            }
        </div>)
}
export default ProfileStatus;