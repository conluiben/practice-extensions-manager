import express from "express";
import { join, dirname } from "path";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import joi from "joi";
import xss from "xss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use JSON file for storage
const logFile = join(__dirname, "logs.json");
const adapter = new JSONFile(logFile);
const db = new Low(adapter, { logs: [] });

const app = express();

// function for API endpoints

const addLog = async (req, res, next) => {
  try {
    const { error: schemaError, value: newLogObject } = joi
      .object({
        message: joi.string().trim().required().custom(sanitizeString),
      })
      .validate(req.body);
    if (schemaError) {
      // error object contains details[] where each details: message, path, type...
      // TODO: add multiple messages
      throw createError(
        "Invalid property values - " + schemaError.details[0].message,
        400
      );
    }

    await db.update(({ logs }) =>
      logs.push({
        message: newLogObject["message"],
        category: "Browser Action",
        timestamp: new Date().toLocaleString(),
      })
    );
    res.status(200).json({ ...newLogObject, success: true });
  } catch (e) {
    next(e);
  }
};

const handleError = (err, req, res, next) => {
  console.error("Error occured: " + err.message);
  res.status(err.status || 500).json({ message: err.message, success: false });
};

const createError = (msg, statusCode = 500) => {
  const newError = new Error(msg);
  newError.status = statusCode;
  return newError;
};

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "PUT", "POST", "DELETE"],
  optionsSuccessStatus: 200,
};
const helmetOptions = {
  referrerPolicy: {
    policy: "origin",
  },
};

// xss lib to sanitize/escape html, used in joi.custom
const sanitizeString = (value) => {
  return xss(value).trim();
};

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Accessed /");
});

app.get("/log", (req, res) => {
  console.log("Accessing logs...");
  res.send(db.data.logs);
});

app.post("/log", addLog);

app.use(handleError);

// log handling
const logSetup = async () => {
  await db.read();

  // If db.data is missing or invalid, override it
  if (
    !db.data || // File is empty or unreadable
    typeof db.data !== "object" || // Not an object
    !Array.isArray(db.data.logs) // logs is not an array
  ) {
    db.data = { logs: [] };
    await db.write(); // Persist the fix
  }

  db.data.logs ||= [];
  console.log("Logged in to DB");
  await db.write();
  await db.update(({ logs }) =>
    logs.push({ message: "Logged in", timestamp: new Date().toLocaleString() })
  );
};

export { app, logSetup };
