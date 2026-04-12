import express from "express";
import authRoutes from "./api/v1/routes/adminRoutes";
import signInRoutes from "./api/v1/routes/signInRoutes";


const app = express();

// Body parsing middleware
app.use(express.json());


// test authentication
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", signInRoutes);

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