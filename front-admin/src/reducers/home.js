import { CONTACTS } from "../actions/types";

const initialState = {
  contacts: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CONTACTS:
      return {
        ...state,
        contacts: payload,
      };

    default:
      return state;
  }
}
