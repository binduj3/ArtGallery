import { FILES, UPLOAD_FILES, DELETE_FILE } from "./types";
import { Message } from "../utils/global";

export const getAllFiles = () => async (dispatch) => {
  let data = [
    {
      _id: 1,
      pic:
        "https://storage.cloud.google.com/bindutestdocuments/gobimanchurian.jpg?authuser=6",
      description: "Tasty Manchrian",
    },
    {
      _id: 2,
      pic:
        "https://storage.cloud.google.com/bindutestdocuments/chicken%20tikka.jpg?authuser=6",
      description: "Tasty tikka",
    },
    {
      _id: 3,
      pic:
        "https://storage.cloud.google.com/bindutestdocuments/biriyani.jpg?authuser=6",
      description: "Tasty Manchrian",
    },
  ];

  try {
    const requestOption = {
      method: "GET",
    };

    const response = await fetch("/api/v1/admin", requestOption);
    if (response.status === 200) {
      const json = await response.json();

      dispatch({ type: FILES, payload: json.data });
      //dispatch({ type: FILES, payload: data });
    }
  } catch (error) {
    dispatch({ type: FILES, payload: [] });
  }
};

export const upLoadFiles = (data) => async (dispatch) => {
  try {
    const requestOption = {
      method: "POST",
      body: data,
    };
    const response = await fetch("/api/v1/admin", requestOption);
    if (response.status === 200) {
      const json = await response.json();
      Message("success", "Successfully added file", "", false, 2500);
      dispatch({ type: UPLOAD_FILES, payload: json });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = (id, data) => async (dispatch) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
