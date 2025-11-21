import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/auth.service";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import toast from "react-hot-toast";
import { handleApiError } from "../services/api";
import { validatePassword, validateEmail } from "../utils/validators";

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate" as "candidate" | "employer",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (formData.role === "employer" && !formData.company.trim()) {
      toast.error("Company name is required for employers");
      return;
    }

    setLoading(true);

    try {
      const user = await authService.register(formData);
      login(user);
      toast.success("Account created successfully!");
      navigate(
        user.role === "candidate" ? "/dashboard" : "/employer/dashboard",
      );
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Role Selection First */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, role: "candidate" })
                  }
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.role === "candidate"
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-2xl mb-2">👤</div>
                  <div className="font-medium">Candidate</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Looking for jobs
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "employer" })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.role === "employer"
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-2xl mb-2">🏢</div>
                  <div className="font-medium">Employer</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Hiring talent
                  </div>
                </button>
              </div>
            </div>

            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            {formData.role === "employer" && (
              <Input
                label="Company Name"
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
                placeholder="e.g., Acme Corporation"
              />
            )}

            <Input
              label="Email address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" loading={loading} className="w-full" size="lg">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};
