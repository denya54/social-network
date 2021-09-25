import classes from './MyPost.module.css'
import React, {ChangeEvent} from "react";
import Post from "./Post1/Post";
import {ActionType, postType} from "../../../redux/state";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";

type myPostProps = {
    newPostText: string
    statePosts: Array<postType>
    dispatch: (action: ActionType) => void
}



const MyPost = (props: myPostProps) => {
    let postsElement = props.statePosts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPostCallback = () => {
        // props.dispatch({type: 'ADD-POST', postMessage: newPostElement.current ? newPostElement.current.value : ""} )
        props.dispatch(addPostActionCreator(newPostElement.current ? newPostElement.current.value : ""));
        // props.addPostCallback(newPostElement.current ? newPostElement.current.value : "")
    }
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // props.dispatch({type: 'UPDATE-NEW-POST-TEXT', NewText: e.currentTarget.value})
        props.dispatch(updateNewPostTextActionCreator(e.currentTarget.value))
        // props.changeAreaTextCallback(e.currentTarget.value)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div><textarea ref={newPostElement}
                           value={props.newPostText}
                           onChange={onPostChange}
            /></div>
            <div>
                <button onClick={addPostCallback}>Add new post</button>
            </div>
            <div className={classes.posts}>
                {postsElement}
            </div>
        </div>
    )
}

export default MyPost;