import { useMemo } from "react";

export type StrengthLevel = "Weak" | "Fair" | "Good" | "Strong" | "";

export interface PasswordCriterion {
  label: string;
  met: boolean;
}

interface PasswordStrengthResult {
  score: number;
  label: StrengthLevel;
  colorClass: string;
  criteria: PasswordCriterion[];
}

export function usePasswordStrength(password: string): PasswordStrengthResult {
  return useMemo(() => {
    const criteria: PasswordCriterion[] = [
      { label: "At least 8 characters", met: password.length >= 8 },
      { label: "One uppercase letter", met: /[A-Z]/.test(password) },
      { label: "One number", met: /[0-9]/.test(password) },
      { label: "One special character", met: /[^A-Za-z0-9]/.test(password) },
    ];

    if (!password) return { score: 0, label: "", colorClass: "bg-transparent", criteria };

    const score = criteria.filter((c) => c.met).length * 25;

    let label: StrengthLevel = "Weak";
    let colorClass = "bg-red-500";
    if (score > 25 && score <= 50) { label = "Fair"; colorClass = "bg-orange-500"; }
    else if (score > 50 && score <= 75) { label = "Good"; colorClass = "bg-yellow-500"; }
    else if (score > 75) { label = "Strong"; colorClass = "bg-green-500"; }

    return { score, label, colorClass, criteria };
  }, [password]);
}
