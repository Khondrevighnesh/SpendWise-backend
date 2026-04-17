import jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
  console.log("🔥 RAW USER:", user);

  const payload = {
    userId: user._id?.toString(),   // ✅ FIXED
    role: user.role
  };

  console.log("🔥 PAYLOAD:", payload);

  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d"
  });
};