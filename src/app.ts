import express from "express";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import authRoutes from "./api/v1/routes/adminRoutes";
import signInRoutes from "./api/v1/routes/signInRoutes";
import animalRouter from "./api/v1/animals/animals.routes";
import adminRoutes from "./api/v1/routes/adminRoutes"

const app = express();

// Body parsing middleware
app.use(express.json());

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

// authentication
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

// api routes
app.use("/api/v1/", animalRouter)


// Body parsing middleware
app.use(express.json());

export default app;