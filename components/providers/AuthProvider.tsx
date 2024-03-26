"use client";

import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { AuthType } from "@/types/types";

import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
    user: AuthType | null;
    loading: boolean;
    handleUserSignup: (formData: FormData) => void;
    handleUserLogin: (formData: FormData) => void;
    handleSignOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
    const router = useRouter()

    const [user, setUser] = useState<AuthType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log("userCookies", user)
        const userC = getCookie('user')
        console.log("userCookies", userC)

        // if (session?.user) {
        //   setUser(session.user);
        // }
    }, [user]);

    const handleUserSignup = async (formData: FormData) => {
        try {
            const name = formData.get("name")?.toString() || "";
            const role = formData.get("role")?.toString() || "";
            const email = formData.get("email")?.toString() || "";
            const phone = formData.get("phone")?.toString() || "";
            const password = formData.get("password")?.toString() || "";

            if (!name || name.toString().length <= 2 || !role || !email || !email.toString().includes("@") || !phone || !password) {
                return toast({
                    variant: "destructive",
                    title: "Signup Error",
                    description: "Please enter valid details for all fields.",
                });
            }

            // Construct user data object
            const userData = {
                name,
                role,
                email,
                phone,
                password
            };

            const response = await axios.post("http://localhost:4000/auth/signup", userData);

            if (response.data.user) {
                return toast({
                    title: "Success",
                    description: "Signup successfully.",
                });
            } else if (response.data.message === "user already exists") {
                return toast({
                    variant: "destructive",
                    title: "Signup Error",
                    description: "User already exists.",
                });
            }
        } catch (error) {
            return toast({
                variant: "destructive",
                title: "Signup Error",
                description: "An error occurred during signup.",
            });
        }
    };

    const handleUserLogin = async (formData: FormData) => {
        try {
            const email = formData.get("email")?.toString() || "";
            const password = formData.get("password")?.toString() || "";

            if (!email.includes("@") || !password) {
                return toast({
                    variant: "destructive",
                    title: "Invalid email or password.",
                });
            }

            const userCred = {
                email: email,
                password: password,
            };

            const userRes = await axios.post("http://localhost:4000/auth/login", userCred);
            const userData = userRes.data;

            if (userData.user && userData.valid) {
                setUser(userData.user);

                const expiresDate = new Date();
                expiresDate.setDate(expiresDate.getDate() + 1);

                setCookie('user', userData.user, { expires: expiresDate });
                router.push("/dashboard");
                // Redirect to dashboard or perform any other action
            } else {
                return toast({
                    variant: "destructive",
                    title: "Invalid email or password.",
                });
            }
        } catch (error) {
            return toast({
                variant: "destructive",
                title: "An error occurred during login.",
            });
        }
    };


    const handleSignOut = useCallback(async () => {
        try {
            deleteCookie('user');
            setUser(null as any);
            toast({
                className: "bg-black text-white",
                title: "Success",
                description: "Logout successfully!",
            });
        } catch (error) {
            console.log("error", error);
            toast({
                variant: "destructive",
                title: "Something went wrong!",
            });
        }
    }, [toast]);


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                handleUserSignup,
                handleUserLogin,
                handleSignOut,

            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export function useAuth() {
    const context = useContext(AuthContext);
    if (context == undefined) {
        throw new Error("component and page must be inside the provider");
    }
    return context;
}
