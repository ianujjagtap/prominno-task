import app from "./app.js";
import env from "@/config/env.js";
import connectDatabase from "@/config/database.js";
import Admin from "@/modules/auth/admin.model.js";
import bcrypt from "bcryptjs";

// creates default admin if not present
const seedAdmin = async () => {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) return;

  const exists = await Admin.findOne({ email: env.ADMIN_EMAIL });
  if (exists) return;

  const hash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
  await Admin.create({ email: env.ADMIN_EMAIL, passwordHash: hash });
  console.log("Admin seeded:", env.ADMIN_EMAIL);
};

const start = async () => {
  await connectDatabase();
  await seedAdmin();

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
