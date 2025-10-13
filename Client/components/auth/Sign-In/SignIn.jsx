"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { memo, useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderFive } from "@/components/ui/loader";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

function SignInComponent({ className, ...props }) {

    const { theme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    const router = useRouter()

    const { data: session, isPending, error } = authClient.useSession()

    const currentTheme = theme === "system" ? systemTheme : theme
    const logoSrc =
        currentTheme === "light"
            ? "/pixelpilot-black-word.svg"
            : "/pixelpilot-white-word.svg"
    useEffect(() => setMounted(true), [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    })
    const onSubmit = async (data) => {
        try {
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
                callbackURL: "/",
                rememberMe: false
            }, {
                onRequest: (ctx) => {
                    toast.loading("Signing in...");
                    return ctx
                },
                onSuccess: (ctx) => {
                    toast.dismiss()
                    toast.success("Logged in successfully", { closeButton: true });
                },
                onError: (ctx) => {
                    toast.dismiss()
                    toast.error(ctx.error.message);
                },
            })
        } catch (err) {
            toast.error(err.message);
            console.error(err);
        }
    };

    useEffect(() => {
        if (session) {
            router.replace("/")
        }
    }, [session])

    if (session) {
        return <div className="text-center"><LoaderFive text={"Refreshing..."} /></div>
    }
    if (isPending) {
        return <div className="text-center"><LoaderFive text={"Loading..."} /></div>
    }

    if (error) {
        return <div className="text-center">{error.message}</div>
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <div>
                    <div className="flex items-center justify-center">
                        {mounted &&
                            <img
                                src={logoSrc}
                                alt="logo"
                                priority="true"
                                className="h-[56px] w-auto"
                            />
                        }
                    </div>
                </div>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <FieldError>{errors.email.message}</FieldError>
                                )}
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <FieldError>{errors.password.message}</FieldError>
                                )}
                            </Field>

                            <Field>
                                <Button type="submit">Login</Button>
                                <Button variant="outline" type="button">
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href="/auth/sign-up">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export const SignIn = memo(SignInComponent)
