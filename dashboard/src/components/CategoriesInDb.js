import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

const CategoriesInDb = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await ApiService.getCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center loading">Loading categories...</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.productCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {categories.length === 0 && (
        <div className="text-center text-muted">No categories found</div>
      )}
    </div>
  );
};

export default CategoriesInDb;
