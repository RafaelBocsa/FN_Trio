import api from "./axios";

export const loginWithGoogle = () => {
  window.location.href = `${api.defaults.baseURL}/oauth2/authorization/google`;
};

export const loginWithGithub = () => {
  window.location.href = `${api.defaults.baseURL}/oauth2/authorization/github`;
};
