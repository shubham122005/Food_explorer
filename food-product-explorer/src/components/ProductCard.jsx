// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <img
        src={product.image_front_small_url || "/placeholder.png"}
        alt={product.product_name}
        className="w-full h-40 object-cover mb-2 rounded"
      />
      <h2 className="text-lg font-semibold">{product.product_name}</h2>
      <p className="text-sm text-gray-600">
        <strong>Ingredients:</strong> {product.ingredients_text || "N/A"}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Nutrition Grade:</strong>{" "}
        {product.nutrition_grade_fr?.toUpperCase() || "N/A"}
      </p>
    </div>
  );
}
