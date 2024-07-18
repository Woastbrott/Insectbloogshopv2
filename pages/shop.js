import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Shop({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (product.quantity > 0) {
      setCart([...cart, product]);
      const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      );
      setProducts(updatedProducts);
    } else {
      alert('Dieses Produkt ist nicht mehr verfügbar.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price} €</p>
            <p>Verfügbar: {product.quantity}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 mt-4"
            >
              In den Warenkorb
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Warenkorb</h2>
      {cart.length > 0 ? (
        <ul className="space-y-4">
          {cart.map((product, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p>{product.description}</p>
              <p>{product.price} €</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Der Warenkorb ist leer</p>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'products.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(fileContents);

  return {
    props: {
      initialProducts: products,
    },
  };
}
