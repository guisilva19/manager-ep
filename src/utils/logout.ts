export default function logout() {
  localStorage.removeItem("access_ep");
  window.location.href = "/";
}
