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
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LoaderFive } from "@/components/ui/loader";

const formSchema = z.object({
    name: z.string(),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    email: z.string().email(),
    password: z.string().min(6),
})

function SignUpComponent({ className, ...props }) {

    const { theme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    const { data: session, isPending, error } = authClient.useSession()

    useEffect(() => setMounted(true), [])
    const currentTheme = theme === "system" ? systemTheme : theme
    const logoSrc =
        currentTheme === "light"
            ? "/pixelpilot-black-word.svg"
            : "/pixelpilot-white-word.svg"

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data) => {
        try {
            await authClient.signUp.email({
                name: data.name,
                phone: data.phone,
                email: data.email,
                password: data.password,
            }, {
                onRequest: (ctx) => {
                    toast.loading("Creating account...");
                    return ctx
                },
                onSuccess: (ctx) => {
                    toast.dismiss()
                    toast.success("Account created successfully", { closeButton: true });
                    router.replace("/auth/sign-in")
                },
                onError: (ctx) => {
                    toast.dismiss()
                    toast.error(ctx.error.message);
                },
            });
        } catch (error) {
            toast.error(error.message, { closeButton: true });
            console.error("Error:", error);
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
                <CardHeader>
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
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="John Doe"
                                    required
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <FieldError>{errors.name.message}</FieldError>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+91 1234567890"
                                    required
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <FieldError>{errors.phone.message}</FieldError>
                                )}
                            </Field>
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
                                <FieldLabel htmlFor="password">Password</FieldLabel>
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
                                <div>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Button type="submit">Login</Button>
                                <Button variant="outline" type="button">
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href="/auth/sign-in">Sign In</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export const SignUp = memo(SignUpComponent)
