import app from "./app.js";
import { config, connectDatabase } from "./config/index.js";

const startServer = async () => {
  try {
    // Connect Database
    await connectDatabase();

    // Start Express Server
    const server = app.listen(config.app.port, () => {
      
      console.log(`server running on port ${config.app.port}`);
    });

    /**
     * Graceful Shutdown
     */
    process.on("SIGINT", () => {
      console.log("Server Stopped");
      server.close(() => process.exit(0));
    });

    process.on("SIGTERM", () => {
      console.log("Server Terminated");
      server.close(() => process.exit(0));
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();






