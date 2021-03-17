import { FILES, UPLOAD_FILES, DELETE_FILE } from "../actions/types";

const initialState = {
  contacts: [],
  files: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FILES:
      return {
        ...state,
        files: payload,
      };
    case UPLOAD_FILES:
      return {
        ...state,
        files: [...state.files, payload],
      };
    case DELETE_FILE:
      return {
        ...state,
        files: state.files.filter((file) => file._id !== payload),
      };
    default:
      return state;
  }
}
