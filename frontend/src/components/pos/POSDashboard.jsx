import React from "react";
import ProductGrid from "./ProductGrid";
import Cart from "./Cart";
import UrduBillPreview from "./UrduBillPreview";
import PrintController from "./PrintController";
import OfflineBanner from "../layout/OfflineBanner";

const POSDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <OfflineBanner />

      <h1 className="text-2xl font-bold mb-6">پوائنٹ آف سیل (POS)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductGrid />
        </div>

        <div className="space-y-6">
          <Cart />
          <UrduBillPreview />
          <PrintController />
        </div>
      </div>
    </div>
  );
};

export default POSDashboard;
