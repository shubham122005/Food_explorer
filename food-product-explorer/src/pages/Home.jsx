// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const categories = ["snacks", "beverages", "breakfasts", "desserts", "meals"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("snacks");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("product_name");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/category/${category}.json`
        );
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("API fetch error", err);
      }
    };
    fetchProducts();
  }, [category]);

  const filtered = products
    .filter((p) =>
      p.product_name?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "product_name") return a.product_name?.localeCompare(b.product_name);
      if (sort === "nutrition_grade_fr") return (a.nutrition_grade_fr || "z").localeCompare(b.nutrition_grade_fr || "z");
      return 0;
    });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🍎 Food Product Explorer</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select onChange={(e) => setCategory(e.target.value)} value={category} className="p-2 border rounded">
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select onChange={(e) => setSort(e.target.value)} value={sort} className="p-2 border rounded">
          <option value="product_name">Sort by Name</option>
          <option value="nutrition_grade_fr">Sort by Nutrition Grade</option>
        </select>

        <input
          className="p-2 border rounded flex-1"
          placeholder="Search product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
    </div>
  );
}
