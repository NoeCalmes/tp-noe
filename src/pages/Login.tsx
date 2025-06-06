import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const usernameTrimmed = username.trim();
    const passwordTrimmed = password.trim();

    try {
      const usersResponse = await fetch("https://fakestoreapi.com/users");
      if (!usersResponse.ok)
        throw new Error("Erreur récupération utilisateurs");
      const users: User[] = await usersResponse.json();

      const userValid = users.find((u) => u.username === username);
      if (!userValid) {
        setError("Nom d'utilisateur invalide");
        setLoading(false);
        return;
      }

      const loginResponse = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ username: usernameTrimmed, password: passwordTrimmed }),
      });

      if (!loginResponse.ok) {
        setError("Nom d'utilisateur ou mot de passe incorrect");
        setLoading(false);
        return;
      }

      const loginData = await loginResponse.json();

      sessionStorage.setItem("jwt", loginData.token);
      sessionStorage.setItem("user", JSON.stringify(userValid));

      setLoading(false);
      alert("Connexion réussie !");
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Connexion
        </h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <label
          className="block mb-2 text-gray-700 font-medium"
          htmlFor="username"
        >
          Nom d'utilisateur
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Votre nom d'utilisateur"
        />

        <label
          className="block mb-2 text-gray-700 font-medium"
          htmlFor="password"
        >
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Votre mot de passe"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-md transition-colors ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p>johnd</p>
        <p>m38rmF$</p>
      </form>
    </div>
  );
}
