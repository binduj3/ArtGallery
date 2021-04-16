import { FILES, UPLOAD_FILES, DELETE_FILE, UPDATE_FILE } from "./types";
import { Message } from "../utils/global";

export const getAllFiles = () => async (dispatch) => {
  try {
    // if (localStorage.getItem("token")) {
    const requestOption = {
      method: "GET",
      headers: { "x-auth-token": localStorage.getItem("token") },
    };

    const response = await fetch("/api/v1/admin", requestOption);
    if (response.status === 200) {
      const json = await response.json();

      dispatch({ type: FILES, payload: json.data });
    } else {
      Message("error", "OOops...", "Something went wrong !", false, 2000);
    }
    // }
  } catch (error) {
    dispatch({ type: FILES, payload: [] });
  }
};

export const upLoadFiles = (data) => async (dispatch) => {
  try {
    // if (localStorage.getItem("token")) {
    const requestOption = {
      method: "POST",
      body: data,
    };
    const response = await fetch("/api/v1/admin", requestOption);
    if (response.status === 200) {
      const json = await response.json();
      Message("success", "Successfully added file", "", false, 2500);
      dispatch({ type: UPLOAD_FILES, payload: json.data });
    } else {
      Message("error", "OOops...", "Something went wrong !", false, 2000);
    }
    // }
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = (id, data) => async (dispatch) => {
  try {
    // if (localStorage.getItem("token")) {
    const requestOption = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`/api/v1/admin/${id}`, requestOption);
    if (response.status === 200) {
      Message("success", "Successfully deleted file", "", false, 2500);
      dispatch({ type: DELETE_FILE, payload: id });
    } else {
      Message("error", "OOops...", "Something went wrong !", false, 2000);
    }
    // }
  } catch (error) {
    console.log(error);
  }
};

export const updateFile = (id, data, saveData) => async (dispatch) => {
  try {
    // if (localStorage.getItem("token")) {
    const requestOption = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`/api/v1/admin/${id}`, requestOption);
    if (response.status === 200) {
      Message("success", "Successfully updated file", "", false, 2500);
      let json = await response.json();
      dispatch({ type: UPDATE_FILE, payload: saveData });
    } else {
      Message("error", "OOops...", "Something went wrong !", false, 2000);
    }
    //  }
  } catch (error) {
    console.log(error);
  }
};
