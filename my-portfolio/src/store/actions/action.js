export const TURKISH = "TURKISH";
export const ENGLISH = "ENGLISH";
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

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
  localStorage.setItem("darkMode", (!isDark).toString());
  dispatch({ type: TOGGLE_DARK_MODE });
};
