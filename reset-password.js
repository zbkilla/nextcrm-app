const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function resetPassword() {
  const email = "zbkilla.ai@gmail.com";
  const newPassword = "Admin123!"; // You can change this to your desired password
  
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the user's password
    const updatedUser = await prisma.users.update({
      where: { email: email },
      data: { password: hashedPassword }
    });
    
    if (updatedUser) {
      console.log(`✅ Password successfully reset for ${email}`);
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 New Password: ${newPassword}`);
      console.log("\nYou can now login at: http://localhost:3000/en/sign-in");
    }
  } catch (error) {
    console.error("❌ Error resetting password:", error);
    console.log("\nPossible issues:");
    console.log("- User with this email might not exist");
    console.log("- Database connection issue");
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();