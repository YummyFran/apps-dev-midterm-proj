import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { fetchProducts } from "../lib/productsService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { BiLoaderAlt } from "react-icons/bi";
import Products from "../components/Products";
import ProductFilters from "../components/ProductFilters";

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

  return (
    <div>
      <Nav />
      <section className="px-[2rem] lg:px-[10rem] flex gap-6 pb-10">
        <aside className="w-75 hidden lg:block">
          <ProductFilters filters={filters} setFilters={setFilters}/>
        </aside>
        <main className="flex-1">
          <Products products={products} isFetchingNextPage={isFetchingNextPage} setFilters={setFilters}/>
        </main>
      </section>
    </div>
  );
};

export default Browse;
