import React, {ChangeEvent} from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPost from "./MyPost";
import {StoreType} from "../../../redux/redux-store";

type myPostProps = {
    store: StoreType
}

const MyPostContainer = (props: myPostProps) => {
    let state = props.store.getState()
    let addPostCallback = (text: string) => {
        props.store.dispatch(addPostActionCreator(text));
        // props.store.dispatch(addPostActionCreator(newPostElement.current ? newPostElement.current.value : ""));
    }
    let onPostChange = (text: string) => {
        let action = updateNewPostTextActionCreator(text)
        props.store.dispatch(action);
        //props.store.dispatch(updateNewPostTextActionCreator(e.currentTarget.value))
    }
    // let postsElement = props.store.statePosts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)

    return (
        <div>
            {/*<MyPost newPostText={} statePosts={} dispatch={}/>*/}
            <MyPost updateNewPostText={onPostChange}
                    addPost={addPostCallback}
                    statePosts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}
            />
        </div>
    )
}

export default MyPostContainer;