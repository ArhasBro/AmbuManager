"use client";

import { signOut } from "next-auth/react";
import { ActionButton } from "@/app/ui";

export default function LogoutButton() {
  return (
    <ActionButton variant="primary" onClick={() => signOut({ callbackUrl: "/login" })}>
      Deconnexion
    </ActionButton>
  );
}
