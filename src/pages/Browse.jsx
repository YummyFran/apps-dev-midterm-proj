import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { fetchProducts } from "../lib/productsService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { BiLoaderAlt } from "react-icons/bi";

const Browse = () => {
  const [filters, setFilters] = useState({
    q: "",
    category: "",
    limit: 28,
    skip: "",
    select: "",
    sortBy: "",
    order: "",
  });

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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
          console.log("yes");
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
      <section className="px-[2rem] lg:px-[10rem] flex gap-2 pb-10">
        <aside className="w-75">Side</aside>
        <main className="flex-1">
            <h2 className="text-xl font-bold py-6">Browse Products</h2>
          <div className="flex flex-wrap gap-3">
            {products?.pages.flatMap((page) =>
              page.products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))
            )}
          </div>
          {isFetchingNextPage && (
            <div className="flex justify-center py-5 text-4xl text-gray-400 animate-spin">
              <BiLoaderAlt />
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

export default Browse;
