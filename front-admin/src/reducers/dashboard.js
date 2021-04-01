import {
  FILES,
  UPLOAD_FILES,
  DELETE_FILE,
  UPDATE_FILE,
} from "../actions/types";

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
        files: [...state.files, ...payload],
      };
    case DELETE_FILE:
      return {
        ...state,
        files: state.files.filter((file) => file._id !== payload),
      };
    case UPDATE_FILE:
      return {
        ...state,
        files: state.files.map((file) =>
          file._id === payload.id ? payload : file
        ),
      };
    default:
      return state;
  }
}
