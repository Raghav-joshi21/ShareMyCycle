import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-[#FCF6D9]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#DDBA7D] text-slate-900 font-bold shadow-lg text-lg">
              S
            </span>
            <span className="font-semibold text-xl text-slate-900">ShareMyCycle</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your account to continue</p>
        </motion.div>

        {/* Login Form Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 border border-[#E4D6A8]"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#E4D6A8] bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DDBA7D] focus:border-transparent transition-all"
              />
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#E4D6A8] bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DDBA7D] focus:border-transparent transition-all"
              />
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div variants={itemVariants} className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#E4D6A8] bg-slate-50 accent-[#DDBA7D] cursor-pointer"
                />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-[#DDBA7D] hover:text-[#C9A570] font-medium transition-colors">
                Forgot password?
              </Link>
            </motion.div>

            {/* Login Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#DDBA7D] to-[#D4A870] text-slate-900 font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6"
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
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E4D6A8]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-600">Or continue with</span>
            </div>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
            <button className="py-2 px-4 border border-[#E4D6A8] rounded-lg text-slate-900 font-medium hover:bg-slate-50 transition-colors">
              Google
            </button>
            <button className="py-2 px-4 border border-[#E4D6A8] rounded-lg text-slate-900 font-medium hover:bg-slate-50 transition-colors">
              GitHub
            </button>
          </motion.div>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <p className="text-slate-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-[#DDBA7D] hover:text-[#C9A570] transition-colors">
              Sign up here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
