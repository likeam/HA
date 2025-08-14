import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CategoryManager from "../components/inventory/CategoryManager";
import SubcategoryManager from "../components/inventory/SubcategoryManager";
import ProductManager from "../components/inventory/ProductManager";
import StockAdjustment from "../components/inventory/StockAdjustment";
import UrduText from "../components/common/UrduText";

const Inventory = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        <UrduText>انوینٹری مینیجمنٹ</UrduText>
      </h1>

      <Tabs>
        <TabList>
          <Tab>
            <UrduText>مصنوعات</UrduText>
          </Tab>
          <Tab>
            <UrduText>زمرہ جات</UrduText>
          </Tab>
          <Tab>
            <UrduText>ذیلی زمرہ جات</UrduText>
          </Tab>
          <Tab>
            <UrduText>اسٹاک ایڈجسٹمنٹ</UrduText>
          </Tab>
        </TabList>

        <TabPanel>
          <ProductManager />
        </TabPanel>
        <TabPanel>
          <CategoryManager />
        </TabPanel>
        <TabPanel>
          <SubcategoryManager />
        </TabPanel>
        <TabPanel>
          <StockAdjustment />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Inventory;
