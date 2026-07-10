import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema, validateForm } from "~/../../lib/schemas";

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "short",
    });
    expect(result.success).toBe(false);
  });

  it("trims email whitespace", () => {
    const result = loginSchema.safeParse({
      email: "  test@example.com  ",
      password: "password123",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("test@example.com");
    }
  });
});

describe("registerSchema", () => {
  it("accepts valid registration data", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "SecureP@ss1",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name with less than 2 characters", () => {
    const result = registerSchema.safeParse({
      name: "J",
      email: "john@example.com",
      password: "securepass1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing fields", () => {
    const result = registerSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("validateForm", () => {
  it("returns success with parsed data for valid input", async () => {
    const result = await validateForm(loginSchema, {
      email: "test@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("test@example.com");
    }
  });

  it("returns field errors for invalid input", async () => {
    const result = await validateForm(loginSchema, {
      email: "bad",
      password: "hi",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toHaveProperty("email");
      expect(result.errors).toHaveProperty("password");
    }
  });
});
