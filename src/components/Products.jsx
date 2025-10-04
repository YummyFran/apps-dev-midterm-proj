import React from "react";
import ProductCard from "./ProductCard";
import { BiLoaderAlt, BiSortAlt2 } from "react-icons/bi";
import Loading from "./Loading";


const Products = ({ products, isFetchingNextPage, setFilters }) => {
    const toggleOrder = () => {
        setFilters(prev => ({ ...prev, order: prev.order == "asc" ? "desc" : "asc" }))
    }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold py-6">Browse Products</h2>
        <BiSortAlt2 className="text-xl text-gray-400 cursor-pointer" onClick={toggleOrder}/>
      </div>
      <div
        className="grid gap-6 
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-2
                xl:grid-cols-3
                2xl:grid-cols-4"
      >
        {products?.pages?.flatMap((page) =>
          page.products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        )}
      </div>
      {isFetchingNextPage && <Loading />}
    </>
  );
};

export default Products;
