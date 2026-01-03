import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Image,
  Eye,
  EyeOff,
  Leaf,
  ShieldCheck,
  Check,
} from "lucide-react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, setUser, updateUser, signInWithGoogle, user, loading } =
    useContext(AuthContext);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passValue, setPassValue] = useState("");

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const num = /[0-9]/;
  const specialChar = /[^A-Za-z0-9]/;

  const calculateStrength = () => {
    let strength = 0;
    if (passValue.length >= 6) strength++;
    if (upperCase.test(passValue)) strength++;
    if (num.test(passValue)) strength++;
    if (specialChar.test(passValue)) strength++;
    return strength;
  };

  const handleGoogleRegister = () => {
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
            setUser(user);
            toast.success("Welcome aboard!");
            navigate("/");
          })
          .catch(() => {
            setUser(user);
            navigate("/");
          });
      })
      .catch((error) => toast.error(error.message));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    let isValid = true;
    if (name.length < 5) {
      setNameError("Minimum 5 characters required");
      isValid = false;
    }
    if (!email.includes("@")) {
      setEmailError("Invalid email format");
      isValid = false;
    }
    if (calculateStrength() < 3) {
      setPasswordError("Password is too weak");
      isValid = false;
    }

    if (!isValid) return;

    createUser(email, password)
      .then((result) => {
        const createdUser = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            axios.post("https://clean-and-connect-server.vercel.app/register", {
              name,
              email,
              photo,
            });
            setUser({ ...createdUser, displayName: name, photoURL: photo });
            toast.success("Registration Successful!");
            navigate("/");
          })
          .catch(() => {
            setUser(createdUser);
            navigate("/");
          });
      })
      .catch((error) => toast.error(error.message));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="loading loading-spinner loading-lg text-primary"
        ></motion.span>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-10 px-4 overflow-hidden relative">
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full bg-base-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-base-300 z-10"
      >
        <div className="w-full md:w-5/12 bg-gradient-to-br from-primary via-primary/90 to-accent p-12 text-primary-content flex flex-col justify-between relative">
          <div className="relative z-10">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="flex items-center gap-2 mb-10"
            >
              <h1 className="text-3xl font-black tracking-tighter">
                Clean & Connect
              </h1>
            </motion.div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Start Your Impact Journey
            </h2>
            <p className="text-lg opacity-80 leading-relaxed">
              Join thousands of citizens taking real action to fix our
              environment. One report, one repair, one cleaner world.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            {["100% Transparent", "Community Verified", "Instant Updates"].map(
              (text, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  key={i}
                  className="flex items-center gap-3"
                >
                  <div className="bg-white/20 p-1 rounded-full">
                    <Check size={14} />
                  </div>
                  <span className="text-sm font-semibold">{text}</span>
                </motion.div>
              )
            )}
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-14 bg-base-100">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl font-black text-base-content">
              Create Account
            </h2>
            <p className="text-base-content/50 mt-2">
              Join the movement for a cleaner tomorrow.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label-text font-bold mb-2 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Sultanul Arafin"
                    className="input input-bordered w-full pl-12 h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl"
                    required
                  />
                </div>
                {nameError && (
                  <p className="text-error text-[10px] mt-1 font-bold uppercase ml-2">
                    {nameError}
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label-text font-bold mb-2 ml-1">
                  Photo URL
                </label>
                <div className="relative">
                  <Image
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30"
                    size={18}
                  />
                  <input
                    type="text"
                    name="photo"
                    placeholder="Avatar link"
                    className="input input-bordered w-full pl-12 h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-control">
              <label className="label-text font-bold mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="arafin@example.com"
                  className="input input-bordered w-full pl-12 h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl"
                  required
                />
              </div>
              {emailError && (
                <p className="text-error text-[10px] mt-1 font-bold uppercase ml-2">
                  {emailError}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="label-text font-bold mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={passValue}
                  onChange={(e) => setPassValue(e.target.value)}
                  placeholder="••••••••"
                  className="input input-bordered w-full px-12 h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex gap-1 mt-3 px-1">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      calculateStrength() >= s
                        ? calculateStrength() <= 2
                          ? "bg-error"
                          : "bg-success"
                        : "bg-base-300"
                    }`}
                  />
                ))}
              </div>
              {passwordError && (
                <p className="text-error text-[10px] mt-1 font-bold uppercase ml-2">
                  {passwordError}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 mt-4 border-none"
            >
              <ShieldCheck className="mr-2" size={20} /> Create Account
            </motion.button>
          </form>

          <div className="divider my-8 opacity-50 font-bold text-xs">
            OR CONTINUE WITH
          </div>

          <motion.button
            onClick={handleGoogleRegister}
            whileHover={{
              backgroundColor: "var(--fallback-b2,oklch(var(--b2)))",
            }}
            className="btn btn-outline border-base-300 w-full h-14 rounded-2xl flex items-center gap-3 font-bold transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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

          <p className="text-center mt-10 text-sm font-medium text-base-content/60">
            Member of C&C?{" "}
            <Link
              to="/auth/login"
              className="text-secondary font-black hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        pauseOnHover={false}
      />
    </div>
  );
};

export default Register;
