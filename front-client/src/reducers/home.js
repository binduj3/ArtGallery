import { CONTACTS, DOCUMENTS } from "../actions/types";

const initialState = {
  contacts: [],
  documents: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CONTACTS:
      return {
        ...state,
        contacts: payload,
      };

    case DOCUMENTS:
      return {
        ...state,
        documents: payload,
      };

    default:
      return state;
  }
}
