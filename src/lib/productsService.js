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

/**
 * filters object supports:
 *  - limit (number)
 *  - skip (number)
 *  - select (string) — comma-separated fields
 *  - category (string)
 *  - q (string) — search
 *  - sortBy (string)
 *  - order (string: "asc" or "desc")
 */
function buildQueryString(filters = {}) {
  const params = new URLSearchParams();

  if (filters.limit != null) params.append("limit", filters.limit);
  if (filters.skip != null) params.append("skip", filters.skip);
  if (filters.select) params.append("select", filters.select);
  if (filters.sortBy) params.append("sortBy", filters.sortBy);
  if (filters.order) params.append("order", filters.order);
  // Note: `q` is used for the “search” endpoint, so we’ll handle that later
  // We don't append category here since category is part of path in docs

  const str = params.toString();
  return str ? `?${str}` : "";
}

/*
    filters {
        q: seearch query.
        category: catergory sa product,
        limit,
        skip, 
        select, 
        sortBy, 
        order
    }
*/
export async function fetchProducts(filters = {}) {
  let BASE = "https://dummyjson.com/products";
  let url = BASE;

  if (filters.q) {
    url = `${BASE}/search`;
  } else if (filters.category) {
    url = `${BASE}/category/${encodeURIComponent(filters.category)}`;
  }

  const qs = buildQueryString(filters);

  // For search, we need to add q separately
  if (filters.q) {
    const prefix = qs ? "&" : "?";
    url += `${qs}${prefix}q=${encodeURIComponent(filters.q)}`;
  } else {
    url += qs;
  }

  console.log(url)

  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to fetch products: ${resp.status} ${resp.statusText}`);
  }
  const data = await resp.json();
  return data;
}

