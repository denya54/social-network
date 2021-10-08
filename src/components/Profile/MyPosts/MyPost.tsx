import classes from './MyPost.module.css'
import React, {ChangeEvent} from "react";
import Post from "./Post1/Post";
import {MyPostPropsType} from "./MyPostContainer";

// type myPostProps = {
//     newPostText: string
//     statePosts: Array<postType>
//     addPost: (text: string) => void
//     updateNewPostText: (text: string) => void
//     dispatch?: (action: ActionType) => void
// }

const MyPost = (props: MyPostPropsType) => {
    let postsElement = props.statePosts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let addPostCallback = () => {
        props.addPost(newPostElement.current ? newPostElement.current.value : "")
        // props.dispatch(addPostActionCreator(newPostElement.current ? newPostElement.current.value : ""));
    }
    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.updateNewPostText(text)
        // props.dispatch(updateNewPostTextActionCreator(e.currentTarget.value))
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