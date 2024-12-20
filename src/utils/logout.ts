export const logout = () => {
  localStorage.removeItem("access_ep")
  window.location.href = '/';
};
