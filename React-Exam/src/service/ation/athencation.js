import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../config/firebase.config";

const errMSg = (msg) => {
    return {
        type: "ERROR_MSG",
        payload: msg
    }
}

const signUpUser = () => {
    return {
        type: "SIGNUP_SUCCESS"
    }
}

const signInUser = (user) => {
    return {
        type: "SIGNIN_SUCCESS",
        payload: user
    }
}

const signOutUser = () => {
    return {
        type: "SIGNOUT_SUCCESS"
    }
}


export const createUserAsync = ({email, password}) => {
    return async (dispatch) => {
        try {
            let res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res);
            dispatch(signUpUser());
        } catch (error) {
            console.log(error);
            dispatch(errMSg(error.message))
        }
    }
}

export const signInAsync = ({email, password}) => {
    return async (dispatch) => {
        try {
            let res = await signInWithEmailAndPassword(auth, email, password)
            console.log(res.user);
            dispatch(signInUser(res.user));
        } catch (error) {
            console.log(error);
            dispatch(errMSg(error.message))
        }
    }
}

export const googleSignInAsync = () => {
    return async (dispatch) => {
        try {
            const provider = new GoogleAuthProvider();
            let res = await signInWithPopup(auth, provider)
            // console.log(res.user);
            dispatch(signInUser(res.user));
        } catch (error) {
            console.log(error);
            dispatch(errMSg(error.message))
        }
    }
}

export const signOutAsync = () => {
    return async (dispatch) => {
        try {
            await signOut(auth)
            dispatch(signOutUser());
        } catch (error) {
            console.log(error);
            dispatch(errMSg(error.message))
        }
    }
}