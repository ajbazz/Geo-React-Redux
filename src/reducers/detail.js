import { DETAIL, ERROR } from '../constants/ActionTypes';

const locationDetails = (state = { detail: null }, action) => {
  switch (action.type) {
    case DETAIL:
      return {
        ...state,
        detail: action.detail,
      };
    case ERROR:
      return {
        ...state,
        isLocating: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default locationDetails;
