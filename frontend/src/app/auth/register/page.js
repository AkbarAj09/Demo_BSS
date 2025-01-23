"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import router dari Next.js
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long."); // Validasi password
      return;
    }
    try {
      await axios.post("http://localhost:8080/register", {
        username,
        password,
      });
      setMessage("User registered successfully!");
      setTimeout(() => router.push("login"), 1000); // Redirect ke login setelah 2 detik
    } catch (error) {
      setMessage("Failed to register user.");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setInputType("text");
    setTimeout(() => setInputType("password"), 1000); // Masking kembali ke password setelah 1 detik
  };

  return (
    <div className="bg-gradient-primary" style={{ minHeight: "100vh" }}>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="card shadow-lg border-0" style={{ width: "400px" }}>
          <div className="card-body">
            <h1 className="h4 text-gray-900 text-center">Welcome to BSS Parking</h1>
            <hr />
            <h2 className="h5 text-gray-900 text-center">Register Account</h2>
            <form onSubmit={handleRegister} className="user">
              <div className="form-group mb-3">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-control form-control-user"
                  aria-label="Enter your username"
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type={inputType}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="form-control form-control-user"
                  aria-label="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-user btn-block mb-3"
              >
                Register
              </button>
            </form>
            {message && (
              <p className="text-danger text-center mt-3">{message}</p>
            )}
            <hr />
            <div className="text-center">
              <p>
                Already have an account?{" "}
                <a href="/auth/login" className="small">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
