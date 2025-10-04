const API_BASE_URL = "https://dummyjson.com";

const fetchData = async (endpoint = "/") => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await res.json();

    return [data, null];
  } catch (err) {
    console.log(er);
    return [null, err];
  }
};

export const getCategories = async () => {
  const [data] = await fetchData("/products/categories");

  return data;
};

export const getRandomProducts = async (n = 4) => {
  const rnd = Math.ceil(Math.random() * 194);
  const [data] = await fetchData(`/products?limit=${n}&skip=${rnd}`);

  return data;
};

const buildQueryString = (params) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([k]) => k !== "q" && k !== "category")
  ).toString();

  return query ? `?${query}` : "";
}

export const fetchProducts = async (filters = {}) => {
  let endpoint = "/products";

  if (filters.q) {
    endpoint = "/products/search";
  } else if (filters.category) {
    endpoint = `/products/category/${encodeURIComponent(filters.category)}`;
  }

  const qs = buildQueryString(filters);

  if (filters.q) {
    const prefix = qs ? "&" : "?";
    endpoint += `${qs}${prefix}q=${encodeURIComponent(filters.q)}`;
  } else {
    endpoint += qs;
  }

  const [data, err] = await fetchData(endpoint);

  if (err) {
    throw new Error(`Failed to fetch products: ${err.message}`);
  }

  return data;
}

export const getProductById = async (id) => {
    const [data, err] = await fetchData(`/products/${id}`)

    return data
}
