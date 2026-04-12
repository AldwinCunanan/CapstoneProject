// External library imports
import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { AuthenticationError } from "../errors/errors";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";

// Internal module imports
import { auth } from "../../../config/firebaseConfig";

/**
 * Middleware to authenticate a user using a Firebase ID token.
 * Now integrated with centralized error handling system.
 *
 * This middleware:
 * - Extracts the token from the Authorization header
 * - Verifies the token with Firebase Auth
 * - Stores user information in res.locals for downstream middleware
 * - Throws standardized AuthenticationError for any failures
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

    const authHeader = req.headers.authorization;

    // Missing or malformed header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(
            new AuthenticationError(
                "Unauthorized: No token provided",
                "TOKEN_NOT_FOUND"
            )
        );
    }

    const token = authHeader.split(" ")[1];

    console.log("AUTH HEADER:", authHeader);
    console.log("TOKEN START:", token?.slice(0, 20));
    console.log("JWT PARTS:", token?.split(".").length);

    if (!token) {
        return next(
            new AuthenticationError(
                "Unauthorized: No token provided",
                "TOKEN_NOT_FOUND"
            )
        );
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);

        res.locals.uid = decodedToken.uid;
        res.locals.role = decodedToken.role;

        return next();
    } catch (error) {
        console.error("VERIFY TOKEN ERROR:", error);
        // Convert ANY Firebase error into our AuthenticationError
        return next(
            new AuthenticationError(
                "Unauthorized: Token verification failed",
                "TOKEN_INVALID"
            )
        );
    } 
};

export default authenticate;