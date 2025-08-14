import offlineSync from "../config/offlineSync.js";

export const offlineMiddleware = (req, res, next) => {
  // In a real app, this would check actual connectivity
  req.isOffline = process.env.OFFLINE_MODE === "true";
  next();
};

export const queueOfflineRequests = (req, res, next) => {
  if (req.isOffline) {
    offlineSync.queueRequest({
      method: req.method,
      path: req.path,
      body: req.body,
      headers: req.headers,
      timestamp: new Date(),
    });

    return res.json({
      status: "queued",
      message: "Operation will sync when online",
    });
  }
  next();
};
