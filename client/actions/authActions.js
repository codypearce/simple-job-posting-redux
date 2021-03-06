import * as types from "./actionTypes";
import * as jwt from "jsonwebtoken";

const BASE_URL = process.env.BASE_URL;

export function loginRequest() {
    return {
        type: types.LOGIN_REQUEST
    };
}
export function loginSuccess(data) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: data
    };
}
export function loginError(error) {
    return {
        type: types.LOGIN_ERROR,
        payload: error
    };
}

export function signupRequest() {
    return {
        type: types.SIGNUP_REQUEST
    };
}
export function signupSuccess(data) {
    return {
        type: types.SIGNUP_SUCCESS,
        payload: data
    };
}
export function signupError(error) {
    return {
        type: types.SIGNUP_ERROR,
        payload: error
    };
}

export function logoutRequest() {
    return {
        type: types.LOGOUT_REQUEST
    };
}
export function logoutSuccess(data) {
    return {
        type: types.LOGOUT_SUCCESS,
        payload: data
    };
}
export function logoutError(error) {
    return {
        type: types.LOGOUT_ERROR,
        payload: error
    };
}

export function login(user) {
    return async dispatch => {
        try {
            dispatch(loginRequest());
            // Login
            const res = await fetch(`${BASE_URL}/signin`, {
                body: JSON.stringify(user),
                method: "POST"
            })
                .then(res => res.json())
                .then(data => data);
            localStorage.setItem("token", res.token);
            dispatch(loginSuccess({ user: res.user }));
            return true;
        } catch (error) {
            dispatch(loginError("Email or Password is incorrect"));
        }
    };
}

export function checkAuth() {
    return async dispatch => {
        try {
            dispatch(loginRequest());
            const token = localStorage.getItem("token");
            const res = jwt.verify(token, process.env.JWT_SECRET);
            dispatch(loginSuccess({ user: res.user }));
            return true;
        } catch (error) {
            dispatch(loginError("Email or Password is incorrect"));
        }
    };
}

export function signup(user) {
    return async dispatch => {
        try {
            dispatch(signupRequest());
            // Login
            const res = await fetch(`${BASE_URL}/signup`, {
                body: JSON.stringify(user),
                method: "POST"
            })
                .then(res => res.json())
                .then(data => data);
            if (res.error) {
                dispatch(signupError(res.error));
                return false;
            }
            localStorage.setItem("token", res.token);
            dispatch(signupSuccess({ user: user }));
            return true;
        } catch (error) {
            dispatch(signupError(error));
        }
    };
}

export function logout() {
    return async dispatch => {
        try {
            dispatch(logoutRequest());

            localStorage.removeItem("token");
            dispatch(logoutSuccess());
            return true;
        } catch (error) {
            dispatch(logoutnError(error));
        }
    };
}

export function authRequest(user) {
    return async dispatch => {
        try {
            // Login
            const res = await fetch(`${BASE_URL}`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
                .then(res => res.json())
                .then(data => data);
            console.log(res);
            return true;
        } catch (error) {
            dispatch(signupError(error));
        }
    };
}
