# Log4U - A Flexible Logging Library for Node.js

`Log4U` is a lightweight, production-grade and flexible logging library for Node.js, written in TypeScript. Designed to make logging effortless and customizable, it supports structured logs, custom formats, and daily log rotation.

---

## Features

- 🌟 **Easy-to-Use**: Minimal setup to start logging in seconds.
- 🛠️ **Highly Configurable**: Define your logging levels, formats, and more.
- 🕒 **Daily Log Rotation**: Automatically creates a new log file for each day.
- 📄 **Rich Log Details**: Supports structured logs with optional parameters like payloads, status codes, and URLs.
- 🔍 **Error Handling**: Logs complete error stack traces for debugging.
- ⚡ **TypeScript Support**: Fully typed for seamless integration.

---

## Installation

Install the package using npm or yarn:

```bash
npm install log4u
# or
yarn add log4u
```

## Getting Started

### Step 1: Import and Initialize
Start by importing the Logger class and configuring it with your service name.

```typescript
import Logger from 'log4u';

const logger = new Logger({ serviceName: 'MyService' });
```

### Step 2: Logging Your Data
You can log structured data with minimal effort:

```typescript
logger.log({
  type: 'INFO', // Log level: INFO, DEBUG, ERROR
  message: 'This is an informational log.', // Required
});

logger.log({
  type: 'DEBUG',
  message: 'Logging with additional details.',
  payload: { id: 123, action: 'test' }, // Optional payload
  statusCode: 200,                      // Optional status code
  sourceURL: 'http://localhost:3000',   // Optional source URL
  targetURL: 'http://localhost:5173',   // Optional target URL
});
```

### Step 3: Logging Errors
Log errors directly with stack traces for debugging:

```typescript
try {
  throw new Error('Something went wrong!');
} catch (err) {
  logger.log({
    type: 'ERROR',
    message: err, // Pass the error object directly
    logId: 'ERR001',
  });
}
```

### Advanced: Adding Middleware for Request Logging
Log incoming requests in an Express.js backend:

```typescript
import { Request, Response, NextFunction } from 'express';
import Logger from 'log4u';

const logger = new Logger({ serviceName: 'MyBackendService' });

function logRequest(req: Request, res: Response, next: NextFunction) {
  const logData: any = {
    type: 'INFO',
    message: 'Incoming request',
    sourceURL: req.get('Origin') || req.get('Referer'),
    targetURL: req.originalUrl,
    payload: req.body,
  };

  res.on('finish', () => {
    logData.statusCode = res.statusCode;
    logger.log(logData);
  });

  next();
}

// Use the middleware in your app
app.use(logRequest);
```

### Configuration Options
When initializing the logger, you can pass the following options:

| Option         | Type     | Default     | Description                                     |
|----------------|----------|-------------|-------------------------------------------------|
| `serviceName`  | `string` | `undefined` | The name of your service (included in logs).   |
| `logDirectory` | `string` | `./logs`    | Directory where log files are stored.          |
| `dateFormat`   | `string` | `YYYY-MM-DD`| Format for daily log file names.               |


### Log Data Structure
Here’s a breakdown of the log data you can provide (to be added more in future):

| Field        | Required | Type            | Description                                      |
|--------------|----------|-----------------|--------------------------------------------------|
| `type`       | Yes      | `string`        | Log level: INFO, DEBUG, or ERROR.               |
| `message`    | Yes      | `string`/`Error`| A short description or error object.            |
| `logId`      | No       | `string`        | Unique identifier for the log.                  |
| `payload`    | No       | `object`        | Any additional data related to the log.         |
| `statusCode` | No       | `number`        | HTTP status code (e.g., 200, 404, 500).         |
| `sourceURL`  | No       | `string`        | Source of the request or action (e.g., API endpoint). |
| `targetURL`  | No       | `string`        | Target URL for the action.                      |


### Example Log Output
For a simple log:

```lua
INFO 2024-11-30T12:00:00Z MyService Testing log package
```

### For a log with additional details:

```bash
DEBUG 2024-11-30T12:05:00Z MyService Logging with additional details {"id":123,"action":"test"} 200 http://localhost:3000 http://localhost:5173
```

### For an error log:

```javascript
ERROR 2024-11-30T12:10:00Z MyService ERR001 Something went wrong!
Error: Something went wrong!
    at Object.<anonymous> (/path/to/file.js:10:15)
    ...
```

### Happy Logging! 🎉
