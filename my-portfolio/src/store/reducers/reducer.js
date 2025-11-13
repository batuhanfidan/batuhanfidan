import {
  ENGLISH,
  TURKISH,
  TOGGLE_DARK_MODE,
  GET_DATA,
} from "../actions/action";

const initialLanguage = localStorage.getItem("language") || "english";
const initialDarkMode = localStorage.getItem("darkMode") === "true" || false;

const initialState = {
  language: initialLanguage,
  darkMode: initialDarkMode,
  get_data: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        get_data:
          action.payload && action.payload[0]
            ? state.language === "english"
              ? action.payload[0].english
              : action.payload[0].turkish
            : [],
      };

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
