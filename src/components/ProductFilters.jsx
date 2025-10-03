import { useQuery } from "@tanstack/react-query";
import Select from "./Select";
import { getCategories } from "../lib/productsService";
import RangeSlider from "./RangeSlider";

const sortBy = [
    { name: "Title"},
    { name: "Price"},
    { name: "Brand"},
    { name: "Rating"},
    { name: "Stock"}
]

const ProductFilters = ({ filters, setFilters }) => {
    const setCategory = (category) => {
        setFilters(prev => ({...prev, category: category.toLowerCase() }))
    }
    const setSortBy = (sort) => {
        setFilters(prev => ({...prev, sortBy: sort.toLowerCase()}))
    }
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => await getCategories()
    })
  return (
    <>
      <h2 className="text-xl font-bold py-6">Filters</h2>
      <h3 className="text-md font-bold mb-4">Categories</h3>
      <Select setter={setCategory} options={categories} defaultOption={"All Categories"}/>
      <h3 className="text-md font-bold my-4">Sort by</h3>
      <Select setter={setSortBy} options={sortBy} defaultOption={"Default"}/>
      <h3 className="text-md font-bold my-4">Price range</h3>
      {/* <RangeSlider min={0} max={100} step={1} defaultValue={[20, 80]} onChange={(val) => console.log(val)} marks={[0,25,50,75,100]} /> */}
    </>
  );
};

export default ProductFilters;
