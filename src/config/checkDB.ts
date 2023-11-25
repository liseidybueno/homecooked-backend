import { connectDB } from "./db";

async function checkDatabaseConnection() {
  await connectDB();
}

checkDatabaseConnection();
