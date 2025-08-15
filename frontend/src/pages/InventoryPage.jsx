import React, { useState } from "react";
import CategoryManager from "../components/CategoryManager";
import SubcategoryManager from "../components/SubcategoryManager";
import ProductManager from "../components/ProductManager";
import { translateLabel } from "../utils/urduUtils";

const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState("categories");

  const tabs = [
    { id: "categories", label: "CATEGORIES" },
    { id: "subcategories", label: "SUBCATEGORIES" },
    { id: "products", label: "PRODUCTS" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-urdu text-lg ${
                  activeTab === tab.id
                    ? "bg-amber-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {translateLabel(tab.label)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "categories" && <CategoryManager />}
          {activeTab === "subcategories" && <SubcategoryManager />}
          {activeTab === "products" && <ProductManager />}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
