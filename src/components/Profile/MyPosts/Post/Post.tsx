import React from 'react';
import classes from './Post.module.css'
import {postType} from "../../../../redux/profile-reducer";



const Post = (props: postType) => {
    return (
        <div className={classes.item}>
            <img
                src={'https://i.pinimg.com/236x/ad/f8/46/adf8468dafd48dc33091e0790d000c0e--dog-breath-high-five.jpg?nii=t'}/>
            {props.message}
            <div>
                <span>♡ </span>{props.likesCount}
            </div>
        </div>
    )
}
export default Post;