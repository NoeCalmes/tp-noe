import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // Infos admin dur
  const adminUser = {
    username: "admin",
    password: "admin123",
    role: "admin",
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (username === adminUser.username && password === adminUser.password) {
      sessionStorage.setItem(
        "admin",
        JSON.stringify({ username, role: adminUser.role })
      );
      alert("Connexion admin réussie !");
      navigate("/products");
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Connexion Administrateur
        </h2>

        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

        <label className="block mb-2 font-medium" htmlFor="username">
          Nom d'utilisateur
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 font-medium" htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
        <p>admin</p>
        <p>admin123</p>
      </form>
    </div>
  );
}
