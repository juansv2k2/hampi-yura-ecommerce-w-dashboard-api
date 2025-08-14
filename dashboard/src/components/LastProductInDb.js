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
      <div className="col-md-4 col-lg-6">
        <div className="card border-left-info shadow h-100">
          <div className="card-body">
            <div className="text-center loading">Loading latest product...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!lastProduct) {
    return (
      <div className="col-md-4 col-lg-6">
        <div className="card border-left-info shadow h-100">
          <div className="card-body">
            <div className="text-center text-muted">No products found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-4 col-lg-6">
      <div className="card border-left-info shadow h-100">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Latest Product Added
              </div>
              <div className="row no-gutters align-items-center mt-2">
                <div className="col-md-3">
                  <div className="product-image">
                    <img
                      src={`/images/${
                        lastProduct.image || "default-image.png"
                      }`}
                      alt={lastProduct.name}
                      className="img-fluid rounded"
                      style={{ maxHeight: "80px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src = "/images/default-image.png";
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="ml-3">
                    <h6 className="font-weight-bold text-gray-800">
                      {lastProduct.name}
                    </h6>
                    <p
                      className="text-muted mb-1"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Category: {lastProduct.category || "N/A"}
                    </p>
                    <p
                      className="text-success font-weight-bold mb-1"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Price: ${lastProduct.price}
                    </p>
                    <p className="text-xs text-gray-600">
                      ID: {lastProduct.id}
                    </p>
                    <div className="mt-2">
                      <button className="btn btn-primary btn-sm mr-2">
                        Edit
                      </button>
                      <button className="btn btn-info btn-sm">View</button>
                    </div>
                  </div>
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
