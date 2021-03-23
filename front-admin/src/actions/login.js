import { CONTACTS } from "./types";

export const getAllContacts = () => async (dispatch) => {
  try {
    const requestOption = {
      method: "GET",
    };

    const response = await fetch("/api/v1/contacts", requestOption);
    if (response.status === 200) {
      const json = await response.json();

      dispatch({ type: CONTACTS, payload: json });
    }
  } catch (error) {
    console.log("error from getallContacts: " + error);
    dispatch({ type: CONTACTS, payload: [] });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const requestOption = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch("/api/v1/login", requestOption);
    if (response.status === 200) {
      const json = await response.json();
      localStorage.setItem("token", json);
    }
  } catch (error) {
    localStorage.setItem("token", "");
  }
};
