import React, { useState } from "react";

export default function ProductCard({ item, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [desc, setDesc] = useState(item.description);
  const [price, setPrice] = useState(item.price);

  const save = () => {
    onUpdate({ title, description: desc, price });
    setEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        {editing ? (
          <div className="space-y-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
        ) : (
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <div className="text-sm font-medium mt-1">₹{item.price}</div>
          </div>
        )}
      </div>

      <div className="mt-3 sm:mt-0 flex gap-2">
        {editing ? (
          <>
            <button
              onClick={save}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1 bg-yellow-400 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
