"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { login } from "@/actions/auth/login.action";
import { useForm } from "@tanstack/react-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";

type LoginInfo = {
  email: string;
  password: string;
};

export default function Login() {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const { Field, Subscribe, handleSubmit } = useForm<LoginInfo>({
    onSubmit: async ({ value }) => {
      const res = await login(value);
      if (!res.success) {
        setSubmissionError(res.message);
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
        <Field name="email">
          {(field) => (
            <div>
              {" "}
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.name}
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
                type={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </Field>

        <Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
          {([isSubmitting, canSubmit]) => (
            <div className="flex justify-between">
              <Button
                disabled={!canSubmit}
                onClick={handleSubmit}
                variant={"akmalmohtar"}
                className="w-[80px]"
              >
                {isSubmitting ? <LoadingSpinner /> : "Login"}
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
