const intialState = {
    errMsg: "",
    user: JSON.parse(localStorage.getItem('user')) || null,
    isCreated: false
}

export const authReducer = (state = intialState, action) => {
    switch(action.type) {
        case "ERROR_MSG":
            return {
                ...state,
                errMsg: action.payload,
                isCreated: false
            };
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                isCreated: true
            }
        case "SIGNIN_SUCCESS":
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                isCreated: false,
                user: action.payload
            }
        case "SIGNOUT_SUCCESS":
            localStorage.removeItem('user');
            return {
                ...state,
                isCreated: false,
                user: null
            }
        default:
            return state;
    }
}