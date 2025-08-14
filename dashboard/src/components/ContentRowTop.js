import React, { useState, useEffect } from "react";
import SmallCard from "./SmallCard";
import ApiService from "../services/ApiService";

const ContentRowTop = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await ApiService.getStats();
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="row">
      <SmallCard
        title="Total Users"
        value={loading ? "..." : stats.totalUsers}
        iconClass="fas fa-users"
        cardClass="border-left-primary"
      />
      <SmallCard
        title="Products"
        value={loading ? "..." : stats.totalProducts}
        iconClass="fas fa-box"
        cardClass="border-left-success"
      />
      <SmallCard
        title="Categories"
        value={loading ? "..." : stats.totalCategories}
        iconClass="fas fa-tags"
        cardClass="border-left-info"
      />
      <SmallCard
        title="Total Value"
        value={loading ? "..." : formatCurrency(stats.totalRevenue)}
        iconClass="fas fa-dollar-sign"
        cardClass="border-left-warning"
      />
    </div>
  );
};

export default ContentRowTop;
