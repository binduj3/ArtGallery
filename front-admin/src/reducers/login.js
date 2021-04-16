import { CONTACTS, SET_AUTHENTICATED } from "../actions/types";

const initialState = {
  contacts: [],
  isAuthenticated: false,
  loading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CONTACTS:
      return {
        ...state,
        contacts: payload,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload,
        loading: false,
      };
    default:
      return state;
  }
}
