'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState(null); // State awal null untuk cek login

  useEffect(() => {
    // Cek apakah user sudah login
    const loggedInUser = localStorage.getItem("username");
    if (!loggedInUser) {
      router.push("auth/login"); // Redirect ke login jika belum login
    } else {
      setUsername(loggedInUser); // Set username jika login
    }
  }, [router]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("username"); // Hapus data login dari localStorage
      router.push("auth/login"); // Redirect ke login
    }
  };

  // Tampilkan loading saat validasi login
  if (username === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="javascript:void(0)">BSS Parking Website</a>

          {/* Username dan tombol Logout */}
          <div className="d-flex align-items-center">
            <span
              className="me-3 text-white fw-bold"
              style={{ backgroundColor: "#343a40", padding: "5px 10px", borderRadius: "5px" }}
            >
              Welcome, {username}
            </span>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Konten Halaman */}
      <div className="container mt-5 text-center">
        <h1>Welcome to BSS Parking Website</h1>
        <p>
          Hello, <strong>{username}</strong>! You are logged in.
        </p>
      </div>
    </>
  );
}
