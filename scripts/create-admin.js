// scripts/create-admin.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("Suplescampgn25HzY", 12);
  
  const admin = await prisma.user.create({
    data: {
      name: "Administrador",
      email: "suplementosdeloscampeonesgn@gmail.com",
      password: hashedPassword,
      role: "admin"
    }
  });
  
  console.log("✅ Usuario admin creado:", admin.name);
}

createAdmin().catch(console.error).finally(() => prisma.$disconnect());
