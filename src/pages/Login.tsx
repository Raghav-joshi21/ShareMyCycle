import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { scaleIn } from "../lib/motion";
import { TextReveal } from "../components/TextReveal";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      // Store user info in localStorage (mock auth)
      localStorage.setItem("user", JSON.stringify({ email, name: email.split("@")[0] }));
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-14 pb-12 px-4 flex items-center justify-center">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white font-bold shadow-lg text-lg">
              S
            </span>
            <span className="font-semibold text-xl text-text-primary">ShareMyCycle</span>
          </Link>
          <TextReveal as="h1" className="font-serif text-3xl md:text-4xl text-text-primary tracking-tight">
            Welcome Back
          </TextReveal>
          <p className="text-text-secondary mt-2">Sign in to your account to continue</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-surface rounded-xl shadow-md border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-text-primary mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all duration-200"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border bg-white accent-brand-blue cursor-pointer"
                />
                <span className="text-text-secondary">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-brand-blue link-hover font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-brand-blue hover:bg-brand-blue-dark text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-text-secondary">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2 px-4 border border-border rounded-lg text-text-primary font-medium hover:bg-surface-raised hover:scale-[1.02] transition-all duration-200">
              Google
            </button>
            <button className="py-2 px-4 border border-border rounded-lg text-text-primary font-medium hover:bg-surface-raised hover:scale-[1.02] transition-all duration-200">
              GitHub
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-text-secondary">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-brand-blue link-hover transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
