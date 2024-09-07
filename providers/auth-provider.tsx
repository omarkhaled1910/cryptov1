"use client";

import { emptyUser } from "@/constants";
import { getUserFromLocalStorage, setUserToLocalStorage } from "@/lib/utils";
import { redirect } from "next/navigation";
import {
  createContext,
  Dispatch,
  useContext,
  useMemo,
  useReducer,
} from "react";

const AuthContext = createContext<{
  state: typeof emptyUser;
  dispatch: Dispatch<any>;
}>({
  state: emptyUser,
  dispatch: () => {},
});

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOG_IN": {
      //check if the action id exists in the users
      console.log(action, "user reducer");

      let { user, access_token } = action.payload;

      console.log(user, access_token, "user reducer");
      const newState = {
        user_id: user?.id || user?._id,
        access_token: access_token,
        phone_number: user.phone_number || "",
        email: user.email || "",
        name: user.name || "",
      };

      setUserToLocalStorage(newState);
      return newState;
    }

    case "LOG_OUT": {
      console.log(action, "user reducer LOG_OUT");

      setUserToLocalStorage(emptyUser);
      return emptyUser;
    }

    default:
      return state;
  }
};
export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const previousUser = getUserFromLocalStorage();
  const [state, dispatch] = useReducer(userReducer, previousUser);
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a CounterProvider");
  }
  return context;
};
