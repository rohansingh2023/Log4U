import Logger from "./logging";

const logger = new Logger({ serviceName: "TEST"});

logger.log({
  type: "INFO",
  message: "Testing my logs package",
});

logger.log({
  type: "DEBUG",
  message: "Test with other payloads",
  payload: { id: 123344 },
});

logger.log({
  type: "DEBUG",
  message: "Test with other payloads",
  statusCode: 200,
});

logger.log({
  type: "DEBUG",
  message: "Test with other payloads",
  targetURL: "http://localhost:5173",
});

try {
    throw new Error("This is a test error");
} catch (err) {
    logger.log({
        type: "ERROR",
        logId: "ERR001",
        message: err, // Pass the actual Error object
    });
}

logger.log({
    type: "INFO",
    message: "Ending my logs package",
});