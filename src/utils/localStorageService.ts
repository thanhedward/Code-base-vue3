const ACCESS_TOKEN_KEY = 'accessToken';
const DISPLAY_LANGUAGE = 'displayLanguage';
const REDIRECT_URL = 'redirectUrl';


const setAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || '';
};

const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
const setRedirectUrl = (url: string) => {
  localStorage.setItem(REDIRECT_URL, url);
}

const getRedirectUrl = () => {
  return localStorage.getItem(REDIRECT_URL) || '';
};

const clearRedirectUrl = () => {
  localStorage.removeItem(REDIRECT_URL);
};
const setDisplayLanguage = (displayLanguage: string) => {
  localStorage.setItem(DISPLAY_LANGUAGE, displayLanguage);
};

const getDisplayLanguage = () => {
  return localStorage.getItem(DISPLAY_LANGUAGE) || '';
};

const clearDisplayLanguage = () => {
  localStorage.removeItem(DISPLAY_LANGUAGE);
};

export default {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
  setRedirectUrl,
  getRedirectUrl,
  clearRedirectUrl,
  setDisplayLanguage,
  getDisplayLanguage,
  clearDisplayLanguage,
}