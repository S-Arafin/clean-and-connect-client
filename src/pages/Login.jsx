import React, { use, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Leaf,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const from = location.state?.from?.pathname || "/";
  const { signIn, signInWithGoogle, resetPass, user, loading } =
    use(AuthContext);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }
    resetPass(email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        toast.error("Failed to send reset email. Verify your address.");
      });
  };

  const handleDemoLogin = () => {
    setIsLoggingIn(true);
    signIn("demo@email.com", "@12345")
      .then(() => {
        toast.success("Welcome, Demo User!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        setIsLoggingIn(false);
        toast.error("Demo access currently unavailable.");
      });
  };

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        axios
          .post(
            "https://clean-and-connect-server.vercel.app/register",
            userInfo
          )
          .then(() => {
            toast.success("Welcome back, Volunteer!");
            navigate(from, { replace: true });
          })
          .catch(() => {
            toast.success("Welcome back!");
            navigate(from, { replace: true });
          })
          .finally(() => setIsLoggingIn(false));
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoggingIn(false);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setIsLoggingIn(true);

    const email = emailRef.current.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setIsLoggingIn(false);
        const errorMessage = error.message;
        if (errorMessage.includes("user-not-found")) {
          setEmailError("Account not found.");
        } else if (
          errorMessage.includes("wrong-password") ||
          errorMessage.includes("invalid-credential")
        ) {
          setPasswordError("Incorrect password.");
        } else {
          toast.error("Invalid credentials.");
        }
      });
  };

  if (loading && !isLoggingIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="loading loading-spinner loading-lg text-primary"
        ></motion.span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-10 px-4 overflow-hidden relative font-sans">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full bg-base-100 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col md:flex-row border border-base-300 z-10"
      >
        <div className="w-full md:w-5/12 bg-gradient-to-br from-primary via-primary/90 to-accent p-12 text-primary-content flex flex-col justify-between relative">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="relative z-10">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="flex items-center gap-2 mb-12"
            >
              <h1 className="text-3xl font-black tracking-tighter">C&C</h1>
            </motion.div>
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Welcome Back to C&C
            </h2>
            <p className="text-lg opacity-85 leading-relaxed">
              Sign in to track your reported issues, manage contributions, and
              keep our community clean and connected.
            </p>
          </div>

          <div className="relative z-10 space-y-5">
            {[
              "Track Issue Status",
              "Download Impact Reports",
              "Connect with Neighbors",
            ].map((text, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                key={i}
                className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5"
              >
                <CheckCircle className="text-white w-5 h-5" />
                <span className="text-sm font-bold tracking-wide">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-16 bg-base-100 flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-4xl font-black text-base-content tracking-tight">
              Login
            </h2>
            <p className="text-base-content/50 mt-2 font-medium">
              Please enter your details to continue.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mb-8 p-4 bg-secondary/10 border border-secondary/20 rounded-2xl flex items-center justify-between group cursor-pointer"
            onClick={handleDemoLogin}
          >
            <div className="flex items-center gap-3">
              <div className="bg-secondary text-secondary-content p-2 rounded-xl">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-secondary uppercase tracking-wider">
                  Portfolio Demo
                </p>
                <p className="text-xs font-bold opacity-60">
                  Click here to auto-login as a Guest
                </p>
              </div>
            </div>
            <ArrowRight
              size={20}
              className="text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
            />
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="form-control">
              <label className="label-text font-bold mb-2 ml-1 opacity-70 uppercase text-xs tracking-widest">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  ref={emailRef}
                  name="email"
                  placeholder="arafin23103@gmail.com"
                  className="input input-bordered w-full pl-12 h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl font-medium text-base-content"
                  required
                />
              </div>
              {emailError && (
                <p className="text-error text-[11px] mt-1 font-black uppercase ml-2 tracking-tighter">
                  {emailError}
                </p>
              )}
            </div>

            <div className="form-control">
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="label-text font-bold opacity-70 uppercase text-xs tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full px-12 h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl font-medium text-base-content"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-all"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-error text-[11px] mt-1 font-black uppercase ml-2 tracking-tighter">
                  {passwordError}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoggingIn}
              className="btn btn-primary w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 border-none text-primary-content"
            >
              {isLoggingIn ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <LogIn size={20} />
                </span>
              )}
            </motion.button>
          </form>

          <div className="divider my-8 opacity-50 font-black text-[10px] tracking-[0.2em] uppercase">
            Or Continue With
          </div>

          <motion.button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            whileHover={{
              y: -2,
              backgroundColor: "var(--fallback-b2,oklch(var(--b2)))",
            }}
            className="btn btn-outline border-base-300 w-full h-14 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue With Google
          </motion.button>

          <p className="text-center mt-10 text-sm font-bold text-base-content/60">
            Don't have an account?
            <Link
              to="/auth/register"
              className="text-secondary font-black hover:underline ml-2 inline-flex items-center gap-1 group"
            >
              Register{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </p>
        </div>
      </motion.div>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={3000}
      />
    </div>
  );
};

export default Login;
