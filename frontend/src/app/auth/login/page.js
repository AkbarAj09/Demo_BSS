"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });
      localStorage.setItem("username", response.data.username);
      setMessage(`Welcome, ${response.data.username}`);
      router.push("/"); // Redirect ke halaman utama
    } catch (error) {
      setMessage("Login failed: Invalid username or password");
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
            <h1 className="h4 text-gray-900 text-center">Welcome Back!</h1>
            <hr />
            <h2 className="h5 text-gray-900 text-center">Login an Account</h2>
            <form onSubmit={handleLogin} className="user">
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
                Login
              </button>
            </form>
            {message && (
              <p className="text-danger text-center mt-3">{message}</p>
            )}
            <hr />
            <div className="text-center">
              <p>Don't have an account yet?<a href="/auth/register" className="small"> Create Account</a></p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
