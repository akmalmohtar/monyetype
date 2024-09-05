"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { signup } from "@/actions/auth";
import { useFormState, useFormStatus } from "react-dom";

export default function Signup() {
  const [state, action] = useFormState(signup, undefined);
  const { pending } = useFormStatus();

  return (
    <motion.form
      action={action}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 80, opacity: 1 }}
      transition={{ ease: "easeIn" }}
    >
      <Card className="w-[400px] space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" type="username" />
          {state?.errors?.email && (
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
        </div>
        <Button type="submit" variant={"akmalmohtar"} disabled={pending}>
          Signup
        </Button>
      </Card>
    </motion.form>
  );
}
