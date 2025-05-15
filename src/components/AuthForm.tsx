"use client";

import React from "react";
import { useRouter } from "next/router";
import { CardContent } from "./ui/card";

type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";
  const router = useRouter();
  // toast

  const handleSubmit = (formData: FormData) => (
    console.log("Form Submitted");
  );

  return <form action="{handleSubmit">
    <CardContent>
        <div>
            
        </div>
    </CardContent>
  </form>
}

export default AuthForm;
