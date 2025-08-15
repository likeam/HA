import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncOfflineData, setPendingItems } from "../features/syncSlice";
import { getPendingBills } from "../services/offlineDB";
import { translateLabel } from "../utils/urduUtils";

const SyncPage = () => {
  const dispatch = useDispatch();
  const { status, lastSync, pendingItems } = useSelector((state) => state.sync);

  useEffect(() => {
    const pending = getPendingBills().length;
    dispatch(setPendingItems(pending));
  }, [dispatch]);

  const handleSync = () => {
    dispatch(syncOfflineData());
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h2 className="font-urdu text-2xl mb-6 text-center">
          {translateLabel("OFFLINE_DATA_SYNC")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-amber-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold">{pendingItems}</div>
            <div className="font-urdu mt-2">
              {translateLabel("PENDING_BILLS")}
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg text-center">
            <div className="font-urdu">
              {lastSync
                ? `${translateLabel("LAST_SYNC")}: ${new Date(
                    lastSync
                  ).toLocaleString("ur-PK")}`
                : translateLabel("NEVER_SYNCED")}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSync}
            disabled={status === "syncing" || pendingItems === 0}
            className={`px-8 py-4 rounded-lg text-white font-urdu text-xl ${
              status === "syncing" || pendingItems === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {status === "syncing"
              ? translateLabel("SYNCING")
              : translateLabel("SYNC_NOW")}
          </button>

          {status === "succeeded" && (
            <div className="mt-4 text-green-600 font-urdu">
              {translateLabel("SYNC_SUCCESS")}
            </div>
          )}

          {status === "failed" && (
            <div className="mt-4 text-red-600 font-urdu">
              {translateLabel("SYNC_FAILED")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncPage;
