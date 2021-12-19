import classes from './MyPost.module.css'
import React from "react";
import Post from "./Post1/Post";
import {MyPostPropsType} from "./MyPostContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

const MyPost = (props: MyPostPropsType) => {

    let postsElement = props.statePosts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)

    let onAddPost = (values: any) => props.addPost(values.newPostText)

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>

            <AddNewPostReduxForm onSubmit={onAddPost}/>
            <div className={classes.posts}>
                {postsElement}
            </div>
        </div>
    )
}

type MyPostFormDataType = {
    newPostText: string
}

export const AddNewPostForm: React.FC<InjectedFormProps<MyPostFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={'textarea'}/>
            </div>
            <div>
                <button>Add new post</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm<MyPostFormDataType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)
export default MyPost;