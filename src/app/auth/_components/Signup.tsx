"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { signup } from "@/actions/auth/signup.action";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupInfo, SignupSchema } from "@/types";

export default function Signup() {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<SignupInfo>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignupSchema),
  });

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 80, opacity: 1 }}
      transition={{ ease: "easeIn" }}
    >
      <Card className="w-[400px] space-y-4">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <div>
              <Label htmlFor={field.name}>Username</Label>
              <Input {...field} id={field.name} name={field.name} type="text" />
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <Label htmlFor={field.name}>Email</Label>
              <Input {...field} id={field.name} name={field.name} type="text" />
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div>
              <Label htmlFor={field.name}>Password</Label>
              <Input
                {...field}
                id={field.name}
                name={field.name}
                type="password"
              />
            </div>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <div>
              <Label htmlFor={field.name}>Confirm password</Label>
              <Input
                {...field}
                id={field.name}
                name={field.name}
                type="password"
              />
            </div>
          )}
        />

        <Button
          disabled={!isValid}
          onClick={handleSubmit(signup)}
          variant={"akmalmohtar"}
          className="w-[80px]"
        >
          {isSubmitting ? <LoadingSpinner /> : "Signup"}
        </Button>
      </Card>
    </motion.div>
  );
}
