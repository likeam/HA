import React from "react";
import { useAppSelector } from "../app/hooks";
import { FaBox, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import UrduText from "../components/common/UrduText";

const Dashboard = () => {
  const products = useAppSelector((state) => state.inventory.products);
  const sales = useAppSelector((state) => state.pos.salesHistory);

  const totalProducts = products.length;
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);

  const lowStockProducts = products.filter((p) => p.stock < 10).length;
  const recentSales = sales.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">ڈیش بورڈ</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="bg-blue-100 p-4 rounded-full mr-4">
            <FaBox className="text-blue-500 text-2xl" />
          </div>
          <div>
            <UrduText className="text-gray-600">مصنوعات</UrduText>
            <div className="text-3xl font-bold">{totalProducts}</div>
            {lowStockProducts > 0 && (
              <div className="text-red-500 text-sm">
                {lowStockProducts} <UrduText>کم اسٹاک</UrduText>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="bg-green-100 p-4 rounded-full mr-4">
            <FaShoppingCart className="text-green-500 text-2xl" />
          </div>
          <div>
            <UrduText className="text-gray-600">فروخت</UrduText>
            <div className="text-3xl font-bold">{totalSales}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="bg-purple-100 p-4 rounded-full mr-4">
            <FaRupeeSign className="text-purple-500 text-2xl" />
          </div>
          <div>
            <UrduText className="text-gray-600">آمدنی</UrduText>
            <div className="text-3xl font-bold">
              Rs {totalRevenue.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            <UrduText>حالیہ فروخت</UrduText>
          </h2>

          {recentSales.length > 0 ? (
            <ul className="space-y-3">
              {recentSales.map((sale) => (
                <li key={sale.id} className="border-b pb-3">
                  <div className="flex justify-between">
                    <span className="font-medium">#{sale.id.slice(0, 8)}</span>
                    <span>Rs {sale.total.toFixed(2)}</span>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {new Date(sale.timestamp).toLocaleDateString()} -{" "}
                    {sale.items.length} <UrduText>مصنوعات</UrduText>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <UrduText>حالیہ فروخت نہیں ملی</UrduText>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            <UrduText>کم اسٹاک مصنوعات</UrduText>
          </h2>

          {lowStockProducts > 0 ? (
            <ul className="space-y-3">
              {products
                .filter((p) => p.stock < 10)
                .slice(0, 5)
                .map((product) => (
                  <li key={product.id} className="border-b pb-3">
                    <div className="flex justify-between">
                      <span className="font-medium">{product.name}</span>
                      <span
                        className={
                          product.stock < 5 ? "text-red-500" : "text-yellow-500"
                        }
                      >
                        {product.stock} <UrduText>دستیاب</UrduText>
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      {product.category} / {product.subcategory}
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <UrduText>تمام مصنوعات کافی اسٹاک میں ہیں</UrduText>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
