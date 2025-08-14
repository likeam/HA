import React from "react";
import UrduText from "../components/common/UrduText";

const Settings = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">ترتیبات</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          <UrduText>سسٹم ترتیبات</UrduText>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">
              <UrduText>عام ترتیبات</UrduText>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">
                  <UrduText>کرنسی</UrduText>
                </label>
                <select className="w-full p-2 border rounded">
                  <option>پاکستانی روپیہ (Rs)</option>
                  <option>امریکی ڈالر ($)</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">
                  <UrduText>زبان</UrduText>
                </label>
                <select className="w-full p-2 border rounded">
                  <option>اردو</option>
                  <option>انگریزی</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">
              <UrduText>پرنٹر ترتیبات</UrduText>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">
                  <UrduText>بل کا سائز</UrduText>
                </label>
                <select className="w-full p-2 border rounded">
                  <option>80mm</option>
                  <option>A4</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">
                  <UrduText>پرنٹر قسم</UrduText>
                </label>
                <select className="w-full p-2 border rounded">
                  <option>تھرمل پرنٹر</option>
                  <option>سیاہی والا پرنٹر</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            <UrduText>ترتیبات محفوظ کریں</UrduText>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
