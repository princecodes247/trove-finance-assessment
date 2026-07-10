import { useState, useEffect, useRef } from "react";
import type { ZodSchema } from "zod";

export function useFormValidation<TSchema extends ZodSchema>(schema: TSchema) {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string) => {
    const shape = (schema as any).shape;
    const fieldSchema = shape?.[name];
    if (!fieldSchema) return;

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
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const focusFirstInvalid = (actionErrors: Record<string, string> | undefined) => {
    if (actionErrors && Object.keys(actionErrors).length > 0 && formRef.current) {
      const firstInvalidInput = formRef.current.querySelector('[aria-invalid="true"]');
      if (firstInvalidInput instanceof HTMLElement) {
        firstInvalidInput.focus();
      }
    }
  };

  return { localErrors, setLocalErrors, validateField, handleBlur, focusFirstInvalid, formRef };
}
