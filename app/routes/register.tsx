import { Form, redirect, Link, useActionData, useNavigation } from "react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdOutlineSync } from "react-icons/md";
import { registerSchema, validateForm } from "~/../lib/schemas";
import { apiClient } from "~/../lib/api-client";
import { Input } from "../components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { AuthCard, AuthHeader } from "~/components/ui/auth-card";

export async function action({ request }: { request: Request }) {
  const formData = Object.fromEntries(await request.formData());
  const validation = await validateForm(registerSchema, formData);

  if (!validation.success) {
    return { errors: validation.errors };
  }

  // Use the mock api to register
  await apiClient.register(validation.data);

  return redirect("/dashboard");
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const actionData = useActionData<typeof action>();
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

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
    const fieldSchema = registerSchema.shape[name as keyof typeof registerSchema.shape];
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

  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
  }, [password]);

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-orange-500";
    if (passwordStrength <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };
  const getStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

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
          {password && !errors?.password && (
            <div className="mt-2 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Password strength</span>
                <span className="font-medium text-gray-700">{getStrengthText()}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex gap-0.5">
                {[25, 50, 75, 100].map((step) => (
                  <div 
                    key={step} 
                    className={`h-full flex-1 transition-colors duration-300 ${
                      passwordStrength >= step ? getStrengthColor() : "bg-transparent"
                    }`} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
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
