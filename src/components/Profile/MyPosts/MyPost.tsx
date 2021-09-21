import classes from './MyPost.module.css'
import React, {ChangeEvent} from "react";
import Post from "./Post1/Post";
import {postType} from "../../../redux/state";

type myPostProps = {
    newPostText: string
    statePosts: Array<postType>
    addPostCallback: (postMessage: string)=> void
    changeAreaTextCallback: (NewText: string)=> void
}

const MyPost = (props: myPostProps) => {
    let postsElement = props.statePosts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)
    // {props.state.posts.map()}
    // let postsElement = posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPostCallback = () => {
        props.addPostCallback(newPostElement.current ? newPostElement.current.value : "")
    }
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeAreaTextCallback(e.currentTarget.value)
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