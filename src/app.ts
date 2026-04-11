import express from "express";


const app = express();

// Health check
app.get("/api/v1/health", (_req, res): void => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timeStamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Body parsing middleware
app.use(express.json());

export default app;