import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../utils/products";

export default function Dashboard() {
  const { user } = useAuthContext();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const addItem = async (e) => {
    e.preventDefault();
    if (!title) return;

    const newItem = {
      title,
      description: desc,
      price: Number(price || 0),
    };

    const added = await addProduct(newItem);

    setItems((prev) => [added, ...prev]);
    setTitle("");
    setDesc("");
    setPrice("");
    setPage(1);
  };

  const removeItem = async (id) => {
    await deleteProduct(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const updateItem = async (id, data) => {
    const updated = await updateProduct(id, data);
    setItems((prev) => prev.map((x) => (x.id === id ? updated : x)));
  };

  useEffect(() => {
    const fetcher = async () => {
      const data = await getProducts(page, perPage, query);
      setItems(data?.products || []);
      setTotal(data?.total || 0);
    };
    fetcher();
  }, [page, query]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">Hello, {user?.fullname}</h2>
        <div>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search..."
            className="p-2 border rounded"
          />
        </div>
      </div>

      <form
        onSubmit={addItem}
        className="mb-4 grid grid-cols-1 sm:grid-cols-4 gap-2"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="p-2 border rounded col-span-1 sm:col-span-1"
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="p-2 border rounded col-span-1 sm:col-span-2"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="p-2 border rounded col-span-1 sm:col-span-1"
        />
        <button className="py-2 bg-blue-600 text-white rounded col-span-1 sm:col-span-4">
          Add Item
        </button>
      </form>

      <div className="grid gap-3">
        {items?.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onDelete={() => removeItem(item.id)}
            onUpdate={(data) => updateItem(item.id, data)}
          />
        ))}
      </div>

      <div className="mt-4">
        <Pagination
          current={page}
          perPage={perPage}
          total={total}
          onChange={setPage}
        />
      </div>
    </div>
  );
}
