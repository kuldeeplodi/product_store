import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import productRouters from "./routes/product.route.js";
import { sql } from "./config.js/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// apply arcjet rate-limiting to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, //specifies that each request consumes 1 token
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res
          .status(429)
          .json({ error: "Too many requests,please try again later" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Access denied" });
      } else {
        res.status(403).json({ error: "forbidden access" });
      }
      return;
    }

    // check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpooded()
      )
    ) {
      res.status(403).json({ error: "spoofed bot detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Error in arcjet middleware:", error);
    next(error);
  }
});

app.use("/api/products", productRouters);

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT  CURRENT_TIMESTAMP);`;
    console.log("database is connected and table is created");
  } catch (error) {
    console.log("Error creating table:", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
