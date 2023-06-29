import mongoose from "mongoose";
import app from "./app";
import config from "./config";
const port: number = 3000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Assignement 3 listening on port ${config.port}`);
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Error", error);
  }
}

main();
