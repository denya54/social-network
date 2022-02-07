import classes from './MyPost.module.css'
import React from "react";
import Post from "./Post1/Post";
import {MyPostPropsType} from "./MyPostContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../common/FormsControls/FormsConrols";

const MyPost = React.memo((props: MyPostPropsType) => {
    console.log('yo')

    let postsElement = props.statePosts.map(post => <Post message={post.message}
                                                          likesCount={post.likesCount}/>)

    let onAddPost = (values: any) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>

            <AddNewPostReduxForm onSubmit={onAddPost}/>
            <div className={classes.posts}>
                {postsElement}
            </div>
        </div>
    )
})

type MyPostFormDataType = {
    newPostText: string
}

let maxLength10 = maxLengthCreator(10)

export const AddNewPostForm: React.FC<InjectedFormProps<MyPostFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={Textarea} placeholder={'Post me'} validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add new post</button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm<MyPostFormDataType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)
export default MyPost;