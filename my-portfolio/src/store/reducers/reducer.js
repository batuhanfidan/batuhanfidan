import { ENGLISH, TURKISH, TOGGLE_DARK_MODE } from "../actions/action";
import siteData from "../../data/data.json";

const initialLanguage = localStorage.getItem("language") || "english";
const initialDarkMode = localStorage.getItem("darkMode") === "true";

const initialState = {
  language: initialLanguage,
  darkMode: initialDarkMode,
  get_data: siteData,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TURKISH:
      return { ...state, language: "turkish" };

    case ENGLISH:
      return { ...state, language: "english" };

    case TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };

    default:
      return state;
  }
};
