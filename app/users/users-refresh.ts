import type { UserListRow } from "./users-client-shared";

export const USERS_REFRESH_EVENT = "users:refresh";
export const USERS_SELECTION_EVENT = "users:selection";

export type UsersSelectionEventDetail = {
  user: UserListRow | null;
};

export function dispatchUsersRefresh() {
  window.dispatchEvent(new CustomEvent(USERS_REFRESH_EVENT));
}

export function dispatchUsersSelection(user: UserListRow | null) {
  window.dispatchEvent(new CustomEvent<UsersSelectionEventDetail>(USERS_SELECTION_EVENT, {
    detail: { user },
  }));
}
