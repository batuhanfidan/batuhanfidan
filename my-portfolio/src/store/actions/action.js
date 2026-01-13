import axios from "axios";

export const TURKISH = "TURKISH";
export const ENGLISH = "ENGLISH";
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";
export const GET_DATA = "GET_DATA";

export const getDatas = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://696611e2f6de16bde44c114e.mockapi.io/data"
    );
    console.log("🔵 ACTION - API RESPONSE:", res.data);
    dispatch({ type: GET_DATA, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const setTurkish = () => {
  localStorage.setItem("language", "turkish");
  return { type: TURKISH };
};

export const setEnglish = () => {
  localStorage.setItem("language", "english");
  return { type: ENGLISH };
};

export const toggleDarkMode = () => (dispatch, getState) => {
  const isDark = getState().darkMode;
  const newMode = !isDark;
  localStorage.setItem("darkMode", newMode.toString());
  dispatch({ type: TOGGLE_DARK_MODE });
};
