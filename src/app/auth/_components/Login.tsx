"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { login } from "@/actions/auth/login.action";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";

type LoginInfo = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<LoginInfo>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 80, opacity: 1 }}
      transition={{ ease: "easeIn" }}
    >
      <Card className="w-[400px] space-y-4">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              {" "}
              <Label htmlFor={field.name}>Email</Label>
              <Input
                {...field}
                id={field.name}
                name={field.name}
                type={field.name}
              />
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
                type={field.name}
              />
            </div>
          )}
        />

        <Button
          disabled={!isValid}
          onClick={handleSubmit(login)}
          variant={"akmalmohtar"}
          className="w-[80px]"
        >
          {isSubmitting ? <LoadingSpinner /> : "Login"}
        </Button>
      </Card>
    </motion.div>
  );
}
