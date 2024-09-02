"use client";

import React, { FormEvent, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const loginPayload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    console.log("🚀 ~ handleLogin ~ loginPayload:", loginPayload);
  };

  return (
    <motion.form
      onSubmit={handleLogin}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 80, opacity: 1 }}
      transition={{ ease: "easeIn" }}
    >
      <Card className="w-[400px] space-y-4">
        <div>
          <Label>Email</Label>
          <Input type="email" ref={emailRef} />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" ref={passwordRef} />
        </div>
        <Button type="submit" variant={"akmalmohtar"}>
          Login
        </Button>
      </Card>
    </motion.form>
  );
}
