import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { User, Mail, Lock } from "lucide-react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, setUser, updateUser, signInWithGoogle, user, loading } =
    useContext(AuthContext);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const num = /[0-9]/;
  const specialChar = /[^A-Za-z0-9]/;

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
          .post("http://localhost:3000/register", userInfo)
          .then(() => {
            setUser(user);
            toast.success("Login successful!");
            navigate("/");
          })
          .catch((err) => {
            // Even if backend save fails, we usually still let the user in
            console.error(err);
            setUser(user);
            navigate("/");
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
      setNameError("Name should be at least 5 characters");
      isValid = false;
    }

    if (!email.includes("@")) {
      setEmailError("Please provide a valid email");
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } else if (!lowerCase.test(password)) {
      setPasswordError("Password must contain a lowercase letter");
      isValid = false;
    } else if (!upperCase.test(password)) {
      setPasswordError("Password must contain an uppercase letter");
      isValid = false;
    } else if (!num.test(password)) {
      setPasswordError("Password must contain a number");
      isValid = false;
    } else if (!specialChar.test(password)) {
      setPasswordError("Password must contain a special character");
      isValid = false;
    }

    if (!isValid) return;

    createUser(email, password)
      .then((result) => {
        const createdUser = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            const userInfo = {
              name: name,
              email: email,
              photo: photo,
            };
            axios.post("http://localhost:3000/register", userInfo);

            setUser({ ...createdUser, displayName: name, photoURL: photo });
            toast.success("Registration successful!");
            navigate("/");
          })
          .catch((error) => {
            console.error(error);
            setUser(createdUser);
            navigate("/");
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-base-100 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-base-300">
        <div className="w-full md:w-1/2 bg-primary p-12 text-primary-content flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Join Us</h2>
            <p className="text-lg opacity-90">
              Register to get all the best games at the lowest price. Join our
              community today.
            </p>
          </div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-base-content">Register</h2>
            <p className="text-sm text-base-content/70 mt-2">
              Create your account
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered pl-10 w-full focus:input-primary bg-base-100"
                  required
                />
              </div>
              {nameError && (
                <p className="text-error text-xs mt-1">{nameError}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="photo"
                  placeholder="https://..."
                  className="input input-bordered w-full focus:input-primary bg-base-100"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  className="input input-bordered pl-10 w-full focus:input-primary bg-base-100"
                  required
                />
              </div>
              {emailError && (
                <p className="text-error text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered pl-10 w-full focus:input-primary bg-base-100"
                  required
                />
              </div>
              {passwordError && (
                <p className="text-error text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-lg mt-6"
            >
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleRegister}
            type="button"
            className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-base-200 hover:text-base-content"
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
            Continue with Google
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-base-content/70">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="link link-secondary font-bold hover:no-underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
