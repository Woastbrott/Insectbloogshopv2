import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export default function Admin({ initialProducts }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState(initialProducts || []);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('quantity', quantity);
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(editMode ? `/api/edit-product?id=${editId}` : '/api/add-product', {
      method: editMode ? 'PUT' : 'POST',
      body: formData,
    });

    if (response.ok) {
      setEditMode(false);
      setEditId(null);
      setTitle('');
      setPrice('');
      setDescription('');
      setQuantity(0);
      setImage(null);
      fetchProducts();
      router.push('/shop');
    } else {
      const errorData = await response.json();
      console.error('Fehler beim Hinzufügen des Produkts:', errorData.message);
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditId(product.id);
    setTitle(product.title);
    setPrice(product.price);
    setDescription(product.description);
    setQuantity(product.quantity);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/delete-product?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchProducts();
    } else {
      const errorData = await response.json();
      console.error('Fehler beim Löschen des Produkts:', errorData.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!isAuthenticated ? (
        <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Admin-Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Einloggen
          </button>
        </form>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center">Produkt hinzufügen</h1>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">Titel</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">Preis</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">Beschreibung</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">Stückzahl</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">Bild</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button type="submit" className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              {editMode ? 'Produkt aktualisieren' : 'Produkt hinzufügen'}
            </button>
          </form>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Produkte verwalten</h2>
          <ul className="space-y-4">
            {products && products.length > 0 ? (
              products.map((product) => (
                <li key={product.id} className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p>{product.description}</p>
                  <p>{product.price} €</p>
                  <p>Verfügbar: {product.quantity}</p>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Löschen
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center">Keine Produkte gefunden</p>
            )}
          </ul>
        </div>
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
