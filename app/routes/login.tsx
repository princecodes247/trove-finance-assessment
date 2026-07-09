import { Form, redirect, Link, useActionData, useNavigation, useSubmit } from "react-router";
import { useState, useEffect, useRef } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdOutlineSync } from "react-icons/md";
import { loginSchema, validateForm } from "~/../lib/schemas";
import { apiClient } from "~/../lib/api-client";
import { Input } from "../components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { AuthCard, AuthHeader } from "~/components/ui/auth-card";

export async function action({ request }: { request: Request }) {
  const formData = Object.fromEntries(await request.formData());
  const validation = await validateForm(loginSchema, formData);

  if (!validation.success) {
    return { errors: validation.errors };
  }

  // Use the mock api to login
  await apiClient.login(validation.data);

  return redirect("/dashboard");
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const actionData = useActionData<typeof action>();
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  
  // Merge action errors with local errors, giving priority to action errors if present (usually local handles it though)
  const errors = { ...localErrors, ...(actionData?.errors || {}) };
  
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Focus management on error
  useEffect(() => {
    if (actionData?.errors && Object.keys(actionData.errors).length > 0 && formRef.current) {
      const firstInvalidInput = formRef.current.querySelector('[aria-invalid="true"]');
      if (firstInvalidInput instanceof HTMLElement) {
        firstInvalidInput.focus();
      }
    }
  }, [actionData]);

  // Progressive client-side validation
  const validateField = (name: string, value: string) => {
    const fieldSchema = loginSchema.shape[name as keyof typeof loginSchema.shape];
    if (fieldSchema) {
      const result = fieldSchema.safeParse(value);
      if (!result.success) {
        setLocalErrors((prev) => ({ ...prev, [name]: result.error.issues[0].message }));
      } else {
        setLocalErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField(e.target.name, e.target.value);
  };


  return (
    <AuthCard>
      <AuthHeader title="Welcome back" subtitle="Sign in to your account" />

      <Form className="space-y-5" method="POST" ref={formRef}>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@example.com"
            error={errors?.email}
            disabled={isSubmitting}
            onBlur={handleBlur}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="pr-10"
              error={errors?.password}
              disabled={isSubmitting}
              onBlur={handleBlur}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
              className="absolute right-3 top-[22px] -translate-y-1/2 text-text-neutral hover:text-text-default transition-colors p-1 disabled:opacity-50"
            >
              {showPassword ? <MdOutlineVisibilityOff className="w-4 h-4" /> : <MdOutlineVisibility className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            {isSubmitting && <MdOutlineSync className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        <div className="text-center pt-2">
          <Link to="#" className="text-xs font-medium text-[#005F54] hover:text-[#004d44] transition-colors">
            Forgot password?
          </Link>
        </div>

        <div className="border-t border-border/60 my-6" />

        <div className="text-center space-y-4">
          <p className="text-xs text-gray-400 font-normal">Don't have an account?</p>
          <Link to="/register">
            <Button type="button" variant="secondary" className="w-full" disabled={isSubmitting}>
              Create a Trove account
            </Button>
          </Link>
        </div>
      </Form>
    </AuthCard>
  );
}
