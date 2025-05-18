"use client";
import React, { useEffect, useState } from "react";
import { AnimatedModalDemo } from "./Modal";
import PhoneNumberInput from "./ui/phone-number-input";
import { useModal } from "./ui/animated-modal";
import { Button } from "./ui/button";
import countries from "@/constants/countries";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/firebase";
import { verifyNumber } from "@/app/actions/verifyService";
import { Input } from "./ui/input";
import DotsLoader from "./ui/dost-loader";

const VerifyNumber = ({ action, isVerfied }: any) => {
  const [loading, setLoading] = useState(false);

  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [changePrefix, setChangePrefix] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier>();

  //   useEffect(() => {
  //     const setupRecaptcha = () => {
  //       const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  //         size: "normal",
  //         callback: (response: any) => {
  //           console.log(response);
  //           //   verifier.clear();
  //           // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         },
  //         "expired-callback": () => {
  //           // Response expired. Ask user to solve reCAPTCHA again.
  //         },
  //       });

  //       setRecaptchaVerifier(verifier);
  //       verifier.render().then((widgetId) => {
  //         console.log(widgetId, "widgedidd");
  //         window.recaptchaWidgetId = widgetId;
  //       });
  //     };

  //     setupRecaptcha();

  //     // Clean up the reCAPTCHA widget on unmount
  //     return () => {
  //       if (recaptchaVerifier) {
  //         recaptchaVerifier.clear();
  //       }
  //     };
  //   }, []);

  const handleSubmit = async (formData: FormData) => {
    // const appVerifier = recaptchaVerifier as RecaptchaVerifier; // Use the state variable
    const finalPhoneNumber = `${changePrefix.dialCode}${phoneNumber}`;
    console.log(finalPhoneNumber);
    try {
      setLoading(true);
      const res = await verifyNumber(finalPhoneNumber);
      console.log(res);
      setShowOTP(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

    // signInWithPhoneNumber(auth, "+201234567898", appVerifier)
    //   .then((confirmationResult) => {
    //     console.log(confirmationResult);

    //     setVerificationId(confirmationResult.verificationId);
    //     setShowOTP(true);
    //     window.confirmationResult = confirmationResult; // Still using window for confirmation
    //   })
    //   .catch((error) => {
    //     console.log("Error during signInWithPhoneNumber", error);
    //   });
  };

  const handleOtpChange = async (input: string) => {
    setOTP(input);
    if (input.length === 6) {
      setLoading(true);

      const finalPhoneNumber = `${changePrefix.dialCode}${phoneNumber}`;
      await action(finalPhoneNumber, input, name);
    }
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 99,
        }}
        id="recaptcha-container"
      ></div>

      <AnimatedModalDemo
        triggerClassName={"hidden"}
        footer={
          !showOTP ? (
            <Footer
              submit={handleSubmit}
              name={name}
              phoneNumber={phoneNumber}
              // email={email}
            />
          ) : (
            <></>
          )
        }
        showClose={false}
        trigger={<Trigger isVerfied={isVerfied} />}
      >
        <h2 className=" text-center my-6  ">
          {showOTP
            ? "Check Your Phone There is a SMS Just Sent To You"
            : "  Verify Your Number To Check Out"}
        </h2>
        <form className=" relative   ">
          {loading && (
            <DotsLoader classNames="  absolute  top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2     " />
          )}
          {showOTP ? (
            <InputOTP
              className="text-center"
              value={otp}
              onChange={handleOtpChange}
              maxLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          ) : (
            <div className=" space-y-10">
              <Input
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
              />
              {/* <Input
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
              /> */}
              <PhoneNumberInput
                onNumberChange={setPhoneNumber}
                onChange={setChangePrefix}
                name="phone"
              />
            </div>
          )}
        </form>
      </AnimatedModalDemo>
    </div>
  );
};

const Trigger = ({ isVerfied }: any) => {
  const { setOpen } = useModal();
  useEffect(() => {
    if (!isVerfied) setOpen(true);
  }, [isVerfied]);

  return <></>;
};

const Footer = ({ submit, name, phoneNumber, email = "email" }: any) => {
  const { setOpen } = useModal();

  return (
    <Button disabled={!name || !phoneNumber || !email} onClick={submit}>
      Send OTP
    </Button>
  );
};

export default VerifyNumber;
