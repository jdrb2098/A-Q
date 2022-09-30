import { MODAL_ON, MODAL_OFF } from "../types/modalTypes";

const initialState = {
  isModalActive: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_ON:
      return {
        ...state,
        isModalActive: true,
      };
    case MODAL_OFF:
      return {
        ...state,
        isModalActive: false,
      };
    default:
      return state;
  }
};
