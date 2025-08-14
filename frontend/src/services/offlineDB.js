import { openDB } from "idb";

const DB_NAME = "inventory-pos";
const DB_VERSION = 1;
const STORES = {
  PRODUCTS: "products",
  CATEGORIES: "categories",
  SUBCATEGORIES: "subcategories",
  SALES: "sales",
};

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore(STORES.PRODUCTS, { keyPath: "id" });
    db.createObjectStore(STORES.CATEGORIES, { keyPath: "id" });
    db.createObjectStore(STORES.SUBCATEGORIES, { keyPath: "id" });
    db.createObjectStore(STORES.SALES, { keyPath: "id" });
  },
});

export const offlineDB = {
  async saveProducts(products) {
    const db = await dbPromise;
    const tx = db.transaction(STORES.PRODUCTS, "readwrite");
    await Promise.all(products.map((product) => tx.store.put(product)));
    return tx.done;
  },

  async getProducts() {
    const db = await dbPromise;
    return db.getAll(STORES.PRODUCTS);
  },

  async saveCategories(categories) {
    const db = await dbPromise;
    const tx = db.transaction(STORES.CATEGORIES, "readwrite");
    await Promise.all(categories.map((category) => tx.store.put(category)));
    return tx.done;
  },

  async getCategories() {
    const db = await dbPromise;
    return db.getAll(STORES.CATEGORIES);
  },

  async saveSale(sale) {
    const db = await dbPromise;
    await db.put(STORES.SALES, sale);
  },

  async getPendingSales() {
    const db = await dbPromise;
    return db.getAll(STORES.SALES);
  },

  async removeSale(id) {
    const db = await dbPromise;
    await db.delete(STORES.SALES, id);
  },
};

export default offlineDB;
