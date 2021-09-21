import React from 'react';
import classes from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div><img className={classes.picture} src={'https://picfiles.alphacoders.com/280/thumb-1920-280763.jpg'}/></div>
            <div className={classes.descriptionBlock}>avatar + description</div>
        </div>
    )
}
export default ProfileInfo;