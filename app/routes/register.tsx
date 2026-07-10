import { Form, redirect, Link, useActionData, useNavigation } from "react-router";
import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdOutlineSync } from "react-icons/md";
import { registerSchema, validateForm } from "~/../lib/schemas";
import { apiClient } from "~/../lib/api-client";
import { Input } from "../components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { AuthCard, AuthHeader } from "~/components/ui/auth-card";
import { useFormValidation } from "~/../lib/hooks/use-form-validation";
import { usePasswordStrength } from "~/../lib/hooks/use-password-strength";

export function meta() {
  return [
    { title: "Create Account | Trove Finance" },
    { name: "description", content: "Create a new Trove wealth account." }
  ];
}

export async function action({ request }: { request: Request }) {
  const formData = Object.fromEntries(await request.formData());
  const validation = await validateForm(registerSchema, formData);

  if (!validation.success) {
    return { errors: validation.errors };
  }

  await apiClient.register(validation.data);

  return redirect("/dashboard");
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const actionData = useActionData<typeof action>();
  const { localErrors, setLocalErrors, handleBlur, focusFirstInvalid, formRef, validateField } = useFormValidation(registerSchema);
  const { score: passwordStrength, label: strengthLabel, colorClass: strengthColor, criteria } = usePasswordStrength(password);

  const errors = { ...localErrors, ...(actionData?.errors || {}) };

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isWeakPassword = password.length > 0 && passwordStrength <= 50;

  // Focus management on error
  focusFirstInvalid(actionData?.errors);

  return (
    <AuthCard>
      <AuthHeader title="Create an account" subtitle="Get started with Trove today" />

      <Form className="space-y-5" method="POST" ref={formRef}>
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="John Doe"
            error={errors?.name}
            disabled={isSubmitting}
            onBlur={handleBlur}
          />
        </div>

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
              autoComplete="new-password"
              required
              placeholder="Create a password"
              className="pr-10"
              error={errors?.password}
              disabled={isSubmitting}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (localErrors.password) validateField(e.target.name, e.target.value);
              }}
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
          {password && (
            <div className="mt-3 space-y-2.5">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-500 font-medium">Password strength</span>
                <span className={`font-semibold text-[11px] ${strengthColor.replace("bg-", "text-")}`}>{strengthLabel}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex gap-0.5">
                {[25, 50, 75, 100].map((step) => (
                  <div
                    key={step}
                    className={`h-full flex-1 transition-colors duration-300 ${
                      passwordStrength >= step ? strengthColor : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
              <ul className="space-y-1 pt-0.5">
                {criteria.map((c) => (
                  <li key={c.label} className={`flex items-center gap-1.5 text-[11px] transition-colors ${c.met ? "text-green-600" : "text-gray-400"}`}>
                    <span className="shrink-0">{c.met ? "✓" : "○"}</span>
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || isWeakPassword || !!errors.password || !!errors.email || !!errors.name}
            className="w-full cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            {isSubmitting && <MdOutlineSync className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </div>

        <div className="border-t border-border/60 my-6" />

        <div className="text-center space-y-4">
          <p className="text-xs text-gray-400 font-normal">Already have an account?</p>
          <Link to="/login">
            <Button type="button" variant="secondary" className="w-full" disabled={isSubmitting}>
              Sign in
            </Button>
          </Link>
        </div>
      </Form>
    </AuthCard>
  );
}
