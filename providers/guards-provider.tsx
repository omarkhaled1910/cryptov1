"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "./auth-provider";

export const GuardsProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { state, dispatch } = useAuthContext();

  console.log(state, !state?.access_token);

  if (!state?.access_token && window) redirect("/login");
  return children;
};
