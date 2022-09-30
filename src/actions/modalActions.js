import { MODAL_ON, MODAL_OFF } from "../types/modalTypes";

export const activeModalAction = () => (dispatch) => {
  dispatch(activeModal());
};

const activeModal = () => ({
  type: MODAL_ON,
});

export const desactiveModalAction = () => (dispatch) => {
  dispatch(desactiveModal());
};

const desactiveModal = () => ({
  type: MODAL_OFF,
});
