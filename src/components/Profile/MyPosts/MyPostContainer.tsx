import React from "react";
import {addPostActionCreator, postType, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPost from "./MyPost";
import {StateType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";


export type MapDispatchReturnType = {
    updateNewPostText: (text: string) => void
    addPost: (text: string) => void
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchReturnType => {
    return {
        updateNewPostText: (text: string) => {
            let action = updateNewPostTextActionCreator(text)
            dispatch(action);
        },
        addPost: (text: string) => {
            dispatch(addPostActionCreator(text));
        }
    }
}

export type MapStatePropsReturnType = {
    statePosts: Array<postType>
    newPostText: string
}

const mapStateToProps = (state: StateType) : MapStatePropsReturnType => {
    return {
        statePosts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

export type MyPostPropsType = MapDispatchReturnType & MapStatePropsReturnType

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)

export default MyPostContainer;