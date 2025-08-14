import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

const LastProductInDb = () => {
  const [lastProduct, setLastProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProduct = async () => {
      try {
        const product = await ApiService.getLatestProduct();
        setLastProduct(product);
        setLoading(false);
      } catch (error) {
        console.error("Error loading latest product:", error);
        setLoading(false);
      }
    };

    fetchLatestProduct();
  }, []);

  if (loading) {
    return (
      <div className="col-md-12 mb-4">
        <div className="card border-left-info shadow h-100 py-2">
          <div className="card-body">
            <div className="text-center loading">Loading latest product...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!lastProduct) {
    return (
      <div className="col-md-12 mb-4">
        <div className="card border-left-info shadow h-100 py-2">
          <div className="card-body">
            <div className="text-center text-muted">No products found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-12 mb-4">
      <div className="card border-left-info shadow h-100 py-2">
        <div className="card-body">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Latest Product Added
            </h6>
          </div>
          <div className="row no-gutters align-items-center mt-3">
            <div className="col-md-3">
              <div className="product-image">
                <img
                  src={`/images/${lastProduct.image || "default-image.png"}`}
                  alt={lastProduct.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "100px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "/images/default-image.png";
                  }}
                />
              </div>
            </div>
            <div className="col-md-9">
              <div className="ml-3">
                <h5 className="font-weight-bold">{lastProduct.name}</h5>
                <p className="text-muted mb-1">
                  Category: {lastProduct.category || "N/A"}
                </p>
                <p className="text-success font-weight-bold mb-1">
                  Price: ${lastProduct.price}
                </p>
                <p className="text-sm text-gray-600">
                  Product ID: {lastProduct.id}
                </p>
                <div className="mt-2">
                  <button className="btn btn-primary btn-sm mr-2">Edit</button>
                  <button className="btn btn-info btn-sm">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastProductInDb;
