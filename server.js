const server = require('./index'); // Import the Express app from index.js
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { createServer } = require("http");


if (cluster.isMaster) {
  // Create a worker for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // You can restart the worker here if needed
    cluster.fork();
  });
} else {
  const port = 3000 + cluster.worker.id;
  const serverStartMsg = `Express server started on port: ${port} and portID :${process.pid}`
  // Code to run in each worker
  const httpServer = createServer(server);
  // Start server
  httpServer.listen(port, () => {
    // logger.info(serverStartMsg + port);
    console.log(serverStartMsg + port);
  });
}
