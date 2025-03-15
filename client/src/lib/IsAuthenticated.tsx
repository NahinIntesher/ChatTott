import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (
  request: NextRequest
): Promise<boolean> => {
  const token = request.cookies.get("userRegistered")?.value;

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    console.log("decoded", decoded);
    return true;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return false;
  }
};
