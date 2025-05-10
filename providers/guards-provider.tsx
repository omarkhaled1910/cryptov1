"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "./auth-provider";
import { useEffect } from "react";

export const GuardsProvider = ({
  children,
  cookieToken,
}: {
  children: React.ReactElement;
  cookieToken?: string;
}) => {
  const { state, dispatch } = useAuthContext();

  console.log({ cookieToken });

  useEffect(() => {
    if (!cookieToken) {
      dispatch({ type: "LOG_OUT" });
    }
  }, [cookieToken]);

  // if (!state?.access_token && window) redirect("/login");
  return children;
};
