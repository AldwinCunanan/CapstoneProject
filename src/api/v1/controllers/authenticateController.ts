import { Request, Response, NextFunction } from "express";
import fetch from "node-fetch";

export const signInHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByxpetAfAq8GBQrGZkTnTxUw_n-ThWIHA`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message);
    }

    res.status(200).json({
      idToken: data.idToken,
      email: data.email,
      localId: data.localId,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn
    });

  } catch (error) {
    next(error);
  }
};