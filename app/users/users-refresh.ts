export const USERS_REFRESH_EVENT = "users:refresh";

export function dispatchUsersRefresh() {
  window.dispatchEvent(new CustomEvent(USERS_REFRESH_EVENT));
}
