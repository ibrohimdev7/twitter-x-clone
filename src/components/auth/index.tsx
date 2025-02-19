"use client";

import React, { useCallback } from "react";

import Image from "next/image";
import { useLoginModalStore } from "@/hooks/use-login-modal";
import Button from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRegisterModalStore } from "@/hooks/use-register-modal";
import RegisterModal from "../modals/register-modal";
import LoginModal from "../modals/login-modal";
import { signIn, useSession } from "next-auth/react";

const Auth = () => {
  const registerModal = useRegisterModalStore();
  const loginModal = useLoginModalStore();

  const { data } = useSession();

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div>
      <RegisterModal />
      <LoginModal />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
        <Image
          src={"/images/logo.svg"}
          alt="logo"
          width={400}
          height={400}
          className="justify-self-center hidden md:block"
        />

        <div className="flex flex-col justify-center space-y-6 md:justify-between h-full md:h-[70vh]">
          <div className="block md:hidden">
            <Image
              src={"/images/logo.svg"}
              alt="logo"
              width={50}
              height={50}
              className="justify-self-center hidden md:block"
            />
          </div>
          <h1 className="text-6xl font-bold">Happening now</h1>
          <div className="w-full md:w-[60%]">
            <h2 className="font-bold text-3xl mb-4">Join. today</h2>
            <div className="flex flex-col space-y-2">
              <Button
                onClick={() => signIn("google")}
                label={
                  <div className="flex gap-2 items-center justify-center">
                    <FcGoogle />
                    Sign Up with Google
                  </div>
                }
                fullWidth
                secondary
              />
              <Button
                label={
                  <div className="flex gap-2 items-center justify-center">
                    <AiFillGithub />
                    Sign Up with GitHub
                  </div>
                }
                onClick={() => signIn("github")}
                fullWidth
                secondary
              />
              <div className="flex items-center justify-center">
                <div className="h-px bg-gray-700 w-1/2"></div>
                <p className="mx-4">or</p>
                <div className="h-px bg-gray-700 w-1/2"></div>
              </div>
              <Button
                label="Create an account"
                fullWidth
                onClick={onOpenRegisterModal}
              />
              <div className="text-[10px] text-gray-400">
                By signing up, you agree to the
                <span className="text-sky-500"> Terms of Service </span> and
                <span className="text-sky-500"> Privacy Policy </span>,
                including
                <span className="text-sky-500"> Cookie use </span>.
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            <h3 className="font-medium text-xl mb-4">
              Already have an account?
            </h3>
            <Button
              label="Sign In"
              fullWidth
              outline
              onClick={onOpenLoginModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
