import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [jwt, setJwt] = useState(() => sessionStorage.getItem("jwt"));
  const [admin, setAdmin] = useState(() => sessionStorage.getItem("admin"));
  const location = useLocation();

  useEffect(() => {
    setJwt(sessionStorage.getItem("jwt"));
    setAdmin(sessionStorage.getItem("admin"));
  }, [location]);

  useEffect(() => {
    const onStorage = () => {
      setJwt(sessionStorage.getItem("jwt"));
      setAdmin(sessionStorage.getItem("admin"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogoutUser = () => {
    sessionStorage.removeItem("jwt");
    setJwt(null);
  };

  const handleLogoutAdmin = () => {
    sessionStorage.removeItem("admin");
    setAdmin(null);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <ul className="flex space-x-4 items-center">
        <li>
          <Link className="hover:text-amber-200" to="/">
            Accueil
          </Link>
        </li>
        <li>
          <Link className="hover:text-amber-200" to="/products">
            Produits
          </Link>
        </li>
        <li>
          <Link to="/panier" className="hover:text-amber-500">
            🛒 Voir le panier
          </Link>
        </li>

        {!jwt && (
          <li>
            <Link to="/login" className="hover:text-amber-200">
              Connexion
            </Link>
          </li>
        )}

        {jwt && (
          <li>
            <button onClick={handleLogoutUser} className="hover:text-amber-200">
              Déconnexion utilisateur
            </button>
          </li>
        )}
      </ul>

      <ul className="flex space-x-4 items-center">
        {!admin && (
          <li>
            <Link to="/admin-login" className="hover:text-amber-200">
              Admin connexion
            </Link>
          </li>
        )}

        {admin && (
          <>
            <li className="font-semibold">Admin connecté</li>
            <li>
              <button onClick={handleLogoutAdmin} className="hover:text-amber-200">
                Déconnexion admin
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
