import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export default function ProductDetail() {
  const { addProduct } = useCart();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Produit non trouvé");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setProduct(null);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500 text-lg">Chargement du produit...</p>
      </div>
    );

  if (!product)
    return (
      <div className="flex flex-col justify-center items-center h-48">
        <p className="text-red-600 mb-4">Produit introuvable</p>
        <button
          onClick={() => navigate("/products")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Retour à la liste
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <button
        onClick={() => navigate("/products")}
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
      >
        ← Retour à la liste des produits
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="h-64 w-auto mx-auto mb-6 object-contain"
      />
      <p className="mb-6 text-gray-700">{product.description}</p>
      <p className="text-2xl font-semibold text-green-700">{product.price} €</p>
      <button
        onClick={() => {
          addProduct(product, 1);
          navigate("/panier");
        }}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
