"use client"
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/providers/AuthProvider";
import SubmitButton from "../SubmitButton";
import { buttonVariants } from "@/components/ui/button";
const LoginForm = () => {
  const { handleUserLogin } = useAuth();
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleUserLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="company@domain.com"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="******"
              />
            </div>
            <div className="flex justify-end">
              <Link className={buttonVariants({
                variant: "link",
                size: "sm",
                className: "text-blue-600"
              })} href="/forgot-password">
                Forgot Password?
              </Link>
            </div>
            <SubmitButton title={"Login"} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="mt-2 text-xs text-center text-gray-700">
          Dont have an account?
          <Link href="/signup">
            <span className="text-blue-600"> Sign up</span>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
