import express from "express";
import { join, dirname } from "path";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use JSON file for storage
const logFile = join(__dirname, "logs.json");
const adapter = new JSONFile(logFile);
const db = new Low(adapter, { logs: [] });

const fetchLogs = (req, res, next) => {};

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Accessed /");
});

app.get("/log", (req, res) => {
  res.send("Accessing logs...");
  console.log("Accessing logs...");
});

app.post("/log", async (req, res) => {
  res.status(200).json({ success: true });
  await db.update(({ logs }) =>
    logs.push({
      message: "Posted a new log",
      timestamp: new Date().toLocaleString(),
    })
  );
});

// log handling
const logSetup = async () => {
  await db.read();

  // If db.data is missing or invalid, override it
  if (
    !db.data || // File is empty or unreadable
    typeof db.data !== "object" || // Not an object
    !Array.isArray(db.data.logs) // logs is not an array
  ) {
    db.data = defaultData;
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
