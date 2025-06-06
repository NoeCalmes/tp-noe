import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, getTotalHT, getTotalTTC, removeProduct, updateQuantity } =
    useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <p className="text-center mt-10">Votre panier est vide.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Votre panier</h1>
      {cart.map(({ product, quantity }) => (
        <div
          key={product.id}
          className="flex justify-between items-center mb-4 border-b pb-2"
        >
          <div>
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p>
              {product.price} € x {quantity}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) =>
                updateQuantity(product.id, parseInt(e.target.value))
              }
              className="w-16 text-center border rounded"
            />
            <button
              onClick={() => removeProduct(product.id)}
              className="text-red-600 hover:underline"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
      <div className="mt-6 text-right">
        <p>Total HT : {getTotalHT().toFixed(2)} €</p>
        <p>Total TTC : {getTotalTTC().toFixed(2)} €</p>
      </div>
      <button
        className="mt-4 mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => navigate("/products")}
      >
        Ajouter d'autres produits
      </button>
      <button
        onClick={() =>
          alert(
            "Merci pour votre commande ! tu t'es fait arnaquer, je n'envoie pas les produits :)"
          )
        }
        className="mt-4 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
      >
        Passer a la caisse
      </button>
    </div>
  );
}
