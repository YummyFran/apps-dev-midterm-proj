import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { fetchProducts } from "../lib/productsService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { BiLoaderAlt } from "react-icons/bi";
import Products from "../components/Products";
import ProductFilters from "../components/ProductFilters";
import { Outlet, useSearchParams } from "react-router-dom";

const Browse = () => {
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    limit: 28,
    skip: "",
    select: "",
    sortBy: "",
    order: "asc",
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 40_000 })
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get("q")
  const cat = searchParams.get("category")

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: async ({ pageParam = 0 }) =>
      await fetchProducts({ ...filters, skip: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const { skip, limit, total } = lastPage;
      const nextSkip = skip + limit;
      return nextSkip < total ? nextSkip : undefined;
    },
  });

  useEffect(() => {
    let timeoutId;

    const refetchProducts = (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= fullHeight - 100) {
          fetchNextPage();
        }
      }, 200);
    };

    document.addEventListener("scroll", refetchProducts);
    return () => {
      document.removeEventListener("scroll", refetchProducts);
      clearTimeout(timeoutId);
    };
  }, [fetchNextPage]);

  useEffect(() => {
    if(!products) return

    setFilteredProducts(products)
  }, [products])

  useEffect(() => {
    const fil = products?.pages.map(page => {
        return  { ...page, products: page.products.filter(val => val.price > priceRange.min && val.price < priceRange.max) }
    })

    setFilteredProducts({ ...products, pages: fil })

  }, [priceRange])

  useEffect(() => {
    if(!query) return

    setFilters(prev => ({ ...prev, q: query }))
  }, [query])

  return (
    <div>
      <Nav value={query}/>
      <section className="px-[2rem] lg:px-[10rem] flex gap-6 pb-10">
        <aside className="w-75 hidden lg:block">
          <ProductFilters filters={filters} setFilters={setFilters} priceRange={priceRange} setPriceRange={setPriceRange} />
        </aside>
        <main className="flex-1">
          <Products products={filteredProducts} isFetchingNextPage={isFetchingNextPage} setFilters={setFilters}/>
        </main>
      </section>
        <Outlet />
    </div>
  );
};

export default Browse;
