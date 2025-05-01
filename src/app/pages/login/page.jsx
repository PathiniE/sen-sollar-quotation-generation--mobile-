"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import MobileOnly from "@/app/components/MobileOnly";
import logo from "../../../../public/login/LOGO.png";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Password validation
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // Simulate login
    setTimeout(() => {
      // In a real app, you would call an API here
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Wade Warren",
          email: email,
          avatar: "/avatar.png",
        })
      );
      router.push("/pages/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <MobileOnly>
      <div className="flex min-h-screen flex-col bg-white">
        <div className="flex flex-col flex-grow items-center justify-center p-4">
          <div className="w-full max-w-sm space-y-6">
            <div className="flex flex-col items-center justify-center">
              <Image src={logo} alt="SEN Solar Logo" width={200} height={200} />
              <h1 className="text-3xl font-semibold text-center text-[#163300] mt-4">
                Login
              </h1>
              <p className="text-sm text-center text-[#163300] mt-2">
                Enter your email below to login to your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-xs text-[#163300] hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                className="w-full h-10 mt-1 bg-[#9FE870] text-[#163300]"
              >
                Login
              </Button>
            </form>
          </div>
        </div>

        <div className="text-xs text-center text-[#163300] mb-4 py-2 w-full">
          © SEN SOLAR - All Rights Reserved.
        </div>
      </div>
    </MobileOnly>
  );
}
