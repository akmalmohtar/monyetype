"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { signup } from "@/actions/auth/signup.action";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useForm } from "@tanstack/react-form";

type SignupInfo = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const { Field, Subscribe, handleSubmit } = useForm<SignupInfo>({
    onSubmit: async ({ value }) => {
      const res = await signup(value);

      if (!res.success) {
        setSubmissionError(res.message);
      } else {
        setSubmissionError(null);
      }
    },
  });

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 80, opacity: 1 }}
      transition={{ ease: "easeIn" }}
    >
      <Card className="w-[400px] space-y-4">
        <Field name="username">
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Username</Label>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </Field>

        <Field name="email">
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </Field>

        <Field name="password">
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Password</Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </Field>

        <Field name="confirmPassword">
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Confirm password</Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </Field>

        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <div className="flex justify-between">
              <Button
                disabled={!canSubmit}
                onClick={handleSubmit}
                variant={"akmalmohtar"}
                className="w-[80px]"
              >
                {isSubmitting ? <LoadingSpinner /> : "Signup"}
              </Button>
              {!!submissionError && (
                <p className={cn("text-red-500")}>{submissionError}</p>
              )}
            </div>
          )}
        </Subscribe>
      </Card>
    </motion.div>
  );
}
