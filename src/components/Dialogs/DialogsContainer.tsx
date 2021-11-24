import React from 'react';
import {dialogsPageType, sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialog-reducer";
import {StateType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStatePropsReturnType = {
    dialogsPage: dialogsPageType
    // isAuth: boolean
}

let mapStateToProps = (state: StateType): MapStatePropsReturnType => {
    return {
        dialogsPage: state.dialogsPage,
        // isAuth: state.auth.isAuth
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



// let AuthRedirectComponent = withAuthRedirect(Dialogs)


// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

// export default DialogsContainer;

export default compose <React.ComponentType> (
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)