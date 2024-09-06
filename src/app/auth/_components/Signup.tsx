"use client";

import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { signup } from "@/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Signup() {
  const [state, action] = useFormState(signup, undefined);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <motion.form
      ref={formRef}
      action={action}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 80, opacity: 1 }}
      transition={{ ease: "easeIn" }}
    >
      <Card className="w-[400px] space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" type="username" />
          {state?.errors?.username && (
            <p className="text-sm text-red-500">{state.errors.username}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" />
          {state?.errors?.confirmPassword && (
            <p className="text-sm text-red-500">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          {/* For some reason, the pending value from useFormStatus won't have an effect if set it within the same component */}
          <SpinnerOrButton formRef={formRef} />
          {state?.result && (
            <p
              className={cn("text-red-500", {
                "text-green-500": state?.result.success,
              })}
            >
              {state?.result?.message}
            </p>
          )}
        </div>
      </Card>
    </motion.form>
  );
}

function SpinnerOrButton({
  formRef,
}: {
  formRef: {
    current: HTMLFormElement | null;
  };
}) {
  const { pending } = useFormStatus();

  if (!pending) {
    formRef?.current?.reset();
  }

  return (
    <Button type="submit" variant={"akmalmohtar"} className="w-[80px]">
      {pending ? <LoadingSpinner /> : "Signup"}
    </Button>
  );
}
