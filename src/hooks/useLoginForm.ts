import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormErrors {
  email?: string;
  password?: string;
  generic?: string;
}

export function useLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const localErrors: FormErrors = {};

    if (!email) {
      localErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      localErrors.email = "Invalid email format.";
    }

    if (!password) {
      localErrors.password = "Password is required.";
    } else if (password.length < 6) {
      localErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors); // Map field-specific API errors instantly
        } else {
          setErrors({ generic: data.message || "Authentication failed." });
        }
        return;
      }

      router.push("/users");
    } catch {
      setErrors({ generic: "Network error. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    handleLoginSubmit,
  };
}
