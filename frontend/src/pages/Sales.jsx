import React from "react";
import SalesHistory from "../components/sales/SalesHistory";

const Sales = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">فروخت کی تاریخ</h1>
      <SalesHistory />
    </div>
  );
};

export default Sales;
