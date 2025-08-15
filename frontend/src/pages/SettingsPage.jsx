import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSave,
  FaPrint,
  FaDownload,
  FaUpload,
  FaLanguage,
  FaMoneyBillWave,
  FaStore,
} from "react-icons/fa";
import { saveSettings } from "../features/settingsSlice";
import { translateLabel } from "../utils/urduUtils";
import { exportData, importData } from "../services/backupService";
import { syncOfflineData } from "../features/offlineSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [formData, setFormData] = useState(settings);
  const [isLoading, setIsLoading] = useState(false);
  const [importFile, setImportFile] = useState(null);

  // Load saved settings on initial render
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Save settings to Redux and localStorage
  const handleSave = () => {
    dispatch(saveSettings(formData));
    toast.success(translateLabel("SETTINGS_SAVED"));
  };

  // Handle data export
  const handleExport = async () => {
    setIsLoading(true);
    try {
      await exportData();
      toast.success(translateLabel("EXPORT_SUCCESS"));
    } catch (error) {
      toast.error(translateLabel("EXPORT_FAILED"));
    }
    setIsLoading(false);
  };

  // Handle data import
  const handleImport = async () => {
    if (!importFile) {
      toast.warn(translateLabel("SELECT_FILE"));
      return;
    }

    setIsLoading(true);
    try {
      await importData(importFile);
      toast.success(translateLabel("IMPORT_SUCCESS"));
      // Sync offline data after import
      dispatch(syncOfflineData());
    } catch (error) {
      toast.error(translateLabel("IMPORT_FAILED"));
    }
    setIsLoading(false);
    setImportFile(null);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setImportFile(e.target.files[0]);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center font-urdu">
        {translateLabel("SETTINGS")}
      </h1>

      {isLoading && <LoadingSpinner />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FaStore className="text-amber-600 text-xl mr-2" />
            <h2 className="font-urdu text-xl font-semibold">
              {translateLabel("GENERAL_SETTINGS")}
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-urdu">
                {translateLabel("STORE_NAME")}
              </label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder={translateLabel("ENTER_STORE_NAME")}
              />
            </div>

            <div>
              <label className="block mb-2 font-urdu">
                {translateLabel("STORE_ADDRESS")}
              </label>
              <textarea
                name="storeAddress"
                value={formData.storeAddress || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder={translateLabel("ENTER_STORE_ADDRESS")}
                rows="3"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-urdu">
                {translateLabel("CONTACT_NUMBER")}
              </label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder={translateLabel("ENTER_CONTACT_NUMBER")}
              />
            </div>
          </div>
        </div>

        {/* Currency & Language */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <FaMoneyBillWave className="text-amber-600 text-xl mr-2" />
              <FaLanguage className="text-amber-600 text-xl mr-2" />
            </div>
            <h2 className="font-urdu text-xl font-semibold">
              {translateLabel("CURRENCY_LANGUAGE")}
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-urdu">
                {translateLabel("CURRENCY")}
              </label>
              <select
                name="currency"
                value={formData.currency || "PKR"}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              >
                <option value="PKR">پاکستانی روپیہ (PKR)</option>
                <option value="USD">امریکی ڈالر (USD)</option>
                <option value="EUR">یورو (EUR)</option>
                <option value="GBP">برطانوی پاؤنڈ (GBP)</option>
                <option value="SAR">سعودی ریال (SAR)</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-urdu">
                {translateLabel("LANGUAGE")}
              </label>
              <select
                name="language"
                value={formData.language || "ur"}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              >
                <option value="ur">اردو</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="showEnglishNames"
                checked={formData.showEnglishNames || false}
                onChange={handleChange}
                id="showEnglishNames"
                className="h-5 w-5 text-amber-600 rounded"
              />
              <label htmlFor="showEnglishNames" className="ml-2 font-urdu">
                {translateLabel("SHOW_ENGLISH_NAMES")}
              </label>
            </div>
          </div>
        </div>

        {/* Receipt Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FaPrint className="text-amber-600 text-xl mr-2" />
            <h2 className="font-urdu text-xl font-semibold">
              {translateLabel("RECEIPT_SETTINGS")}
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-urdu">
                {translateLabel("RECEIPT_HEADER")}
              </label>
              <textarea
                name="receiptHeader"
                value={formData.receiptHeader || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder={translateLabel("ENTER_RECEIPT_HEADER")}
                rows="2"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 font-urdu">
                {translateLabel("RECEIPT_FOOTER")}
              </label>
              <textarea
                name="receiptFooter"
                value={formData.receiptFooter || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                placeholder={translateLabel("ENTER_RECEIPT_FOOTER")}
                rows="2"
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="printAfterSale"
                checked={formData.printAfterSale || false}
                onChange={handleChange}
                id="printAfterSale"
                className="h-5 w-5 text-amber-600 rounded"
              />
              <label htmlFor="printAfterSale" className="ml-2 font-urdu">
                {translateLabel("AUTO_PRINT_AFTER_SALE")}
              </label>
            </div>
          </div>
        </div>

        {/* Backup & Restore */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <FaDownload className="text-amber-600 text-xl mr-2" />
              <FaUpload className="text-amber-600 text-xl mr-2" />
            </div>
            <h2 className="font-urdu text-xl font-semibold">
              {translateLabel("BACKUP_RESTORE")}
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <button
                onClick={handleExport}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-urdo flex items-center justify-center"
              >
                <FaDownload className="mr-2" />
                {translateLabel("EXPORT_DATA")}
              </button>
              <p className="mt-2 text-sm text-gray-600 text-center">
                {translateLabel("EXPORT_DESCRIPTION")}
              </p>
            </div>

            <div>
              <div className="flex">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                  id="importFile"
                />
                <label
                  htmlFor="importFile"
                  className="flex-1 py-3 bg-gray-200 rounded-l-lg text-center cursor-pointer"
                >
                  {importFile
                    ? translateLabel("FILE_SELECTED")
                    : translateLabel("CHOOSE_FILE")}
                </label>
                <button
                  onClick={handleImport}
                  disabled={!importFile}
                  className={`py-3 px-4 rounded-r-lg text-white ${
                    importFile
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FaUpload />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600 text-center">
                {translateLabel("IMPORT_DESCRIPTION")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          className="py-3 px-8 bg-amber-600 text-white rounded-lg font-urdu text-lg flex items-center mx-auto"
        >
          <FaSave className="mr-2" />
          {translateLabel("SAVE_SETTINGS")}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
