import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {addPostActionCreator, postType } from "../../../redux/profile-reducer";
import { StateType } from "../../../redux/redux-store";
import Post from "./Post/Post";
import classes from './MyPost.module.css';
import {maxLengthCreator} from "../../../utils/validators";

type FormikErrorType = {
    newPostText?: string
}

const MyPostWithoutContainer = React.memo(() => {

    const statePosts = useSelector<StateType, Array<postType>>(st => st.profilePage.posts)

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
            if (!values.newPostText) {
                errors.newPostText = 'Post must be more 0 symbols '
            }
            return errors
        }
    })

    let postsElement = statePosts.map(post => <Post key={post.id}
                                                          message={post.message}
                                                          likesCount={post.likesCount}/>)

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <form onSubmit={formik.handleSubmit}>
            <textarea className={classes.textarea}
                      name={'newPostText'}
                      onChange={formik.handleChange}
                      value={formik.values.newPostText}
                      onBlur={formik.handleBlur}
                      placeholder={'write a new POST'}
            />
                <button className={classes.button}>Create POST</button>
            </form>
            {formik.errors.newPostText && <div style={{color: 'red'}}>{formik.errors.newPostText}</div>}

            <div className={classes.posts}>
                {postsElement}
            </div>
        </div>
    )
})


let maxLength10 = maxLengthCreator(10)


export default MyPostWithoutContainer;