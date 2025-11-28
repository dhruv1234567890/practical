export const getProducts = async (page = 1, limit = 9, query = "") => {
  const skip = (page - 1) * limit;

  let url = "";

  if (query && query.trim() !== "") {
    url = `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`;
  } else {
    url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const addProduct = async (product) => {
  const res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
