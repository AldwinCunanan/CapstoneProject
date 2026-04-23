import express from "express";
import setupSwagger from "./config/swagger";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import authRoutes from "./api/v1/routes/adminRoutes";
import signInRoutes from "./api/v1/routes/signInRoutes";
import animalRouter from "./api/v1/animals/animals.routes";
import adopterRouter from "./api/v1/adopters/adopters.routes";
import adoptionRequest from "./api/v1/adoptionApplications/adoption.routes"
import notificationRouter from "./api/v1/notifications/notifications.routes";

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
app.use("/api/v1/", animalRouter);
app.use("/api/v1/", adopterRouter);
app.use("/api/v1/", adoptionRequest);
app.use("/api/v1/", notificationRouter);


// Setup Swagger
setupSwagger(app);

export default app;