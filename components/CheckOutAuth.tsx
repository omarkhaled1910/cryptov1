"use client";
import React, { useState } from "react";
import VerifyNumber from "./VerifyNumber";
import { verifyCode } from "@/app/actions/verifyService";
import { useAuthContext } from "@/providers/auth-provider";
import { useToast } from "./ui/use-toast";
import { toastColors } from "@/constants";

const CheckOutAuth = () => {
  const [showAuth, setShowAuth] = useState(true);
  const { dispatch, state } = useAuthContext();
  const { toast } = useToast();
  console.log(state);
  const action = async (phoneNumber: string, otp: string, name: string) => {
    console.log(otp);
    const res = await verifyCode(phoneNumber, otp, name);
    console.log(res);
    if (res?.client_access_token) {
      dispatch({
        type: "LOG_IN",
        payload: {
          user: res?.full_user,
          client_access_token: res.client_access_token,
        },
      });
      toast({
        title: "User Loged in Succesfully",
        style: { backgroundColor: toastColors.SUCESS },
      });
      setShowAuth(false);
    } else {
      toast({
        title: "Invalid Verifaction",
        style: { backgroundColor: toastColors.FAIL },
      });
    }
  };
  if (state?.client_access_token) return <></>;
  return (
    <>
      {showAuth && (
        <VerifyNumber
          isVerfied={!!state?.client_access_token}
          action={action}
        />
      )}
    </>
  );
};

export default CheckOutAuth;
