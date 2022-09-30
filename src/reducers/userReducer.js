import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOCALSTORAGE_REQUEST,
  USER_LOCALSTORAGE_SUCESS,
  USER_LOCALSTORAGE_NOT_FOUND,
} from "../types/userTypes";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_LOCALSTORAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
    case USER_LOCALSTORAGE_SUCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        user: {},
      };

    case USER_LOCALSTORAGE_NOT_FOUND:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
