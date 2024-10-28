"use client";
import { User2Icon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import useClickAway from "@/hooks/useClickAway";
import Link from "next/link";
import { useAuthContext } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { clientLogout, logout } from "@/app/actions/auth";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAuthContext();
  const { push } = useRouter();

  const ref = useClickAway<HTMLDivElement>(() => setOpen(false));

  const handleLogOut = async () => {
    state?.client_access_token ? await clientLogout() : await logout();
    dispatch({ type: "LOG_OUT" });
    push("/");
  };
  if (!state?.access_token && !state?.client_access_token) return <></>;

  return (
    <div ref={ref} className=" relative">
      <Button onClick={() => setOpen(true)} variant={"outline"}>
        <User2Icon />
      </Button>
      {open && (
        <div
          id="userDropdown"
          className="z-10  absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{state?.name || "Bonnie Green"} </div>
            <div className="font-medium truncate">{state.email}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <form
              action={handleLogOut}
              className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              <button className="w-full h-full" type="submit">
                {" "}
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
