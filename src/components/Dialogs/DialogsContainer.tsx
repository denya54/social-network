import React from 'react';
import {dialogsPageType, sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialog-reducer";
import {StateType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Dispatch} from "redux";

type MapStatePropsReturnType = { dialogsPage: dialogsPageType }

let mapStateToProps = (state: StateType): MapStatePropsReturnType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

type MapDispatchReturnType = {
    updateNewMessageBody: (body: string) => void
    sendMessage: (body: string) => void
}

let mapDispatchToProps = (dispatch: Dispatch) : MapDispatchReturnType => {
    return {
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBodyCreator(body)),
        sendMessage: (body: string) => dispatch(sendMessageCreator(body))
    }
}

export type DialPropsType = MapStatePropsReturnType & MapDispatchReturnType

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;