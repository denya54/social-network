import classes from './MyPost.module.css'
import React from "react";
import Post from "./Post1/Post";
import {MyPostPropsType} from "./MyPostContainer";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../common/FormsControls/FormsConrols";
import { AddMessageFormik } from '../../Dialogs/Dialogs';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addPostActionCreator } from '../../../redux/profile-reducer';

type FormikErrorType = {
    newPostText?: string
}

const MyPost = React.memo((props: MyPostPropsType) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            newPostText: ''
        },
        onSubmit: values => {
            dispatch(addPostActionCreator(values.newPostText))
            formik.resetForm()
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
                if(!values.newPostText) {
                    errors.newPostText = 'Post must be more 0 symbols '
            }
                return errors
        }
    })

    let postsElement = props.statePosts.map(post => <Post key={post.id}
                                                          message={post.message}
                                                          likesCount={post.likesCount}/>)

    let onAddPost = (values: any) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <form onSubmit={formik.handleSubmit}>
            <textarea
                name={'newPostText'}
                onChange={formik.handleChange}
                value={formik.values.newPostText}
                onBlur={formik.handleBlur}
            />
                <button>Create POST</button>
            </form>
            {formik.errors.newPostText && <div style={{color: 'red'}}>{formik.errors.newPostText}</div>}

            <div className={classes.posts}>
                {postsElement}
            </div>
        </div>
    )
})



let maxLength10 = maxLengthCreator(10)


export default MyPost;