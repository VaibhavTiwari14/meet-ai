"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircleIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderIcon,
  OctagonAlertIcon,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Enhanced password validation schema
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character"
  );

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters")
      .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
    email: z.email("Please enter a valid email address"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Password strength calculator
const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[a-z]/.test(password)) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 12.5;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;
  return Math.min(strength, 100);
};

// Password strength indicator component
const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const strength = calculatePasswordStrength(password);
  const getStrengthText = () => {
    if (strength < 25) return "Very Weak";
    if (strength < 50) return "Weak";
    if (strength < 75) return "Good";
    return "Strong";
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between text-xs">
        <span>Password strength</span>
        <span
          className={`font-medium ${
            strength >= 75
              ? "text-green-600"
              : strength >= 50
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {getStrengthText()}
        </span>
      </div>
      <Progress value={strength} className="h-2" />
    </div>
  );
};

// Social auth button component
const SocialAuthButton = ({
  provider,
  pending,
  onClick,
}: {
  provider: "google" | "github";
  pending: boolean;
  onClick: () => void;
}) => {
  const icons = {
    google: (
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
    github: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      disabled={pending}
      onClick={onClick}
    >
      {pending ? (
        <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <span className="mr-2">{icons[provider]}</span>
      )}
      {provider === "google" ? "Google" : "GitHub"}
    </Button>
  );
};

type FormData = z.infer<typeof formSchema>;

const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [socialPending, setSocialPending] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    mode: "onChange",
  });

  const watchedPassword = form.watch("password");

  // Memoized password requirements checker
  const passwordRequirements = useMemo(() => {
    const password = watchedPassword || "";
    return [
      { text: "At least 8 characters", met: password.length >= 8 },
      { text: "One lowercase letter", met: /[a-z]/.test(password) },
      { text: "One uppercase letter", met: /[A-Z]/.test(password) },
      { text: "One number", met: /[0-9]/.test(password) },
      { text: "One special character", met: /[^a-zA-Z0-9]/.test(password) },
    ];
  }, [watchedPassword]);

  const handleFormSubmit = useCallback(
    async (data: FormData) => {
      setError(null);
      setPending(true);

      try {
        await authClient.signUp.email(
          {
            email: data.email,
            password: data.password,
            name: data.name,
          },
          {
            onSuccess: () => {
              setPending(false);
              router.push("/");
            },
            onError: ({ error }) => {
              setPending(false);
              setError(error.message || "An unexpected error occurred");
            },
          }
        );
      } catch (err) {
        setPending(false);
        setError("Network error. Please try again.");
      }
    },
    [router]
  );

  const handleSocialAuth = useCallback(
    async (provider: "google" | "github") => {
      setError(null);
      setSocialPending(provider);

      try {
        await authClient.signIn.social({
          provider,
          callbackURL: "/",
        });
      } catch (err) {
        setSocialPending(null);
        setError(`Failed to sign in with ${provider}. Please try again.`);
      }
    },
    []
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden shadow-lg p-0">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            {/* Form Section */}
            <div className="p-6 md:p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleFormSubmit)}
                  className="space-y-4"
                >
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">
                      Create your account
                    </h1>
                    <p className="text-muted-foreground text-sm mt-2">
                      Join thousands of users and get started today
                    </p>
                  </div>

                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your full name"
                            autoComplete="name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a secure password"
                              autoComplete="new-password"
                              className="pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <EyeOffIcon className="h-4 w-4" />
                              ) : (
                                <EyeIcon className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                        <PasswordStrengthIndicator password={watchedPassword} />

                        {/* Password Requirements */}
                        {watchedPassword && (
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground mb-1">
                              Password requirements:
                            </p>
                            <div className="space-y-1">
                              {passwordRequirements.map((req, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-xs"
                                >
                                  {req.met ? (
                                    <CheckCircleIcon className="h-3 w-3 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <XCircleIcon className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <span
                                    className={
                                      req.met
                                        ? "text-green-600"
                                        : "text-muted-foreground"
                                    }
                                  >
                                    {req.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              autoComplete="new-password"
                              className="pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={toggleConfirmPasswordVisibility}
                            >
                              {showConfirmPassword ? (
                                <EyeOffIcon className="h-4 w-4" />
                              ) : (
                                <EyeIcon className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Error Alert */}
                  {error && (
                    <Alert variant="destructive">
                      <OctagonAlertIcon className="h-4 w-4" />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full mt-6"
                    disabled={pending}
                  >
                    {pending ? (
                      <>
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Auth Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <SocialAuthButton
                      provider="google"
                      pending={socialPending === "google"}
                      onClick={() => handleSocialAuth("google")}
                    />
                    <SocialAuthButton
                      provider="github"
                      pending={socialPending === "github"}
                      onClick={() => handleSocialAuth("github")}
                    />
                  </div>

                  {/* Sign In Link */}
                  <div className="text-center text-sm mt-6">
                    Already have an account?{" "}
                    <Link
                      href="/sign-in"
                      className="font-semibold text-primary hover:underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </div>
                </form>
              </Form>
            </div>

            {/* Brand Section */}
            <div className="relative hidden bg-radial from-sidebar-accent to-sidebar md:flex flex-col items-center justify-center p-8">
              <div className="text-center space-y-6">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <Image
                    src="/logo2.svg"
                    alt="Meet.AI Logo"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-white">Meet.AI</h2>
                  <p className="text-green-100 text-sm max-w-xs leading-relaxed">
                    Connect, collaborate, and create with AI-powered meetings
                  </p>
                </div>
                <div className="flex items-center justify-center gap-4 text-green-200 text-xs">
                  <div className="flex items-center gap-1">
                    <CheckCircleIcon className="h-3 w-3" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircleIcon className="h-3 w-3" />
                    <span>Fast</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircleIcon className="h-3 w-3" />
                    <span>Reliable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Privacy */}
      <div className="text-center text-xs text-muted-foreground">
        By creating an account, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default SignUpView;
